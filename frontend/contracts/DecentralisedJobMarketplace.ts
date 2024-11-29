import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "@ton/core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type StdAddress = {
  $$type: "StdAddress";
  workchain: bigint;
  address: bigint;
};

export function storeStdAddress(src: StdAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 8);
    b_0.storeUint(src.address, 256);
  };
}

export function loadStdAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(8);
  let _address = sc_0.loadUintBig(256);
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleStdAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readBigNumber();
  return {
    $$type: "StdAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleStdAddress(source: StdAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeNumber(source.address);
  return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
    },
    parse: (src) => {
      return loadStdAddress(src.loadRef().beginParse());
    },
  };
}

export type VarAddress = {
  $$type: "VarAddress";
  workchain: bigint;
  address: Slice;
};

export function storeVarAddress(src: VarAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.workchain, 32);
    b_0.storeRef(src.address.asCell());
  };
}

export function loadVarAddress(slice: Slice) {
  let sc_0 = slice;
  let _workchain = sc_0.loadIntBig(32);
  let _address = sc_0.loadRef().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function loadGetterTupleVarAddress(source: TupleReader) {
  let _workchain = source.readBigNumber();
  let _address = source.readCell().asSlice();
  return {
    $$type: "VarAddress" as const,
    workchain: _workchain,
    address: _address,
  };
}

function storeTupleVarAddress(source: VarAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.workchain);
  builder.writeSlice(source.address.asCell());
  return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
    },
    parse: (src) => {
      return loadVarAddress(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Slice;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw.asCell());
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadGetterTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell().asSlice();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw.asCell());
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadGetterTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type LogEventMintRecord = {
  $$type: "LogEventMintRecord";
  minter: Address;
  item_id: bigint;
  generate_number: bigint;
};

export function storeLogEventMintRecord(src: LogEventMintRecord) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2743565669, 32);
    b_0.storeAddress(src.minter);
    b_0.storeInt(src.item_id, 257);
    b_0.storeInt(src.generate_number, 257);
  };
}

export function loadLogEventMintRecord(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2743565669) {
    throw Error("Invalid prefix");
  }
  let _minter = sc_0.loadAddress();
  let _item_id = sc_0.loadIntBig(257);
  let _generate_number = sc_0.loadIntBig(257);
  return {
    $$type: "LogEventMintRecord" as const,
    minter: _minter,
    item_id: _item_id,
    generate_number: _generate_number,
  };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
  let _minter = source.readAddress();
  let _item_id = source.readBigNumber();
  let _generate_number = source.readBigNumber();
  return {
    $$type: "LogEventMintRecord" as const,
    minter: _minter,
    item_id: _item_id,
    generate_number: _generate_number,
  };
}

function loadGetterTupleLogEventMintRecord(source: TupleReader) {
  let _minter = source.readAddress();
  let _item_id = source.readBigNumber();
  let _generate_number = source.readBigNumber();
  return {
    $$type: "LogEventMintRecord" as const,
    minter: _minter,
    item_id: _item_id,
    generate_number: _generate_number,
  };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.minter);
  builder.writeNumber(source.item_id);
  builder.writeNumber(source.generate_number);
  return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeLogEventMintRecord(src)).endCell()
      );
    },
    parse: (src) => {
      return loadLogEventMintRecord(src.loadRef().beginParse());
    },
  };
}

export type CollectionData = {
  $$type: "CollectionData";
  next_item_index: bigint;
  collection_content: Cell;
  owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.next_item_index, 257);
    b_0.storeRef(src.collection_content);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadCollectionData(slice: Slice) {
  let sc_0 = slice;
  let _next_item_index = sc_0.loadIntBig(257);
  let _collection_content = sc_0.loadRef();
  let _owner_address = sc_0.loadAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadGetterTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function storeTupleCollectionData(source: CollectionData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.next_item_index);
  builder.writeCell(source.collection_content);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
    },
    parse: (src) => {
      return loadCollectionData(src.loadRef().beginParse());
    },
  };
}

export type Mint = {
  $$type: "Mint";
  recipient: Address;
  individual_content: Cell;
};

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2063830592, 32);
    b_0.storeAddress(src.recipient);
    b_0.storeRef(src.individual_content);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2063830592) {
    throw Error("Invalid prefix");
  }
  let _recipient = sc_0.loadAddress();
  let _individual_content = sc_0.loadRef();
  return {
    $$type: "Mint" as const,
    recipient: _recipient,
    individual_content: _individual_content,
  };
}

function loadTupleMint(source: TupleReader) {
  let _recipient = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: "Mint" as const,
    recipient: _recipient,
    individual_content: _individual_content,
  };
}

function loadGetterTupleMint(source: TupleReader) {
  let _recipient = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: "Mint" as const,
    recipient: _recipient,
    individual_content: _individual_content,
  };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.recipient);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMint(src)).endCell());
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse());
    },
  };
}

export type Transfer = {
  $$type: "Transfer";
  query_id: bigint;
  new_owner: Address;
  custom_payload: Cell | null;
  forward_amount: bigint;
  forward_payload: Slice;
};

export function storeTransfer(src: Transfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1607220500, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1607220500) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_amount = sc_0.loadCoins();
  let _forward_payload = sc_0;
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_amount = source.readBigNumber();
  let _forward_payload = source.readCell().asSlice();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function loadGetterTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_amount = source.readBigNumber();
  let _forward_payload = source.readCell().asSlice();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
    custom_payload: _custom_payload,
    forward_amount: _forward_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTransfer(source: Transfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_amount);
  builder.writeSlice(source.forward_payload.asCell());
  return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTransfer(src.loadRef().beginParse());
    },
  };
}

export type OwnershipAssigned = {
  $$type: "OwnershipAssigned";
  query_id: bigint;
  prev_owner: Address;
  forward_payload: Slice;
};

export function storeOwnershipAssigned(src: OwnershipAssigned) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(85167505, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.prev_owner);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadOwnershipAssigned(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 85167505) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _prev_owner = sc_0.loadAddress();
  let _forward_payload = sc_0;
  return {
    $$type: "OwnershipAssigned" as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _prev_owner = source.readAddress();
  let _forward_payload = source.readCell().asSlice();
  return {
    $$type: "OwnershipAssigned" as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _prev_owner = source.readAddress();
  let _forward_payload = source.readCell().asSlice();
  return {
    $$type: "OwnershipAssigned" as const,
    query_id: _query_id,
    prev_owner: _prev_owner,
    forward_payload: _forward_payload,
  };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.prev_owner);
  builder.writeSlice(source.forward_payload.asCell());
  return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeOwnershipAssigned(src)).endCell()
      );
    },
    parse: (src) => {
      return loadOwnershipAssigned(src.loadRef().beginParse());
    },
  };
}

export type Excesses = {
  $$type: "Excesses";
  query_id: bigint;
};

export function storeExcesses(src: Excesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "Excesses" as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Excesses" as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Excesses" as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadExcesses(src.loadRef().beginParse());
    },
  };
}

export type GetStaticData = {
  $$type: "GetStaticData";
  query_id: bigint;
};

export function storeGetStaticData(src: GetStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(801842850, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadGetStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 801842850) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "GetStaticData" as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "GetStaticData" as const, query_id: _query_id };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "GetStaticData" as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
    },
    parse: (src) => {
      return loadGetStaticData(src.loadRef().beginParse());
    },
  };
}

export type ReportStaticData = {
  $$type: "ReportStaticData";
  query_id: bigint;
  index_id: bigint;
  collection: Address;
};

export function storeReportStaticData(src: ReportStaticData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2339837749, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeInt(src.index_id, 257);
    b_0.storeAddress(src.collection);
  };
}

export function loadReportStaticData(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2339837749) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _index_id = sc_0.loadIntBig(257);
  let _collection = sc_0.loadAddress();
  return {
    $$type: "ReportStaticData" as const,
    query_id: _query_id,
    index_id: _index_id,
    collection: _collection,
  };
}

function loadTupleReportStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index_id = source.readBigNumber();
  let _collection = source.readAddress();
  return {
    $$type: "ReportStaticData" as const,
    query_id: _query_id,
    index_id: _index_id,
    collection: _collection,
  };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _index_id = source.readBigNumber();
  let _collection = source.readAddress();
  return {
    $$type: "ReportStaticData" as const,
    query_id: _query_id,
    index_id: _index_id,
    collection: _collection,
  };
}

function storeTupleReportStaticData(source: ReportStaticData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.index_id);
  builder.writeAddress(source.collection);
  return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
    },
    parse: (src) => {
      return loadReportStaticData(src.loadRef().beginParse());
    },
  };
}

export type NftData = {
  $$type: "NftData";
  is_initialized: boolean;
  index: bigint;
  collection_address: Address;
  owner_address: Address;
  individual_content: Cell;
};

export function storeNftData(src: NftData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.is_initialized);
    b_0.storeInt(src.index, 257);
    b_0.storeAddress(src.collection_address);
    b_0.storeAddress(src.owner_address);
    b_0.storeRef(src.individual_content);
  };
}

export function loadNftData(slice: Slice) {
  let sc_0 = slice;
  let _is_initialized = sc_0.loadBit();
  let _index = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  let _owner_address = sc_0.loadAddress();
  let _individual_content = sc_0.loadRef();
  return {
    $$type: "NftData" as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function loadTupleNftData(source: TupleReader) {
  let _is_initialized = source.readBoolean();
  let _index = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _owner_address = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: "NftData" as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function loadGetterTupleNftData(source: TupleReader) {
  let _is_initialized = source.readBoolean();
  let _index = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _owner_address = source.readAddress();
  let _individual_content = source.readCell();
  return {
    $$type: "NftData" as const,
    is_initialized: _is_initialized,
    index: _index,
    collection_address: _collection_address,
    owner_address: _owner_address,
    individual_content: _individual_content,
  };
}

function storeTupleNftData(source: NftData) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.is_initialized);
  builder.writeNumber(source.index);
  builder.writeAddress(source.collection_address);
  builder.writeAddress(source.owner_address);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeNftData(src)).endCell());
    },
    parse: (src) => {
      return loadNftData(src.loadRef().beginParse());
    },
  };
}

export type ProveOwnership = {
  $$type: "ProveOwnership";
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeProveOwnership(src: ProveOwnership) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(81711432, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadProveOwnership(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 81711432) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: "ProveOwnership" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleProveOwnership(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "ProveOwnership" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadGetterTupleProveOwnership(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "ProveOwnership" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleProveOwnership(source: ProveOwnership) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserProveOwnership(): DictionaryValue<ProveOwnership> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeProveOwnership(src)).endCell());
    },
    parse: (src) => {
      return loadProveOwnership(src.loadRef().beginParse());
    },
  };
}

export type RequestOwner = {
  $$type: "RequestOwner";
  query_id: bigint;
  dest: Address;
  forward_payload: Cell;
  with_content: boolean;
};

export function storeRequestOwner(src: RequestOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3502489578, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.dest);
    b_0.storeRef(src.forward_payload);
    b_0.storeBit(src.with_content);
  };
}

export function loadRequestOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3502489578) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _dest = sc_0.loadAddress();
  let _forward_payload = sc_0.loadRef();
  let _with_content = sc_0.loadBit();
  return {
    $$type: "RequestOwner" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadTupleRequestOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "RequestOwner" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function loadGetterTupleRequestOwner(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _dest = source.readAddress();
  let _forward_payload = source.readCell();
  let _with_content = source.readBoolean();
  return {
    $$type: "RequestOwner" as const,
    query_id: _query_id,
    dest: _dest,
    forward_payload: _forward_payload,
    with_content: _with_content,
  };
}

function storeTupleRequestOwner(source: RequestOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.dest);
  builder.writeCell(source.forward_payload);
  builder.writeBoolean(source.with_content);
  return builder.build();
}

function dictValueParserRequestOwner(): DictionaryValue<RequestOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRequestOwner(src)).endCell());
    },
    parse: (src) => {
      return loadRequestOwner(src.loadRef().beginParse());
    },
  };
}

export type OwnershipProof = {
  $$type: "OwnershipProof";
  query_id: bigint;
  item_id: bigint;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnershipProof(src: OwnershipProof) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(86296494, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.item_id, 256);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    b_0.storeUint(src.revoked_at, 64);
    if (src.content !== null && src.content !== undefined) {
      b_0.storeBit(true).storeRef(src.content);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadOwnershipProof(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 86296494) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadUintBig(256);
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let _revoked_at = sc_0.loadUintBig(64);
  let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "OwnershipProof" as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnershipProof(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnershipProof" as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadGetterTupleOwnershipProof(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnershipProof" as const,
    query_id: _query_id,
    item_id: _item_id,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnershipProof(source: OwnershipProof) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnershipProof(): DictionaryValue<OwnershipProof> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnershipProof(src)).endCell());
    },
    parse: (src) => {
      return loadOwnershipProof(src.loadRef().beginParse());
    },
  };
}

export type OwnerInfo = {
  $$type: "OwnerInfo";
  query_id: bigint;
  item_id: bigint;
  initiator: Address;
  owner: Address;
  data: Cell;
  revoked_at: bigint;
  content: Cell | null;
};

export function storeOwnerInfo(src: OwnerInfo) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(232130531, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeUint(src.item_id, 256);
    b_0.storeAddress(src.initiator);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.data);
    b_0.storeUint(src.revoked_at, 64);
    if (src.content !== null && src.content !== undefined) {
      b_0.storeBit(true).storeRef(src.content);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadOwnerInfo(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 232130531) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _item_id = sc_0.loadUintBig(256);
  let _initiator = sc_0.loadAddress();
  let _owner = sc_0.loadAddress();
  let _data = sc_0.loadRef();
  let _revoked_at = sc_0.loadUintBig(64);
  let _content = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "OwnerInfo" as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadTupleOwnerInfo(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _initiator = source.readAddress();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnerInfo" as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function loadGetterTupleOwnerInfo(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _item_id = source.readBigNumber();
  let _initiator = source.readAddress();
  let _owner = source.readAddress();
  let _data = source.readCell();
  let _revoked_at = source.readBigNumber();
  let _content = source.readCellOpt();
  return {
    $$type: "OwnerInfo" as const,
    query_id: _query_id,
    item_id: _item_id,
    initiator: _initiator,
    owner: _owner,
    data: _data,
    revoked_at: _revoked_at,
    content: _content,
  };
}

function storeTupleOwnerInfo(source: OwnerInfo) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.item_id);
  builder.writeAddress(source.initiator);
  builder.writeAddress(source.owner);
  builder.writeCell(source.data);
  builder.writeNumber(source.revoked_at);
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserOwnerInfo(): DictionaryValue<OwnerInfo> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeOwnerInfo(src)).endCell());
    },
    parse: (src) => {
      return loadOwnerInfo(src.loadRef().beginParse());
    },
  };
}

export type Revoke = {
  $$type: "Revoke";
  query_id: bigint;
};

export function storeRevoke(src: Revoke) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1871312355, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadRevoke(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1871312355) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "Revoke" as const, query_id: _query_id };
}

function loadTupleRevoke(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Revoke" as const, query_id: _query_id };
}

function loadGetterTupleRevoke(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "Revoke" as const, query_id: _query_id };
}

function storeTupleRevoke(source: Revoke) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserRevoke(): DictionaryValue<Revoke> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRevoke(src)).endCell());
    },
    parse: (src) => {
      return loadRevoke(src.loadRef().beginParse());
    },
  };
}

export type Job = {
  $$type: "Job";
  id: bigint;
  title: string;
  description: string;
  compensation: bigint | null;
  skills: Dictionary<bigint, Cell>;
  numberOfSkills: bigint;
  employer: Address;
  isAcceptingApplicants: boolean;
  worker: Address | null;
  worker_rating: bigint | null;
  worker_review: string | null;
  isCompleted: boolean | null;
  applicants: Dictionary<bigint, Address>;
  numberOfApplicants: bigint;
  createdAt: bigint;
  completedAt: bigint | null;
};

export function storeJob(src: Job) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.id, 257);
    b_0.storeStringRefTail(src.title);
    b_0.storeStringRefTail(src.description);
    if (src.compensation !== null && src.compensation !== undefined) {
      b_0.storeBit(true).storeCoins(src.compensation);
    } else {
      b_0.storeBit(false);
    }
    let b_1 = new Builder();
    b_1.storeDict(
      src.skills,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_1.storeInt(src.numberOfSkills, 257);
    b_1.storeAddress(src.employer);
    b_1.storeBit(src.isAcceptingApplicants);
    b_1.storeAddress(src.worker);
    let b_2 = new Builder();
    if (src.worker_rating !== null && src.worker_rating !== undefined) {
      b_2.storeBit(true).storeInt(src.worker_rating, 257);
    } else {
      b_2.storeBit(false);
    }
    if (src.worker_review !== null && src.worker_review !== undefined) {
      b_2.storeBit(true).storeStringRefTail(src.worker_review);
    } else {
      b_2.storeBit(false);
    }
    if (src.isCompleted !== null && src.isCompleted !== undefined) {
      b_2.storeBit(true).storeBit(src.isCompleted);
    } else {
      b_2.storeBit(false);
    }
    b_2.storeDict(
      src.applicants,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Address()
    );
    b_2.storeInt(src.numberOfApplicants, 257);
    b_2.storeInt(src.createdAt, 257);
    let b_3 = new Builder();
    if (src.completedAt !== null && src.completedAt !== undefined) {
      b_3.storeBit(true).storeInt(src.completedAt, 257);
    } else {
      b_3.storeBit(false);
    }
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadJob(slice: Slice) {
  let sc_0 = slice;
  let _id = sc_0.loadIntBig(257);
  let _title = sc_0.loadStringRefTail();
  let _description = sc_0.loadStringRefTail();
  let _compensation = sc_0.loadBit() ? sc_0.loadCoins() : null;
  let sc_1 = sc_0.loadRef().beginParse();
  let _skills = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_1
  );
  let _numberOfSkills = sc_1.loadIntBig(257);
  let _employer = sc_1.loadAddress();
  let _isAcceptingApplicants = sc_1.loadBit();
  let _worker = sc_1.loadMaybeAddress();
  let sc_2 = sc_1.loadRef().beginParse();
  let _worker_rating = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
  let _worker_review = sc_2.loadBit() ? sc_2.loadStringRefTail() : null;
  let _isCompleted = sc_2.loadBit() ? sc_2.loadBit() : null;
  let _applicants = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address(),
    sc_2
  );
  let _numberOfApplicants = sc_2.loadIntBig(257);
  let _createdAt = sc_2.loadIntBig(257);
  let sc_3 = sc_2.loadRef().beginParse();
  let _completedAt = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
  return {
    $$type: "Job" as const,
    id: _id,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
    employer: _employer,
    isAcceptingApplicants: _isAcceptingApplicants,
    worker: _worker,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    isCompleted: _isCompleted,
    applicants: _applicants,
    numberOfApplicants: _numberOfApplicants,
    createdAt: _createdAt,
    completedAt: _completedAt,
  };
}



function loadTupleJob(source: TupleReader) {
  let _id = source.readBigNumber();
  let _title = source.readString();
  let _description = source.readString();
  let _compensation = source.readBigNumberOpt();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _numberOfSkills = source.readBigNumber();
  let _employer = source.readAddress();
  let _isAcceptingApplicants = source.readBoolean();
  let _worker = source.readAddressOpt();
  let _worker_rating = source.readBigNumberOpt();
  let _worker_review = source.readStringOpt();
  let _isCompleted = source.readBooleanOpt();
  let _applicants = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address(),
    source.readCellOpt()
  );
  let _numberOfApplicants = source.readBigNumber();
  source = source.readTuple();
  let _createdAt = source.readBigNumber();
  let _completedAt = source.readBigNumberOpt();
  return {
    $$type: "Job" as const,
    id: _id,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
    employer: _employer,
    isAcceptingApplicants: _isAcceptingApplicants,
    worker: _worker,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    isCompleted: _isCompleted,
    applicants: _applicants,
    numberOfApplicants: _numberOfApplicants,
    createdAt: _createdAt,
    completedAt: _completedAt,
  };
}

function loadGetterTupleJob(source: TupleReader) {
  let _id = source.readBigNumber();
  let _title = source.readString();
  let _description = source.readString();
  let _compensation = source.readBigNumberOpt();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _numberOfSkills = source.readBigNumber();
  let _employer = source.readAddress();
  let _isAcceptingApplicants = source.readBoolean();
  let _worker = source.readAddressOpt();
  let _worker_rating = source.readBigNumberOpt();
  let _worker_review = source.readStringOpt();
  let _isCompleted = source.readBooleanOpt();
  let _applicants = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Address(),
    source.readCellOpt()
  );
  let _numberOfApplicants = source.readBigNumber();
  let _createdAt = source.readBigNumber();
  let _completedAt = source.readBigNumberOpt();
  return {
    $$type: "Job" as const,
    id: _id,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
    employer: _employer,
    isAcceptingApplicants: _isAcceptingApplicants,
    worker: _worker,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    isCompleted: _isCompleted,
    applicants: _applicants,
    numberOfApplicants: _numberOfApplicants,
    createdAt: _createdAt,
    completedAt: _completedAt,
  };
}

function storeTupleJob(source: Job) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeString(source.title);
  builder.writeString(source.description);
  builder.writeNumber(source.compensation);
  builder.writeCell(
    source.skills.size > 0
      ? beginCell()
          .storeDictDirect(
            source.skills,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.numberOfSkills);
  builder.writeAddress(source.employer);
  builder.writeBoolean(source.isAcceptingApplicants);
  builder.writeAddress(source.worker);
  builder.writeNumber(source.worker_rating);
  builder.writeString(source.worker_review);
  builder.writeBoolean(source.isCompleted);
  builder.writeCell(
    source.applicants.size > 0
      ? beginCell()
          .storeDictDirect(
            source.applicants,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Address()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.numberOfApplicants);
  builder.writeNumber(source.createdAt);
  builder.writeNumber(source.completedAt);
  return builder.build();
}

function dictValueParserJob(): DictionaryValue<Job> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJob(src)).endCell());
    },
    parse: (src) => {
      return loadJob(src.loadRef().beginParse());
    },
  };
}

export type Post = {
  $$type: "Post";
  id: bigint;
  title: string;
  content: string;
  author: Address;
  comments: Dictionary<bigint, Comment>;
  numberOfComments: bigint;
  upvotes: bigint;
  downvotes: bigint;
  createdAt: bigint;
  archivedAt: bigint | null;
};

export function storePost(src: Post) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.id, 257);
    b_0.storeStringRefTail(src.title);
    b_0.storeStringRefTail(src.content);
    b_0.storeAddress(src.author);
    let b_1 = new Builder();
    b_1.storeDict(
      src.comments,
      Dictionary.Keys.BigInt(257),
      dictValueParserComment()
    );
    b_1.storeInt(src.numberOfComments, 257);
    b_1.storeInt(src.upvotes, 257);
    b_1.storeInt(src.downvotes, 257);
    let b_2 = new Builder();
    b_2.storeInt(src.createdAt, 257);
    if (src.archivedAt !== null && src.archivedAt !== undefined) {
      b_2.storeBit(true).storeInt(src.archivedAt, 257);
    } else {
      b_2.storeBit(false);
    }
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

export function loadPost(slice: Slice) {
  let sc_0 = slice;
  let _id = sc_0.loadIntBig(257);
  let _title = sc_0.loadStringRefTail();
  let _content = sc_0.loadStringRefTail();
  let _author = sc_0.loadAddress();
  let sc_1 = sc_0.loadRef().beginParse();
  let _comments = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserComment(),
    sc_1
  );
  let _numberOfComments = sc_1.loadIntBig(257);
  let _upvotes = sc_1.loadIntBig(257);
  let _downvotes = sc_1.loadIntBig(257);
  let sc_2 = sc_1.loadRef().beginParse();
  let _createdAt = sc_2.loadIntBig(257);
  let _archivedAt = sc_2.loadBit() ? sc_2.loadIntBig(257) : null;
  return {
    $$type: "Post" as const,
    id: _id,
    title: _title,
    content: _content,
    author: _author,
    comments: _comments,
    numberOfComments: _numberOfComments,
    upvotes: _upvotes,
    downvotes: _downvotes,
    createdAt: _createdAt,
    archivedAt: _archivedAt,
  };
}

function loadTuplePost(source: TupleReader) {
  let _id = source.readBigNumber();
  let _title = source.readString();
  let _content = source.readString();
  let _author = source.readAddress();
  let _comments = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserComment(),
    source.readCellOpt()
  );
  let _numberOfComments = source.readBigNumber();
  let _upvotes = source.readBigNumber();
  let _downvotes = source.readBigNumber();
  let _createdAt = source.readBigNumber();
  let _archivedAt = source.readBigNumberOpt();
  return {
    $$type: "Post" as const,
    id: _id,
    title: _title,
    content: _content,
    author: _author,
    comments: _comments,
    numberOfComments: _numberOfComments,
    upvotes: _upvotes,
    downvotes: _downvotes,
    createdAt: _createdAt,
    archivedAt: _archivedAt,
  };
}

function loadGetterTuplePost(source: TupleReader) {
  let _id = source.readBigNumber();
  let _title = source.readString();
  let _content = source.readString();
  let _author = source.readAddress();
  let _comments = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserComment(),
    source.readCellOpt()
  );
  let _numberOfComments = source.readBigNumber();
  let _upvotes = source.readBigNumber();
  let _downvotes = source.readBigNumber();
  let _createdAt = source.readBigNumber();
  let _archivedAt = source.readBigNumberOpt();
  return {
    $$type: "Post" as const,
    id: _id,
    title: _title,
    content: _content,
    author: _author,
    comments: _comments,
    numberOfComments: _numberOfComments,
    upvotes: _upvotes,
    downvotes: _downvotes,
    createdAt: _createdAt,
    archivedAt: _archivedAt,
  };
}

function storeTuplePost(source: Post) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeString(source.title);
  builder.writeString(source.content);
  builder.writeAddress(source.author);
  builder.writeCell(
    source.comments.size > 0
      ? beginCell()
          .storeDictDirect(
            source.comments,
            Dictionary.Keys.BigInt(257),
            dictValueParserComment()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.numberOfComments);
  builder.writeNumber(source.upvotes);
  builder.writeNumber(source.downvotes);
  builder.writeNumber(source.createdAt);
  builder.writeNumber(source.archivedAt);
  return builder.build();
}

function dictValueParserPost(): DictionaryValue<Post> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePost(src)).endCell());
    },
    parse: (src) => {
      return loadPost(src.loadRef().beginParse());
    },
  };
}

export type Comment = {
  $$type: "Comment";
  id: bigint;
  author: Address;
  content: string;
  upvotes: bigint;
  downvotes: bigint;
};

export function storeComment(src: Comment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.id, 257);
    b_0.storeAddress(src.author);
    b_0.storeStringRefTail(src.content);
    b_0.storeInt(src.upvotes, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.downvotes, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadComment(slice: Slice) {
  let sc_0 = slice;
  let _id = sc_0.loadIntBig(257);
  let _author = sc_0.loadAddress();
  let _content = sc_0.loadStringRefTail();
  let _upvotes = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _downvotes = sc_1.loadIntBig(257);
  return {
    $$type: "Comment" as const,
    id: _id,
    author: _author,
    content: _content,
    upvotes: _upvotes,
    downvotes: _downvotes,
  };
}

function loadTupleComment(source: TupleReader) {
  let _id = source.readBigNumber();
  let _author = source.readAddress();
  let _content = source.readString();
  let _upvotes = source.readBigNumber();
  let _downvotes = source.readBigNumber();
  return {
    $$type: "Comment" as const,
    id: _id,
    author: _author,
    content: _content,
    upvotes: _upvotes,
    downvotes: _downvotes,
  };
}

function loadGetterTupleComment(source: TupleReader) {
  let _id = source.readBigNumber();
  let _author = source.readAddress();
  let _content = source.readString();
  let _upvotes = source.readBigNumber();
  let _downvotes = source.readBigNumber();
  return {
    $$type: "Comment" as const,
    id: _id,
    author: _author,
    content: _content,
    upvotes: _upvotes,
    downvotes: _downvotes,
  };
}

function storeTupleComment(source: Comment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.id);
  builder.writeAddress(source.author);
  builder.writeString(source.content);
  builder.writeNumber(source.upvotes);
  builder.writeNumber(source.downvotes);
  return builder.build();
}

function dictValueParserComment(): DictionaryValue<Comment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeComment(src)).endCell());
    },
    parse: (src) => {
      return loadComment(src.loadRef().beginParse());
    },
  };
}

export type User = {
  $$type: "User";
  address: Address;
  name: string;
  email: string;
  skills: Dictionary<bigint, Cell>;
  isEmployer: boolean;
  reputations: Dictionary<bigint, Reputation>;
  numberOfReputations: bigint;
};

export function storeUser(src: User) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.address);
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.email);
    let b_1 = new Builder();
    b_1.storeDict(
      src.skills,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_1.storeBit(src.isEmployer);
    b_1.storeDict(
      src.reputations,
      Dictionary.Keys.BigInt(257),
      dictValueParserReputation()
    );
    b_1.storeInt(src.numberOfReputations, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadUser(slice: Slice) {
  let sc_0 = slice;
  let _address = sc_0.loadAddress();
  let _name = sc_0.loadStringRefTail();
  let _email = sc_0.loadStringRefTail();
  let sc_1 = sc_0.loadRef().beginParse();
  let _skills = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_1
  );
  let _isEmployer = sc_1.loadBit();
  let _reputations = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserReputation(),
    sc_1
  );
  let _numberOfReputations = sc_1.loadIntBig(257);
  return {
    $$type: "User" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
    reputations: _reputations,
    numberOfReputations: _numberOfReputations,
  };
}

function loadTupleUser(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  let _email = source.readString();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _isEmployer = source.readBoolean();
  let _reputations = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserReputation(),
    source.readCellOpt()
  );
  let _numberOfReputations = source.readBigNumber();
  return {
    $$type: "User" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
    reputations: _reputations,
    numberOfReputations: _numberOfReputations,
  };
}

function loadGetterTupleUser(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  let _email = source.readString();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _isEmployer = source.readBoolean();
  let _reputations = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserReputation(),
    source.readCellOpt()
  );
  let _numberOfReputations = source.readBigNumber();
  return {
    $$type: "User" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
    reputations: _reputations,
    numberOfReputations: _numberOfReputations,
  };
}

function storeTupleUser(source: User) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeString(source.name);
  builder.writeString(source.email);
  builder.writeCell(
    source.skills.size > 0
      ? beginCell()
          .storeDictDirect(
            source.skills,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeBoolean(source.isEmployer);
  builder.writeCell(
    source.reputations.size > 0
      ? beginCell()
          .storeDictDirect(
            source.reputations,
            Dictionary.Keys.BigInt(257),
            dictValueParserReputation()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.numberOfReputations);
  return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUser(src)).endCell());
    },
    parse: (src) => {
      return loadUser(src.loadRef().beginParse());
    },
  };
}

export type Reputation = {
  $$type: "Reputation";
  rating: bigint;
  review: Cell;
};

export function storeReputation(src: Reputation) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.rating, 257);
    b_0.storeRef(src.review);
  };
}

export function loadReputation(slice: Slice) {
  let sc_0 = slice;
  let _rating = sc_0.loadIntBig(257);
  let _review = sc_0.loadRef();
  return { $$type: "Reputation" as const, rating: _rating, review: _review };
}

function loadTupleReputation(source: TupleReader) {
  let _rating = source.readBigNumber();
  let _review = source.readCell();
  return { $$type: "Reputation" as const, rating: _rating, review: _review };
}

function loadGetterTupleReputation(source: TupleReader) {
  let _rating = source.readBigNumber();
  let _review = source.readCell();
  return { $$type: "Reputation" as const, rating: _rating, review: _review };
}

function storeTupleReputation(source: Reputation) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.rating);
  builder.writeCell(source.review);
  return builder.build();
}

function dictValueParserReputation(): DictionaryValue<Reputation> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReputation(src)).endCell());
    },
    parse: (src) => {
      return loadReputation(src.loadRef().beginParse());
    },
  };
}

export type CreateUser = {
  $$type: "CreateUser";
  address: Address;
  name: string;
  email: string;
  skills: Dictionary<bigint, Cell>;
  isEmployer: boolean;
};

export function storeCreateUser(src: CreateUser) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1292332385, 32);
    b_0.storeAddress(src.address);
    b_0.storeStringRefTail(src.name);
    b_0.storeStringRefTail(src.email);
    b_0.storeDict(
      src.skills,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_0.storeBit(src.isEmployer);
  };
}

export function loadCreateUser(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1292332385) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  let _name = sc_0.loadStringRefTail();
  let _email = sc_0.loadStringRefTail();
  let _skills = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_0
  );
  let _isEmployer = sc_0.loadBit();
  return {
    $$type: "CreateUser" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
  };
}

function loadTupleCreateUser(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  let _email = source.readString();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _isEmployer = source.readBoolean();
  return {
    $$type: "CreateUser" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
  };
}

function loadGetterTupleCreateUser(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  let _email = source.readString();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _isEmployer = source.readBoolean();
  return {
    $$type: "CreateUser" as const,
    address: _address,
    name: _name,
    email: _email,
    skills: _skills,
    isEmployer: _isEmployer,
  };
}

function storeTupleCreateUser(source: CreateUser) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeString(source.name);
  builder.writeString(source.email);
  builder.writeCell(
    source.skills.size > 0
      ? beginCell()
          .storeDictDirect(
            source.skills,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeBoolean(source.isEmployer);
  return builder.build();
}

function dictValueParserCreateUser(): DictionaryValue<CreateUser> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreateUser(src)).endCell());
    },
    parse: (src) => {
      return loadCreateUser(src.loadRef().beginParse());
    },
  };
}

export type UpdateUserName = {
  $$type: "UpdateUserName";
  address: Address;
  name: string;
};

export function storeUpdateUserName(src: UpdateUserName) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2679646372, 32);
    b_0.storeAddress(src.address);
    b_0.storeStringRefTail(src.name);
  };
}

export function loadUpdateUserName(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2679646372) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  let _name = sc_0.loadStringRefTail();
  return { $$type: "UpdateUserName" as const, address: _address, name: _name };
}

function loadTupleUpdateUserName(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  return { $$type: "UpdateUserName" as const, address: _address, name: _name };
}

function loadGetterTupleUpdateUserName(source: TupleReader) {
  let _address = source.readAddress();
  let _name = source.readString();
  return { $$type: "UpdateUserName" as const, address: _address, name: _name };
}

function storeTupleUpdateUserName(source: UpdateUserName) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeString(source.name);
  return builder.build();
}

function dictValueParserUpdateUserName(): DictionaryValue<UpdateUserName> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateUserName(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateUserName(src.loadRef().beginParse());
    },
  };
}

export type UpdateUserEmail = {
  $$type: "UpdateUserEmail";
  address: Address;
  email: string;
};

export function storeUpdateUserEmail(src: UpdateUserEmail) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3094807392, 32);
    b_0.storeAddress(src.address);
    b_0.storeStringRefTail(src.email);
  };
}

export function loadUpdateUserEmail(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3094807392) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  let _email = sc_0.loadStringRefTail();
  return {
    $$type: "UpdateUserEmail" as const,
    address: _address,
    email: _email,
  };
}

function loadTupleUpdateUserEmail(source: TupleReader) {
  let _address = source.readAddress();
  let _email = source.readString();
  return {
    $$type: "UpdateUserEmail" as const,
    address: _address,
    email: _email,
  };
}

function loadGetterTupleUpdateUserEmail(source: TupleReader) {
  let _address = source.readAddress();
  let _email = source.readString();
  return {
    $$type: "UpdateUserEmail" as const,
    address: _address,
    email: _email,
  };
}

function storeTupleUpdateUserEmail(source: UpdateUserEmail) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeString(source.email);
  return builder.build();
}

function dictValueParserUpdateUserEmail(): DictionaryValue<UpdateUserEmail> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateUserEmail(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateUserEmail(src.loadRef().beginParse());
    },
  };
}

export type UpdateUserRole = {
  $$type: "UpdateUserRole";
  address: Address;
  isEmployer: boolean;
};

export function storeUpdateUserRole(src: UpdateUserRole) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1805240506, 32);
    b_0.storeAddress(src.address);
    b_0.storeBit(src.isEmployer);
  };
}

export function loadUpdateUserRole(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1805240506) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  let _isEmployer = sc_0.loadBit();
  return {
    $$type: "UpdateUserRole" as const,
    address: _address,
    isEmployer: _isEmployer,
  };
}

function loadTupleUpdateUserRole(source: TupleReader) {
  let _address = source.readAddress();
  let _isEmployer = source.readBoolean();
  return {
    $$type: "UpdateUserRole" as const,
    address: _address,
    isEmployer: _isEmployer,
  };
}

function loadGetterTupleUpdateUserRole(source: TupleReader) {
  let _address = source.readAddress();
  let _isEmployer = source.readBoolean();
  return {
    $$type: "UpdateUserRole" as const,
    address: _address,
    isEmployer: _isEmployer,
  };
}

function storeTupleUpdateUserRole(source: UpdateUserRole) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeBoolean(source.isEmployer);
  return builder.build();
}

function dictValueParserUpdateUserRole(): DictionaryValue<UpdateUserRole> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateUserRole(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateUserRole(src.loadRef().beginParse());
    },
  };
}

export type UpdateUserSkills = {
  $$type: "UpdateUserSkills";
  address: Address;
  skills: Dictionary<bigint, Cell>;
};

export function storeUpdateUserSkills(src: UpdateUserSkills) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(866435907, 32);
    b_0.storeAddress(src.address);
    b_0.storeDict(
      src.skills,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
  };
}

export function loadUpdateUserSkills(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 866435907) {
    throw Error("Invalid prefix");
  }
  let _address = sc_0.loadAddress();
  let _skills = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_0
  );
  return {
    $$type: "UpdateUserSkills" as const,
    address: _address,
    skills: _skills,
  };
}

function loadTupleUpdateUserSkills(source: TupleReader) {
  let _address = source.readAddress();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  return {
    $$type: "UpdateUserSkills" as const,
    address: _address,
    skills: _skills,
  };
}

function loadGetterTupleUpdateUserSkills(source: TupleReader) {
  let _address = source.readAddress();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  return {
    $$type: "UpdateUserSkills" as const,
    address: _address,
    skills: _skills,
  };
}

function storeTupleUpdateUserSkills(source: UpdateUserSkills) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.address);
  builder.writeCell(
    source.skills.size > 0
      ? beginCell()
          .storeDictDirect(
            source.skills,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserUpdateUserSkills(): DictionaryValue<UpdateUserSkills> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateUserSkills(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateUserSkills(src.loadRef().beginParse());
    },
  };
}

export type CreateJob = {
  $$type: "CreateJob";
  title: string;
  description: string;
  compensation: bigint;
  skills: Dictionary<bigint, Cell>;
  numberOfSkills: bigint;
};

export function storeCreateJob(src: CreateJob) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2145471093, 32);
    b_0.storeStringRefTail(src.title);
    b_0.storeStringRefTail(src.description);
    b_0.storeCoins(src.compensation);
    b_0.storeDict(
      src.skills,
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Cell()
    );
    b_0.storeInt(src.numberOfSkills, 257);
  };
}

export function loadCreateJob(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2145471093) {
    throw Error("Invalid prefix");
  }
  let _title = sc_0.loadStringRefTail();
  let _description = sc_0.loadStringRefTail();
  let _compensation = sc_0.loadCoins();
  let _skills = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    sc_0
  );
  let _numberOfSkills = sc_0.loadIntBig(257);
  return {
    $$type: "CreateJob" as const,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
  };
}

function loadTupleCreateJob(source: TupleReader) {
  let _title = source.readString();
  let _description = source.readString();
  let _compensation = source.readBigNumber();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _numberOfSkills = source.readBigNumber();
  return {
    $$type: "CreateJob" as const,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
  };
}

function loadGetterTupleCreateJob(source: TupleReader) {
  let _title = source.readString();
  let _description = source.readString();
  let _compensation = source.readBigNumber();
  let _skills = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    Dictionary.Values.Cell(),
    source.readCellOpt()
  );
  let _numberOfSkills = source.readBigNumber();
  return {
    $$type: "CreateJob" as const,
    title: _title,
    description: _description,
    compensation: _compensation,
    skills: _skills,
    numberOfSkills: _numberOfSkills,
  };
}

function storeTupleCreateJob(source: CreateJob) {
  let builder = new TupleBuilder();
  builder.writeString(source.title);
  builder.writeString(source.description);
  builder.writeNumber(source.compensation);
  builder.writeCell(
    source.skills.size > 0
      ? beginCell()
          .storeDictDirect(
            source.skills,
            Dictionary.Keys.BigInt(257),
            Dictionary.Values.Cell()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.numberOfSkills);
  return builder.build();
}

function dictValueParserCreateJob(): DictionaryValue<CreateJob> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreateJob(src)).endCell());
    },
    parse: (src) => {
      return loadCreateJob(src.loadRef().beginParse());
    },
  };
}

export type ApplyForJob = {
  $$type: "ApplyForJob";
  job_id: bigint;
};

export function storeApplyForJob(src: ApplyForJob) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3911931354, 32);
    b_0.storeInt(src.job_id, 257);
  };
}

export function loadApplyForJob(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3911931354) {
    throw Error("Invalid prefix");
  }
  let _job_id = sc_0.loadIntBig(257);
  return { $$type: "ApplyForJob" as const, job_id: _job_id };
}

function loadTupleApplyForJob(source: TupleReader) {
  let _job_id = source.readBigNumber();
  return { $$type: "ApplyForJob" as const, job_id: _job_id };
}

function loadGetterTupleApplyForJob(source: TupleReader) {
  let _job_id = source.readBigNumber();
  return { $$type: "ApplyForJob" as const, job_id: _job_id };
}

function storeTupleApplyForJob(source: ApplyForJob) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.job_id);
  return builder.build();
}

function dictValueParserApplyForJob(): DictionaryValue<ApplyForJob> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeApplyForJob(src)).endCell());
    },
    parse: (src) => {
      return loadApplyForJob(src.loadRef().beginParse());
    },
  };
}

export type AcceptApplicant = {
  $$type: "AcceptApplicant";
  job_id: bigint;
  applicant: Address;
};

export function storeAcceptApplicant(src: AcceptApplicant) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1154121528, 32);
    b_0.storeInt(src.job_id, 257);
    b_0.storeAddress(src.applicant);
  };
}

export function loadAcceptApplicant(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1154121528) {
    throw Error("Invalid prefix");
  }
  let _job_id = sc_0.loadIntBig(257);
  let _applicant = sc_0.loadAddress();
  return {
    $$type: "AcceptApplicant" as const,
    job_id: _job_id,
    applicant: _applicant,
  };
}

function loadTupleAcceptApplicant(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _applicant = source.readAddress();
  return {
    $$type: "AcceptApplicant" as const,
    job_id: _job_id,
    applicant: _applicant,
  };
}

function loadGetterTupleAcceptApplicant(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _applicant = source.readAddress();
  return {
    $$type: "AcceptApplicant" as const,
    job_id: _job_id,
    applicant: _applicant,
  };
}

function storeTupleAcceptApplicant(source: AcceptApplicant) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.job_id);
  builder.writeAddress(source.applicant);
  return builder.build();
}

function dictValueParserAcceptApplicant(): DictionaryValue<AcceptApplicant> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAcceptApplicant(src)).endCell());
    },
    parse: (src) => {
      return loadAcceptApplicant(src.loadRef().beginParse());
    },
  };
}

export type CompleteJob = {
  $$type: "CompleteJob";
  job_id: bigint;
  employer_rating: bigint;
  employer_review: string;
};

export function storeCompleteJob(src: CompleteJob) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(740274757, 32);
    b_0.storeInt(src.job_id, 257);
    b_0.storeInt(src.employer_rating, 257);
    b_0.storeStringRefTail(src.employer_review);
  };
}

export function loadCompleteJob(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 740274757) {
    throw Error("Invalid prefix");
  }
  let _job_id = sc_0.loadIntBig(257);
  let _employer_rating = sc_0.loadIntBig(257);
  let _employer_review = sc_0.loadStringRefTail();
  return {
    $$type: "CompleteJob" as const,
    job_id: _job_id,
    employer_rating: _employer_rating,
    employer_review: _employer_review,
  };
}

function loadTupleCompleteJob(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _employer_rating = source.readBigNumber();
  let _employer_review = source.readString();
  return {
    $$type: "CompleteJob" as const,
    job_id: _job_id,
    employer_rating: _employer_rating,
    employer_review: _employer_review,
  };
}

function loadGetterTupleCompleteJob(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _employer_rating = source.readBigNumber();
  let _employer_review = source.readString();
  return {
    $$type: "CompleteJob" as const,
    job_id: _job_id,
    employer_rating: _employer_rating,
    employer_review: _employer_review,
  };
}

function storeTupleCompleteJob(source: CompleteJob) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.job_id);
  builder.writeNumber(source.employer_rating);
  builder.writeString(source.employer_review);
  return builder.build();
}

function dictValueParserCompleteJob(): DictionaryValue<CompleteJob> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCompleteJob(src)).endCell());
    },
    parse: (src) => {
      return loadCompleteJob(src.loadRef().beginParse());
    },
  };
}

export type MarkJobCompleted = {
  $$type: "MarkJobCompleted";
  job_id: bigint;
  worker_rating: bigint;
  worker_review: string;
  nft_metadata: Cell;
};

export function storeMarkJobCompleted(src: MarkJobCompleted) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2796793256, 32);
    b_0.storeInt(src.job_id, 257);
    b_0.storeInt(src.worker_rating, 257);
    b_0.storeStringRefTail(src.worker_review);
    b_0.storeRef(src.nft_metadata);
  };
}

export function loadMarkJobCompleted(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2796793256) {
    throw Error("Invalid prefix");
  }
  let _job_id = sc_0.loadIntBig(257);
  let _worker_rating = sc_0.loadIntBig(257);
  let _worker_review = sc_0.loadStringRefTail();
  let _nft_metadata = sc_0.loadRef();
  return {
    $$type: "MarkJobCompleted" as const,
    job_id: _job_id,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    nft_metadata: _nft_metadata,
  };
}

function loadTupleMarkJobCompleted(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _worker_rating = source.readBigNumber();
  let _worker_review = source.readString();
  let _nft_metadata = source.readCell();
  return {
    $$type: "MarkJobCompleted" as const,
    job_id: _job_id,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    nft_metadata: _nft_metadata,
  };
}

function loadGetterTupleMarkJobCompleted(source: TupleReader) {
  let _job_id = source.readBigNumber();
  let _worker_rating = source.readBigNumber();
  let _worker_review = source.readString();
  let _nft_metadata = source.readCell();
  return {
    $$type: "MarkJobCompleted" as const,
    job_id: _job_id,
    worker_rating: _worker_rating,
    worker_review: _worker_review,
    nft_metadata: _nft_metadata,
  };
}

function storeTupleMarkJobCompleted(source: MarkJobCompleted) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.job_id);
  builder.writeNumber(source.worker_rating);
  builder.writeString(source.worker_review);
  builder.writeCell(source.nft_metadata);
  return builder.build();
}

function dictValueParserMarkJobCompleted(): DictionaryValue<MarkJobCompleted> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMarkJobCompleted(src)).endCell());
    },
    parse: (src) => {
      return loadMarkJobCompleted(src.loadRef().beginParse());
    },
  };
}

export type CreatePost = {
  $$type: "CreatePost";
  title: string;
  content: string;
};

export function storeCreatePost(src: CreatePost) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4135643676, 32);
    b_0.storeStringRefTail(src.title);
    b_0.storeStringRefTail(src.content);
  };
}

export function loadCreatePost(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4135643676) {
    throw Error("Invalid prefix");
  }
  let _title = sc_0.loadStringRefTail();
  let _content = sc_0.loadStringRefTail();
  return { $$type: "CreatePost" as const, title: _title, content: _content };
}

function loadTupleCreatePost(source: TupleReader) {
  let _title = source.readString();
  let _content = source.readString();
  return { $$type: "CreatePost" as const, title: _title, content: _content };
}

function loadGetterTupleCreatePost(source: TupleReader) {
  let _title = source.readString();
  let _content = source.readString();
  return { $$type: "CreatePost" as const, title: _title, content: _content };
}

function storeTupleCreatePost(source: CreatePost) {
  let builder = new TupleBuilder();
  builder.writeString(source.title);
  builder.writeString(source.content);
  return builder.build();
}

function dictValueParserCreatePost(): DictionaryValue<CreatePost> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreatePost(src)).endCell());
    },
    parse: (src) => {
      return loadCreatePost(src.loadRef().beginParse());
    },
  };
}

export type CreateComment = {
  $$type: "CreateComment";
  post_id: bigint;
  content: string;
};

export function storeCreateComment(src: CreateComment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2087763562, 32);
    b_0.storeInt(src.post_id, 257);
    b_0.storeStringRefTail(src.content);
  };
}

export function loadCreateComment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2087763562) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  let _content = sc_0.loadStringRefTail();
  return {
    $$type: "CreateComment" as const,
    post_id: _post_id,
    content: _content,
  };
}

function loadTupleCreateComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _content = source.readString();
  return {
    $$type: "CreateComment" as const,
    post_id: _post_id,
    content: _content,
  };
}

function loadGetterTupleCreateComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _content = source.readString();
  return {
    $$type: "CreateComment" as const,
    post_id: _post_id,
    content: _content,
  };
}

function storeTupleCreateComment(source: CreateComment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  builder.writeString(source.content);
  return builder.build();
}

function dictValueParserCreateComment(): DictionaryValue<CreateComment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeCreateComment(src)).endCell());
    },
    parse: (src) => {
      return loadCreateComment(src.loadRef().beginParse());
    },
  };
}

export type UpvotePost = {
  $$type: "UpvotePost";
  post_id: bigint;
};

export function storeUpvotePost(src: UpvotePost) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3738961019, 32);
    b_0.storeInt(src.post_id, 257);
  };
}

export function loadUpvotePost(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3738961019) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  return { $$type: "UpvotePost" as const, post_id: _post_id };
}

function loadTupleUpvotePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "UpvotePost" as const, post_id: _post_id };
}

function loadGetterTupleUpvotePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "UpvotePost" as const, post_id: _post_id };
}

function storeTupleUpvotePost(source: UpvotePost) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  return builder.build();
}

function dictValueParserUpvotePost(): DictionaryValue<UpvotePost> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpvotePost(src)).endCell());
    },
    parse: (src) => {
      return loadUpvotePost(src.loadRef().beginParse());
    },
  };
}

export type DownvotePost = {
  $$type: "DownvotePost";
  post_id: bigint;
};

export function storeDownvotePost(src: DownvotePost) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1032607009, 32);
    b_0.storeInt(src.post_id, 257);
  };
}

export function loadDownvotePost(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1032607009) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  return { $$type: "DownvotePost" as const, post_id: _post_id };
}

function loadTupleDownvotePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "DownvotePost" as const, post_id: _post_id };
}

function loadGetterTupleDownvotePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "DownvotePost" as const, post_id: _post_id };
}

function storeTupleDownvotePost(source: DownvotePost) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  return builder.build();
}

function dictValueParserDownvotePost(): DictionaryValue<DownvotePost> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDownvotePost(src)).endCell());
    },
    parse: (src) => {
      return loadDownvotePost(src.loadRef().beginParse());
    },
  };
}

export type UpvoteComment = {
  $$type: "UpvoteComment";
  post_id: bigint;
  comment_id: bigint;
};

export function storeUpvoteComment(src: UpvoteComment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(701674783, 32);
    b_0.storeInt(src.post_id, 257);
    b_0.storeInt(src.comment_id, 257);
  };
}

export function loadUpvoteComment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 701674783) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  let _comment_id = sc_0.loadIntBig(257);
  return {
    $$type: "UpvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function loadTupleUpvoteComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _comment_id = source.readBigNumber();
  return {
    $$type: "UpvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function loadGetterTupleUpvoteComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _comment_id = source.readBigNumber();
  return {
    $$type: "UpvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function storeTupleUpvoteComment(source: UpvoteComment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  builder.writeNumber(source.comment_id);
  return builder.build();
}

function dictValueParserUpvoteComment(): DictionaryValue<UpvoteComment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpvoteComment(src)).endCell());
    },
    parse: (src) => {
      return loadUpvoteComment(src.loadRef().beginParse());
    },
  };
}

export type DownvoteComment = {
  $$type: "DownvoteComment";
  post_id: bigint;
  comment_id: bigint;
};

export function storeDownvoteComment(src: DownvoteComment) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3122688837, 32);
    b_0.storeInt(src.post_id, 257);
    b_0.storeInt(src.comment_id, 257);
  };
}

export function loadDownvoteComment(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3122688837) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  let _comment_id = sc_0.loadIntBig(257);
  return {
    $$type: "DownvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function loadTupleDownvoteComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _comment_id = source.readBigNumber();
  return {
    $$type: "DownvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function loadGetterTupleDownvoteComment(source: TupleReader) {
  let _post_id = source.readBigNumber();
  let _comment_id = source.readBigNumber();
  return {
    $$type: "DownvoteComment" as const,
    post_id: _post_id,
    comment_id: _comment_id,
  };
}

function storeTupleDownvoteComment(source: DownvoteComment) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  builder.writeNumber(source.comment_id);
  return builder.build();
}

function dictValueParserDownvoteComment(): DictionaryValue<DownvoteComment> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDownvoteComment(src)).endCell());
    },
    parse: (src) => {
      return loadDownvoteComment(src.loadRef().beginParse());
    },
  };
}

export type ArchivePost = {
  $$type: "ArchivePost";
  post_id: bigint;
};

export function storeArchivePost(src: ArchivePost) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1408430500, 32);
    b_0.storeInt(src.post_id, 257);
  };
}

export function loadArchivePost(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1408430500) {
    throw Error("Invalid prefix");
  }
  let _post_id = sc_0.loadIntBig(257);
  return { $$type: "ArchivePost" as const, post_id: _post_id };
}

function loadTupleArchivePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "ArchivePost" as const, post_id: _post_id };
}

function loadGetterTupleArchivePost(source: TupleReader) {
  let _post_id = source.readBigNumber();
  return { $$type: "ArchivePost" as const, post_id: _post_id };
}

function storeTupleArchivePost(source: ArchivePost) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.post_id);
  return builder.build();
}

function dictValueParserArchivePost(): DictionaryValue<ArchivePost> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeArchivePost(src)).endCell());
    },
    parse: (src) => {
      return loadArchivePost(src.loadRef().beginParse());
    },
  };
}

export type DecentralisedJobMarketplace$Data = {
  $$type: "DecentralisedJobMarketplace$Data";
  jobs: Dictionary<bigint, Job>;
  jobCounter: bigint;
  posts: Dictionary<bigint, Post>;
  postCounter: bigint;
  nftCollection: Address;
  users: Dictionary<Address, User>;
};

export function storeDecentralisedJobMarketplace$Data(
  src: DecentralisedJobMarketplace$Data
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeDict(src.jobs, Dictionary.Keys.BigInt(257), dictValueParserJob());
    b_0.storeInt(src.jobCounter, 257);
    b_0.storeDict(
      src.posts,
      Dictionary.Keys.BigInt(257),
      dictValueParserPost()
    );
    b_0.storeInt(src.postCounter, 257);
    b_0.storeAddress(src.nftCollection);
    b_0.storeDict(src.users, Dictionary.Keys.Address(), dictValueParserUser());
  };
}

export function loadDecentralisedJobMarketplace$Data(slice: Slice) {
  let sc_0 = slice;
  let _jobs = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserJob(),
    sc_0
  );
  let _jobCounter = sc_0.loadIntBig(257);
  let _posts = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserPost(),
    sc_0
  );
  let _postCounter = sc_0.loadIntBig(257);
  let _nftCollection = sc_0.loadAddress();
  let _users = Dictionary.load(
    Dictionary.Keys.Address(),
    dictValueParserUser(),
    sc_0
  );
  return {
    $$type: "DecentralisedJobMarketplace$Data" as const,
    jobs: _jobs,
    jobCounter: _jobCounter,
    posts: _posts,
    postCounter: _postCounter,
    nftCollection: _nftCollection,
    users: _users,
  };
}

function loadTupleDecentralisedJobMarketplace$Data(source: TupleReader) {
  let _jobs = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserJob(),
    source.readCellOpt()
  );
  let _jobCounter = source.readBigNumber();
  let _posts = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPost(),
    source.readCellOpt()
  );
  let _postCounter = source.readBigNumber();
  let _nftCollection = source.readAddress();
  let _users = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserUser(),
    source.readCellOpt()
  );
  return {
    $$type: "DecentralisedJobMarketplace$Data" as const,
    jobs: _jobs,
    jobCounter: _jobCounter,
    posts: _posts,
    postCounter: _postCounter,
    nftCollection: _nftCollection,
    users: _users,
  };
}

function loadGetterTupleDecentralisedJobMarketplace$Data(source: TupleReader) {
  let _jobs = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserJob(),
    source.readCellOpt()
  );
  let _jobCounter = source.readBigNumber();
  let _posts = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPost(),
    source.readCellOpt()
  );
  let _postCounter = source.readBigNumber();
  let _nftCollection = source.readAddress();
  let _users = Dictionary.loadDirect(
    Dictionary.Keys.Address(),
    dictValueParserUser(),
    source.readCellOpt()
  );
  return {
    $$type: "DecentralisedJobMarketplace$Data" as const,
    jobs: _jobs,
    jobCounter: _jobCounter,
    posts: _posts,
    postCounter: _postCounter,
    nftCollection: _nftCollection,
    users: _users,
  };
}

function storeTupleDecentralisedJobMarketplace$Data(
  source: DecentralisedJobMarketplace$Data
) {
  let builder = new TupleBuilder();
  builder.writeCell(
    source.jobs.size > 0
      ? beginCell()
          .storeDictDirect(
            source.jobs,
            Dictionary.Keys.BigInt(257),
            dictValueParserJob()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.jobCounter);
  builder.writeCell(
    source.posts.size > 0
      ? beginCell()
          .storeDictDirect(
            source.posts,
            Dictionary.Keys.BigInt(257),
            dictValueParserPost()
          )
          .endCell()
      : null
  );
  builder.writeNumber(source.postCounter);
  builder.writeAddress(source.nftCollection);
  builder.writeCell(
    source.users.size > 0
      ? beginCell()
          .storeDictDirect(
            source.users,
            Dictionary.Keys.Address(),
            dictValueParserUser()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserDecentralisedJobMarketplace$Data(): DictionaryValue<DecentralisedJobMarketplace$Data> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeDecentralisedJobMarketplace$Data(src)).endCell()
      );
    },
    parse: (src) => {
      return loadDecentralisedJobMarketplace$Data(src.loadRef().beginParse());
    },
  };
}

type DecentralisedJobMarketplace_init_args = {
  $$type: "DecentralisedJobMarketplace_init_args";
  nftCollection: Address;
};

function initDecentralisedJobMarketplace_init_args(
  src: DecentralisedJobMarketplace_init_args
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.nftCollection);
  };
}

async function DecentralisedJobMarketplace_init(nftCollection: Address) {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initDecentralisedJobMarketplace_init_args({
    $$type: "DecentralisedJobMarketplace_init_args",
    nftCollection,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const DecentralisedJobMarketplace_errors: {
  [key: number]: { message: string };
} = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  11: { message: `'Unknown' error` },
  12: { message: `Fatal error` },
  13: { message: `Out of gas error` },
  14: { message: `Virtualization error` },
  32: { message: `Action list is invalid` },
  33: { message: `Action list is too long` },
  34: { message: `Action is invalid or not supported` },
  35: { message: `Invalid source address in outbound message` },
  36: { message: `Invalid destination address in outbound message` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  39: { message: `Outbound message does not fit into a cell after rewriting` },
  40: { message: `Cannot process a message` },
  41: { message: `Library reference is null` },
  42: { message: `Library change action error` },
  43: {
    message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree`,
  },
  50: { message: `Account state size exceeded limits` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  12294: { message: `Only employer can accept applicant` },
  19000: { message: `Description cannot be empty` },
  20545: { message: `Job does not exist` },
  25737: { message: `Post does not exist` },
  28021: { message: `Sender is not an employer` },
  32768: { message: `Job is not accepting applicants` },
  33446: { message: `Only employer can complete job` },
  35721: { message: `Job is not assigned` },
  39216: { message: `Title cannot be empty` },
  41135: { message: `Job is not completed by worker` },
  42947: { message: `Comment does not exist` },
  46559: { message: `Worker rating must be between 1 and 5` },
  47804: { message: `User already exists` },
  50254: { message: `Job is already completed` },
  51672: { message: `Job is still accepting applicants` },
  54694: { message: `Incorrect value sent` },
  58781: { message: `Only author can archive post` },
  59813: { message: `User does not exist` },
  60462: { message: `Job already assigned` },
  61570: { message: `Only worker can complete job` },
  62101: { message: `Employer does not exist` },
};

const DecentralisedJobMarketplace_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "StdAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 8 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "VarAddress",
    header: null,
    fields: [
      {
        name: "workchain",
        type: { kind: "simple", type: "int", optional: false, format: 32 },
      },
      {
        name: "address",
        type: { kind: "simple", type: "slice", optional: false },
      },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "LogEventMintRecord",
    header: 2743565669,
    fields: [
      {
        name: "minter",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "item_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "generate_number",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "CollectionData",
    header: null,
    fields: [
      {
        name: "next_item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "Mint",
    header: 2063830592,
    fields: [
      {
        name: "recipient",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "individual_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "Transfer",
    header: 1607220500,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "OwnershipAssigned",
    header: 85167505,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "prev_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "Excesses",
    header: 3576854235,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "GetStaticData",
    header: 801842850,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "ReportStaticData",
    header: 2339837749,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "index_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "NftData",
    header: null,
    fields: [
      {
        name: "is_initialized",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "individual_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ProveOwnership",
    header: 81711432,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "dest",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "with_content",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "RequestOwner",
    header: 3502489578,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "dest",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "with_content",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "OwnershipProof",
    header: 86296494,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "revoked_at",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: true },
      },
    ],
  },
  {
    name: "OwnerInfo",
    header: 232130531,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "item_id",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "initiator",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "revoked_at",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: true },
      },
    ],
  },
  {
    name: "Revoke",
    header: 1871312355,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "Job",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "title",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "compensation",
        type: { kind: "simple", type: "uint", optional: true, format: "coins" },
      },
      {
        name: "skills",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "numberOfSkills",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "employer",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "isAcceptingApplicants",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "worker",
        type: { kind: "simple", type: "address", optional: true },
      },
      {
        name: "worker_rating",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
      {
        name: "worker_review",
        type: { kind: "simple", type: "string", optional: true },
      },
      {
        name: "isCompleted",
        type: { kind: "simple", type: "bool", optional: true },
      },
      {
        name: "applicants",
        type: { kind: "dict", key: "int", value: "address" },
      },
      {
        name: "numberOfApplicants",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "createdAt",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "completedAt",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
    ],
  },
  {
    name: "Post",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "title",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "content",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "author",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "comments",
        type: {
          kind: "dict",
          key: "int",
          value: "Comment",
          valueFormat: "ref",
        },
      },
      {
        name: "numberOfComments",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "upvotes",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "downvotes",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "createdAt",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "archivedAt",
        type: { kind: "simple", type: "int", optional: true, format: 257 },
      },
    ],
  },
  {
    name: "Comment",
    header: null,
    fields: [
      {
        name: "id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "author",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "content",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "upvotes",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "downvotes",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "User",
    header: null,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "email",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "skills",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "isEmployer",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "reputations",
        type: {
          kind: "dict",
          key: "int",
          value: "Reputation",
          valueFormat: "ref",
        },
      },
      {
        name: "numberOfReputations",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "Reputation",
    header: null,
    fields: [
      {
        name: "rating",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "review",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "CreateUser",
    header: 1292332385,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "email",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "skills",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "isEmployer",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "UpdateUserName",
    header: 2679646372,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "name",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateUserEmail",
    header: 3094807392,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "email",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpdateUserRole",
    header: 1805240506,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "isEmployer",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "UpdateUserSkills",
    header: 866435907,
    fields: [
      {
        name: "address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "skills",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
    ],
  },
  {
    name: "CreateJob",
    header: 2145471093,
    fields: [
      {
        name: "title",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "description",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "compensation",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "skills",
        type: { kind: "dict", key: "int", value: "cell", valueFormat: "ref" },
      },
      {
        name: "numberOfSkills",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "ApplyForJob",
    header: 3911931354,
    fields: [
      {
        name: "job_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "AcceptApplicant",
    header: 1154121528,
    fields: [
      {
        name: "job_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "applicant",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "CompleteJob",
    header: 740274757,
    fields: [
      {
        name: "job_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "employer_rating",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "employer_review",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "MarkJobCompleted",
    header: 2796793256,
    fields: [
      {
        name: "job_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "worker_rating",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "worker_review",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "nft_metadata",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "CreatePost",
    header: 4135643676,
    fields: [
      {
        name: "title",
        type: { kind: "simple", type: "string", optional: false },
      },
      {
        name: "content",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "CreateComment",
    header: 2087763562,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "content",
        type: { kind: "simple", type: "string", optional: false },
      },
    ],
  },
  {
    name: "UpvotePost",
    header: 3738961019,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "DownvotePost",
    header: 1032607009,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "UpvoteComment",
    header: 701674783,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "comment_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "DownvoteComment",
    header: 3122688837,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "comment_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "ArchivePost",
    header: 1408430500,
    fields: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "DecentralisedJobMarketplace$Data",
    header: null,
    fields: [
      {
        name: "jobs",
        type: { kind: "dict", key: "int", value: "Job", valueFormat: "ref" },
      },
      {
        name: "jobCounter",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "posts",
        type: { kind: "dict", key: "int", value: "Post", valueFormat: "ref" },
      },
      {
        name: "postCounter",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "nftCollection",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "users",
        type: {
          kind: "dict",
          key: "address",
          value: "User",
          valueFormat: "ref",
        },
      },
    ],
  },
];

const DecentralisedJobMarketplace_getters: ABIGetter[] = [
  {
    name: "nftCollection",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "jobs",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "Job", valueFormat: "ref" },
  },
  {
    name: "job_count",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "job",
    arguments: [
      {
        name: "job_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "Job", optional: true },
  },
  {
    name: "user",
    arguments: [
      {
        name: "userAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "User", optional: false },
  },
  {
    name: "posts",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "Post", valueFormat: "ref" },
  },
  {
    name: "post_count",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "post",
    arguments: [
      {
        name: "post_id",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
    returnType: { kind: "simple", type: "Post", optional: true },
  },
];

export const DecentralisedJobMarketplace_getterMapping: {
  [key: string]: string;
} = {
  nftCollection: "getNftCollection",
  jobs: "getJobs",
  job_count: "getJobCount",
  job: "getJob",
  user: "getUser",
  posts: "getPosts",
  post_count: "getPostCount",
  post: "getPost",
};

const DecentralisedJobMarketplace_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "CreateUser" } },
  { receiver: "internal", message: { kind: "typed", type: "UpdateUserName" } },
  { receiver: "internal", message: { kind: "typed", type: "UpdateUserEmail" } },
  { receiver: "internal", message: { kind: "typed", type: "UpdateUserRole" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateUserSkills" },
  },
  { receiver: "internal", message: { kind: "typed", type: "CreateJob" } },
  { receiver: "internal", message: { kind: "typed", type: "ApplyForJob" } },
  { receiver: "internal", message: { kind: "typed", type: "AcceptApplicant" } },
  { receiver: "internal", message: { kind: "typed", type: "CompleteJob" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "MarkJobCompleted" },
  },
  { receiver: "internal", message: { kind: "typed", type: "CreatePost" } },
  { receiver: "internal", message: { kind: "typed", type: "CreateComment" } },
  { receiver: "internal", message: { kind: "typed", type: "UpvotePost" } },
  { receiver: "internal", message: { kind: "typed", type: "DownvotePost" } },
  { receiver: "internal", message: { kind: "typed", type: "ArchivePost" } },
  { receiver: "internal", message: { kind: "typed", type: "UpvoteComment" } },
  { receiver: "internal", message: { kind: "typed", type: "DownvoteComment" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export default class DecentralisedJobMarketplace implements Contract {
  static async init(nftCollection: Address) {
    return await DecentralisedJobMarketplace_init(nftCollection);
  }

  static async fromInit(nftCollection: Address) {
    const init = await DecentralisedJobMarketplace_init(nftCollection);
    const address = contractAddress(0, init);
    return new DecentralisedJobMarketplace(address, init);
  }

  static fromAddress(address: Address) {
    return new DecentralisedJobMarketplace(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: DecentralisedJobMarketplace_types,
    getters: DecentralisedJobMarketplace_getters,
    receivers: DecentralisedJobMarketplace_receivers,
    errors: DecentralisedJobMarketplace_errors,
  };

  constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | CreateUser
      | UpdateUserName
      | UpdateUserEmail
      | UpdateUserRole
      | UpdateUserSkills
      | CreateJob
      | ApplyForJob
      | AcceptApplicant
      | CompleteJob
      | MarkJobCompleted
      | CreatePost
      | CreateComment
      | UpvotePost
      | DownvotePost
      | ArchivePost
      | UpvoteComment
      | DownvoteComment
      | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateUser"
    ) {
      body = beginCell().store(storeCreateUser(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateUserName"
    ) {
      body = beginCell().store(storeUpdateUserName(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateUserEmail"
    ) {
      body = beginCell().store(storeUpdateUserEmail(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateUserRole"
    ) {
      body = beginCell().store(storeUpdateUserRole(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateUserSkills"
    ) {
      body = beginCell().store(storeUpdateUserSkills(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateJob"
    ) {
      body = beginCell().store(storeCreateJob(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ApplyForJob"
    ) {
      body = beginCell().store(storeApplyForJob(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AcceptApplicant"
    ) {
      body = beginCell().store(storeAcceptApplicant(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CompleteJob"
    ) {
      body = beginCell().store(storeCompleteJob(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "MarkJobCompleted"
    ) {
      body = beginCell().store(storeMarkJobCompleted(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreatePost"
    ) {
      body = beginCell().store(storeCreatePost(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "CreateComment"
    ) {
      body = beginCell().store(storeCreateComment(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpvotePost"
    ) {
      body = beginCell().store(storeUpvotePost(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "DownvotePost"
    ) {
      body = beginCell().store(storeDownvotePost(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ArchivePost"
    ) {
      body = beginCell().store(storeArchivePost(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpvoteComment"
    ) {
      body = beginCell().store(storeUpvoteComment(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "DownvoteComment"
    ) {
      body = beginCell().store(storeDownvoteComment(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getNftCollection(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("nftCollection", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getJobs(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("jobs", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserJob(),
      source.readCellOpt()
    );
    return result;
  }

  async getJobCount(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("job_count", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getJob(provider: ContractProvider, job_id: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(job_id);
    let source = (await provider.get("job", builder.build())).stack;
    const result_p = source.readTupleOpt();
    console.log("result_p", result_p);
    const result = result_p ? loadTupleJob(result_p) : null;
    return result;
  }

  async getUser(provider: ContractProvider, userAddress: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(userAddress);
    let source = (await provider.get("user", builder.build())).stack;
    const result = loadGetterTupleUser(source);
    return result;
  }

  async getPosts(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("posts", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserPost(),
      source.readCellOpt()
    );
    return result;
  }

  async getPostCount(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("post_count", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getPost(provider: ContractProvider, post_id: bigint) {
    let builder = new TupleBuilder();
    builder.writeNumber(post_id);
    let source = (await provider.get("post", builder.build())).stack;
    const result_p = source.readTupleOpt();
    const result = result_p ? loadTuplePost(result_p) : null;
    return result;
  }
}
