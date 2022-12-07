import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgExitSwapShareAmountIn } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountIn } from "./types/swap/v1beta1/tx";
import { MsgJoinSwapShareAmountOut } from "./types/swap/v1beta1/tx";
import { MsgExitSwapExternAmountOut } from "./types/swap/v1beta1/tx";
import { MsgJoinPool } from "./types/swap/v1beta1/tx";
import { MsgExitPool } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountOut } from "./types/swap/v1beta1/tx";
import { MsgJoinSwapExternAmountIn } from "./types/swap/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapShareAmountIn", MsgExitSwapShareAmountIn],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountIn", MsgSwapExactAmountIn],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapShareAmountOut", MsgJoinSwapShareAmountOut],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapExternAmountOut", MsgExitSwapExternAmountOut],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinPool", MsgJoinPool],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgExitPool", MsgExitPool],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountOut", MsgSwapExactAmountOut],
    ["/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapExternAmountIn", MsgJoinSwapExternAmountIn],
    
];

export { msgTypes }