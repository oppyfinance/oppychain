// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgBeginUnlockingAll } from "./types/lockup/tx";
import { MsgBeginUnlocking } from "./types/lockup/tx";
import { MsgLockTokens } from "./types/lockup/tx";


const types = [
  ["/oppyfinance.oppychain.lockup.MsgBeginUnlockingAll", MsgBeginUnlockingAll],
  ["/oppyfinance.oppychain.lockup.MsgBeginUnlocking", MsgBeginUnlocking],
  ["/oppyfinance.oppychain.lockup.MsgLockTokens", MsgLockTokens],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgBeginUnlockingAll: (data: MsgBeginUnlockingAll): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.lockup.MsgBeginUnlockingAll", value: MsgBeginUnlockingAll.fromPartial( data ) }),
    msgBeginUnlocking: (data: MsgBeginUnlocking): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.lockup.MsgBeginUnlocking", value: MsgBeginUnlocking.fromPartial( data ) }),
    msgLockTokens: (data: MsgLockTokens): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.lockup.MsgLockTokens", value: MsgLockTokens.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
