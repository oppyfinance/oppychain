import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateGauge } from "./types/incentives/tx";
import { MsgAddToGauge } from "./types/incentives/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/oppyfinance.oppychain.incentives.MsgCreateGauge", MsgCreateGauge],
    ["/oppyfinance.oppychain.incentives.MsgAddToGauge", MsgAddToGauge],
    
];

export { msgTypes }