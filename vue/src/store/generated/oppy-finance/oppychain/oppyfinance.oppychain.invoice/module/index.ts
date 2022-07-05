// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateSellOrder } from "./types/invoice/tx";
import { MsgCreatePlaceOrder } from "./types/invoice/tx";
import { MsgDeleteInvoice } from "./types/invoice/tx";
import { MsgDeleteSellOrder } from "./types/invoice/tx";
import { MsgCreateInvoice } from "./types/invoice/tx";


const types = [
  ["/oppyfinance.oppychain.invoice.MsgCreateSellOrder", MsgCreateSellOrder],
  ["/oppyfinance.oppychain.invoice.MsgCreatePlaceOrder", MsgCreatePlaceOrder],
  ["/oppyfinance.oppychain.invoice.MsgDeleteInvoice", MsgDeleteInvoice],
  ["/oppyfinance.oppychain.invoice.MsgDeleteSellOrder", MsgDeleteSellOrder],
  ["/oppyfinance.oppychain.invoice.MsgCreateInvoice", MsgCreateInvoice],
  
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
    msgCreateSellOrder: (data: MsgCreateSellOrder): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.invoice.MsgCreateSellOrder", value: MsgCreateSellOrder.fromPartial( data ) }),
    msgCreatePlaceOrder: (data: MsgCreatePlaceOrder): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.invoice.MsgCreatePlaceOrder", value: MsgCreatePlaceOrder.fromPartial( data ) }),
    msgDeleteInvoice: (data: MsgDeleteInvoice): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.invoice.MsgDeleteInvoice", value: MsgDeleteInvoice.fromPartial( data ) }),
    msgDeleteSellOrder: (data: MsgDeleteSellOrder): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.invoice.MsgDeleteSellOrder", value: MsgDeleteSellOrder.fromPartial( data ) }),
    msgCreateInvoice: (data: MsgCreateInvoice): EncodeObject => ({ typeUrl: "/oppyfinance.oppychain.invoice.MsgCreateInvoice", value: MsgCreateInvoice.fromPartial( data ) }),
    
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
