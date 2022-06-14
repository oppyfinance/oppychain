// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgJoinSwapShareAmountOut } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountIn } from "./types/swap/v1beta1/tx";
import { MsgJoinSwapExternAmountIn } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountOut } from "./types/swap/v1beta1/tx";
import { MsgExitPool } from "./types/swap/v1beta1/tx";
import { MsgExitSwapShareAmountIn } from "./types/swap/v1beta1/tx";
import { MsgExitSwapExternAmountOut } from "./types/swap/v1beta1/tx";
import { MsgJoinPool } from "./types/swap/v1beta1/tx";


const types = [
  ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapShareAmountOut", MsgJoinSwapShareAmountOut],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountIn", MsgSwapExactAmountIn],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapExternAmountIn", MsgJoinSwapExternAmountIn],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountOut", MsgSwapExactAmountOut],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgExitPool", MsgExitPool],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapShareAmountIn", MsgExitSwapShareAmountIn],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapExternAmountOut", MsgExitSwapExternAmountOut],
  ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinPool", MsgJoinPool],
  
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
    msgJoinSwapShareAmountOut: (data: MsgJoinSwapShareAmountOut): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapShareAmountOut", value: MsgJoinSwapShareAmountOut.fromPartial( data ) }),
    msgSwapExactAmountIn: (data: MsgSwapExactAmountIn): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.fromPartial( data ) }),
    msgJoinSwapExternAmountIn: (data: MsgJoinSwapExternAmountIn): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapExternAmountIn", value: MsgJoinSwapExternAmountIn.fromPartial( data ) }),
    msgSwapExactAmountOut: (data: MsgSwapExactAmountOut): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountOut", value: MsgSwapExactAmountOut.fromPartial( data ) }),
    msgExitPool: (data: MsgExitPool): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitPool", value: MsgExitPool.fromPartial( data ) }),
    msgExitSwapShareAmountIn: (data: MsgExitSwapShareAmountIn): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapShareAmountIn", value: MsgExitSwapShareAmountIn.fromPartial( data ) }),
    msgExitSwapExternAmountOut: (data: MsgExitSwapExternAmountOut): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapExternAmountOut", value: MsgExitSwapExternAmountOut.fromPartial( data ) }),
    msgJoinPool: (data: MsgJoinPool): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinPool", value: MsgJoinPool.fromPartial( data ) }),
    
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
