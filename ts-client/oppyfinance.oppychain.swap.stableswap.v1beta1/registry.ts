import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgCreateStableswapPool } from "./types/swap/pool_models/stableswap/tx";
import { MsgStableSwapAdjustScalingFactors } from "./types/swap/pool_models/stableswap/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/oppyfinance.oppychain.swap.stableswap.v1beta1.MsgCreateStableswapPool", MsgCreateStableswapPool],
    ["/oppyfinance.oppychain.swap.stableswap.v1beta1.MsgStableSwapAdjustScalingFactors", MsgStableSwapAdjustScalingFactors],
    
];

export { msgTypes }