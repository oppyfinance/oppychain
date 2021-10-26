import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgCreateSellOrder } from "./types/invoice/tx";
import { MsgDeleteInvoice } from "./types/invoice/tx";
import { MsgCreateInvoice } from "./types/invoice/tx";
import { MsgCreatePlaceOrder } from "./types/invoice/tx";
import { MsgDeleteSellOrder } from "./types/invoice/tx";
export declare const MissingWalletError: Error;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgCreateSellOrder: (data: MsgCreateSellOrder) => EncodeObject;
    msgDeleteInvoice: (data: MsgDeleteInvoice) => EncodeObject;
    msgCreateInvoice: (data: MsgCreateInvoice) => EncodeObject;
    msgCreatePlaceOrder: (data: MsgCreatePlaceOrder) => EncodeObject;
    msgDeleteSellOrder: (data: MsgDeleteSellOrder) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
