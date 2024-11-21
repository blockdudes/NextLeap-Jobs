import "@stdlib/deploy";
import "./message.tact";

contract NftCollection with Deployable {
    next_item_index: Int as uint32 = 0;               
    collection_content: Cell;   
    authority_address: Address;

    init(owner_address: Address, collection_content: Cell){
        self.collection_content = collection_content;
        self.authority_address = owner_address;
    }

    receive(msg: Mint){
        let ctx: Context = context();
        self.mint(msg.recipient, msg.individual_content);

        emit(LogEventMintRecord{ minter: ctx.sender, item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
    }

    // ===== Private Methods ===== //
    fun mint(recipient: Address, individualContent: Cell) {
        require(self.next_item_index >= 0, "Non-sequential NFTs");
        let nft_init: StateInit = self.nftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init), 
                value: ton("0.05"), 
                bounce: false,
                mode: SendRemainingValue | SendIgnoreErrors,
                body: Transfer {
                    query_id: 0,
                    new_owner: recipient,
                    custom_payload: individualContent,
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        self.next_item_index = self.next_item_index + 1;
    }

    // --------- Get Collection Metadata Function --------- //
    get fun collection_data(): CollectionData {     
        return CollectionData{
            next_item_index: self.next_item_index, 
            collection_content: self.collection_content, 
            owner_address: self.authority_address
        };
    }

    get fun nft_address_by_index(item_index: Int): Address?{      
        let initCode: StateInit = self.nftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun nftItemInit(item_index: Int): StateInit {
        return initOf NftItem(myAddress(), item_index, self.authority_address);
    }
}

contract NftItem with Deployable {
    collection_address: Address;
    item_index: Int;
    is_initialized: Bool;
    owner: Address?;
    individual_content: Cell?;

    authority_address: Address;
    revoked_at: Int as uint64 = 0;

    init(collection_address: Address, item_index: Int, authority_address: Address) {
        require(sender() == collection_address, "Not from collection");
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.is_initialized = false;
        self.authority_address = authority_address;
    }

    receive(msg: Transfer){
        let ctx: Context = context(); 
        
        if (self.is_initialized == false) {  // Initial Transfer, aka the "Minting" of the NFT
            require(ctx.sender == self.collection_address, "Initialized tx need from collection");
            self.is_initialized = true;
            self.owner = msg.new_owner;
            self.individual_content = msg.custom_payload;
            if (ctx.value > 0) {
                    send(SendParameters{
                    to: msg.new_owner,
                    value: 0,
                    mode: SendIgnoreErrors | SendPayGasSeparately,
                    body: Excesses { query_id: msg.query_id }.toCell()
                });
            }
        } else {
            require(false, "SBT cannot be transferred");
        }
    }

    receive(msg: ProveOwnership) {
        require(sender() == self.owner, "Not owner");
        send(SendParameters{
            to: msg.dest,
            value: 0,
            mode: SendRemainingValue | SendIgnoreErrors | SendPayGasSeparately,
            body: OwnershipProof {
                query_id: msg.query_id,
                item_id: self.item_index,
                owner: self.owner!!,
                data: msg.forward_payload,
                revoked_at: self.revoked_at,
                content: msg.with_content ? self.individual_content : null
            }.toCell()
        });
    }

    receive(msg: RequestOwner) {
        send(SendParameters{
            to: msg.dest,
            value: 0,
            mode: SendRemainingValue | SendIgnoreErrors | SendPayGasSeparately,
            body: OwnerInfo {
                query_id: msg.query_id,
                item_id: self.item_index,
                initiator: sender(),
                owner: self.owner!!,
                data: msg.forward_payload,
                revoked_at: self.revoked_at,
                content: msg.with_content ? self.individual_content : null
            }.toCell()
        });
    }

    receive(msg: Revoke) {
        require(sender() == self.authority_address, "Not authorized");
        require(self.revoked_at == 0, "Already revoked");
        self.revoked_at = now();
    }

    get fun nft_data(): NftData {
        return NftData {
            is_initialized: self.is_initialized,
            index: self.item_index,
            collection_address: self.collection_address,
            owner_address: self.owner!!,
            individual_content: self.individual_content!!
        };
    }
}
