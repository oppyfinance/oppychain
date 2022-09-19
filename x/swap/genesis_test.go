package swap_test

import (
	"os"
	path2 "path"
	"runtime"
	"testing"

	"github.com/tendermint/spm/cosmoscmd"
	oppyapp "gitlab.com/oppy-finance/oppychain/app"

	"gitlab.com/oppy-finance/oppychain/testutil/simapp"
	"gitlab.com/oppy-finance/oppychain/x/swap"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/crypto/ed25519"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"gitlab.com/oppy-finance/oppychain/x/swap/pool_models/balancer"
	"gitlab.com/oppy-finance/oppychain/x/swap/types"
)

func TestSwapInitGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	balancerPool, err := balancer.NewBalancerPool(1, balancer.PoolParams{
		SwapFee: sdk.NewDecWithPrec(1, 2),
		ExitFee: sdk.NewDecWithPrec(1, 2),
	}, []balancer.PoolAsset{
		{
			Weight: sdk.NewInt(1),
			Token:  sdk.NewInt64Coin(sdk.DefaultBondDenom, 10),
		},
		{
			Weight: sdk.NewInt(1),
			Token:  sdk.NewInt64Coin("nodetoken", 10),
		},
	}, "", ctx.BlockTime())
	require.NoError(t, err)

	any, err := codectypes.NewAnyWithValue(&balancerPool)
	require.NoError(t, err)

	swap.InitGenesis(ctx, app.SwapKeeper, types.GenesisState{
		Pools:          []*codectypes.Any{any},
		NextPoolNumber: 2,
		Params: types.Params{
			PoolCreationFee: sdk.Coins{sdk.NewInt64Coin(sdk.DefaultBondDenom, 1000_000_000)},
		},
	}, app.AppCodec())

	require.Equal(t, app.SwapKeeper.GetNextPoolNumberAndIncrement(ctx), uint64(2))
	poolStored, err := app.SwapKeeper.GetPoolAndPoke(ctx, 1)
	require.NoError(t, err)
	require.Equal(t, balancerPool.GetId(), poolStored.GetId())
	require.Equal(t, balancerPool.GetAddress(), poolStored.GetAddress())
	require.Equal(t, balancerPool.GetSwapFee(ctx), poolStored.GetSwapFee(ctx))
	require.Equal(t, balancerPool.GetExitFee(ctx), poolStored.GetExitFee(ctx))
	// require.Equal(t, balancerPool.GetTotalWeight(), sdk.Nw)
	require.Equal(t, balancerPool.GetTotalShares(), poolStored.GetTotalShares())
	// require.Equal(t, balancerPool.GetAllPoolAssets(), poolStored.GetAllPoolAssets())
	require.Equal(t, balancerPool.String(), poolStored.String())

	_, err = app.SwapKeeper.GetPoolAndPoke(ctx, 2)
	require.Error(t, err)

	liquidity := app.SwapKeeper.GetTotalLiquidity(ctx)
	require.Equal(t, liquidity, sdk.Coins{sdk.NewInt64Coin("nodetoken", 10), sdk.NewInt64Coin(sdk.DefaultBondDenom, 10)})
}

func TestGammExportGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	acc1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	err := simapp.FundAccount(app.BankKeeper, ctx, acc1, sdk.NewCoins(
		sdk.NewCoin("poppy", sdk.NewInt(100000000000000)),
		sdk.NewInt64Coin("foo", 100000),
		sdk.NewInt64Coin("bar", 100000),
	))
	require.NoError(t, err)

	msg := balancer.NewMsgCreateBalancerPool(acc1, balancer.PoolParams{
		SwapFee: sdk.NewDecWithPrec(1, 2),
		ExitFee: sdk.NewDecWithPrec(1, 2),
	}, []balancer.PoolAsset{{
		Weight: sdk.NewInt(100),
		Token:  sdk.NewCoin("foo", sdk.NewInt(10000)),
	}, {
		Weight: sdk.NewInt(100),
		Token:  sdk.NewCoin("bar", sdk.NewInt(10000)),
	}}, "")
	_, err = app.SwapKeeper.CreatePool(ctx, msg)
	require.NoError(t, err)

	msg = balancer.NewMsgCreateBalancerPool(acc1, balancer.PoolParams{
		SwapFee: sdk.NewDecWithPrec(1, 2),
		ExitFee: sdk.NewDecWithPrec(1, 2),
	}, []balancer.PoolAsset{{
		Weight: sdk.NewInt(70),
		Token:  sdk.NewCoin("foo", sdk.NewInt(10000)),
	}, {
		Weight: sdk.NewInt(100),
		Token:  sdk.NewCoin("bar", sdk.NewInt(10000)),
	}}, "")
	_, err = app.SwapKeeper.CreatePool(ctx, msg)
	require.NoError(t, err)

	genesis := swap.ExportGenesis(ctx, app.SwapKeeper)
	require.Equal(t, genesis.NextPoolNumber, uint64(3))
	require.Len(t, genesis.Pools, 2)
}

func TestMarshalUnmarshalGenesis(t *testing.T) {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	encodingConfig := cosmoscmd.MakeEncodingConfig(oppyapp.ModuleBasics)
	appCodec := encodingConfig.Marshaler
	am := swap.NewAppModule(appCodec, app.SwapKeeper)
	acc1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	err := simapp.FundAccount(app.BankKeeper, ctx, acc1, sdk.NewCoins(
		sdk.NewCoin("poppy", sdk.NewInt(100000000000000)),
		sdk.NewInt64Coin("foo", 100000),
		sdk.NewInt64Coin("bar", 100000),
	))
	require.NoError(t, err)

	msg := balancer.NewMsgCreateBalancerPool(acc1, balancer.PoolParams{
		SwapFee: sdk.NewDecWithPrec(1, 2),
		ExitFee: sdk.NewDecWithPrec(1, 2),
	}, []balancer.PoolAsset{{
		Weight: sdk.NewInt(100),
		Token:  sdk.NewCoin("foo", sdk.NewInt(10000)),
	}, {
		Weight: sdk.NewInt(100),
		Token:  sdk.NewCoin("bar", sdk.NewInt(10000)),
	}}, "")
	_, err = app.SwapKeeper.CreatePool(ctx, msg)
	require.NoError(t, err)

	genesis := am.ExportGenesis(ctx, appCodec)
	assert.NotPanics(t, func() {
		ctx := app.BaseApp.NewContext(false, tmproto.Header{})
		am := swap.NewAppModule(appCodec, app.SwapKeeper)
		am.InitGenesis(ctx, appCodec, genesis)
	})
}
