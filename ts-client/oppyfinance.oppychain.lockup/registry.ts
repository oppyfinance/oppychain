import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgBeginUnlockingAll } from "./types/lockup/tx";
import { MsgExtendLockup } from "./types/lockup/tx";
import { MsgLockTokens } from "./types/lockup/tx";
import { MsgBeginUnlocking } from "./types/lockup/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/oppyfinance.oppychain.lockup.MsgBeginUnlockingAll", MsgBeginUnlockingAll],
    ["/oppyfinance.oppychain.lockup.MsgExtendLockup", MsgExtendLockup],
    ["/oppyfinance.oppychain.lockup.MsgLockTokens", MsgLockTokens],
    ["/oppyfinance.oppychain.lockup.MsgBeginUnlocking", MsgBeginUnlocking],
    
];

export { msgTypes }