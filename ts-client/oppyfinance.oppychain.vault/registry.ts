import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateOutboundTx } from "./types/vault/tx";
import { MsgCreateCreatePool } from "./types/vault/tx";
import { MsgCreateIssueToken } from "./types/vault/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/oppyfinance.oppychain.vault.MsgCreateOutboundTx", MsgCreateOutboundTx],
    ["/oppyfinance.oppychain.vault.MsgCreateCreatePool", MsgCreateCreatePool],
    ["/oppyfinance.oppychain.vault.MsgCreateIssueToken", MsgCreateIssueToken],
    
];

export { msgTypes }