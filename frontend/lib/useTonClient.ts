import { TonClient } from "@ton/ton";

export const useTonClient = () => {
  return new TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: "0de935eba2ffbfa7ea3ef19cabb39c9bf57c8145f39e1a177289ff74c6b1cc11",
  });
};
