package types

import sdk "github.com/cosmos/cosmos-sdk/types"

type SwapHooks interface {
	// AfterPoolCreated is called after CreatePool
	AfterPoolCreated(ctx sdk.Context, sender sdk.AccAddress, poolId uint64)
	// AfterJoinPool is called after JoinPool, JoinSwapExternAmountIn, and JoinSwapShareAmountOut
	AfterJoinPool(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, enterCoins sdk.Coins, shareOutAmount sdk.Int)
	// AfterExitPool is called after ExitPool, ExitSwapShareAmountIn, and ExitSwapExternAmountOut
	AfterExitPool(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, shareInAmount sdk.Int, exitCoins sdk.Coins)
	// AfterSwap is called after SwapExactAmountIn and SwapExactAmountOut
	AfterSwap(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, input sdk.Coins, output sdk.Coins)
}

var _ SwapHooks = MultiswapHooks{}

// combine multiple swap hooks, all hook functions are run in array sequence.
type MultiswapHooks []SwapHooks

// Creates hooks for the swap Module.
func NewMultiSwapHooks(hooks ...SwapHooks) MultiswapHooks {
	return hooks
}

func (h MultiswapHooks) AfterPoolCreated(ctx sdk.Context, sender sdk.AccAddress, poolId uint64) {
	for i := range h {
		h[i].AfterPoolCreated(ctx, sender, poolId)
	}
}

func (h MultiswapHooks) AfterJoinPool(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, enterCoins sdk.Coins, shareOutAmount sdk.Int) {
	for i := range h {
		h[i].AfterJoinPool(ctx, sender, poolId, enterCoins, shareOutAmount)
	}
}

func (h MultiswapHooks) AfterExitPool(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, shareInAmount sdk.Int, exitCoins sdk.Coins) {
	for i := range h {
		h[i].AfterExitPool(ctx, sender, poolId, shareInAmount, exitCoins)
	}
}

func (h MultiswapHooks) AfterSwap(ctx sdk.Context, sender sdk.AccAddress, poolId uint64, input sdk.Coins, output sdk.Coins) {
	for i := range h {
		h[i].AfterSwap(ctx, sender, poolId, input, output)
	}
}
