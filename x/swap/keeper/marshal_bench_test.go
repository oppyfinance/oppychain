package keeper_test

import (
	"github.com/stretchr/testify/require"
	oppyapp "gitlab.com/oppy-finance/oppychain/app"
	"gitlab.com/oppy-finance/oppychain/testutil/simapp"
	"math/rand"
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	"gitlab.com/oppy-finance/oppychain/x/swap/pool_models/balancer"
	balancertypes "gitlab.com/oppy-finance/oppychain/x/swap/pool_models/balancer"
	swaptypes "gitlab.com/oppy-finance/oppychain/x/swap/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func genPoolAssets(r *rand.Rand) []balancertypes.PoolAsset {
	denoms := []string{"IBC/0123456789ABCDEF012346789ABCDEF", "IBC/denom56789ABCDEF012346789ABCDEF"}
	assets := []balancertypes.PoolAsset{}
	for _, denom := range denoms {
		amt, _ := simtypes.RandPositiveInt(r, sdk.NewIntWithDecimal(1, 40))
		reserveAmt := sdk.NewCoin(denom, amt)
		weight := sdk.NewInt(r.Int63n(9) + 1)
		assets = append(assets, balancertypes.PoolAsset{Token: reserveAmt, Weight: weight})
	}

	return assets
}

func genPoolParams(r *rand.Rand) balancer.PoolParams {
	swapFeeInt := int64(r.Intn(1e5))
	swapFee := sdk.NewDecWithPrec(swapFeeInt, 6)

	exitFeeInt := int64(r.Intn(1e5))
	exitFee := sdk.NewDecWithPrec(exitFeeInt, 6)

	// TODO: Randomly generate LBP params
	return balancer.PoolParams{
		SwapFee:                  swapFee,
		ExitFee:                  exitFee,
		SmoothWeightChangeParams: nil,
	}
}

func setupPools(maxNumPoolsToGen int) []swaptypes.PoolI {
	r := rand.New(rand.NewSource(10))
	// setup N pools
	pools := make([]swaptypes.PoolI, 0, maxNumPoolsToGen)
	for i := 0; i < maxNumPoolsToGen; i++ {
		assets := genPoolAssets(r)
		params := genPoolParams(r)
		pool, _ := balancer.NewBalancerPool(uint64(i), params, assets, "FutureGovernorString", time.Now())
		pools = append(pools, &pool)
	}
	return pools
}

func BenchmarkSwapPoolSerialization(b *testing.B) {

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(b, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)

	maxNumPoolsToGen := 5000
	pools := setupPools(maxNumPoolsToGen)

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		j := i % maxNumPoolsToGen
		_, err := app.SwapKeeper.MarshalPool(pools[j])
		require.NoError(b, err)

	}
}

func BenchmarkSwapPoolDeserialization(b *testing.B) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(b, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)

	maxNumPoolsToGen := 5000
	pools := setupPools(maxNumPoolsToGen)
	marshals := make([][]byte, 0, maxNumPoolsToGen)
	for i := 0; i < maxNumPoolsToGen; i++ {
		bz, _ := app.SwapKeeper.MarshalPool(pools[i])
		marshals = append(marshals, bz)
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		j := i % maxNumPoolsToGen
		_, err := app.SwapKeeper.UnmarshalPool(marshals[j])
		require.NoError(b, err)
	}
}
