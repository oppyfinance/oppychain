package keeper_test

import (
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/stretchr/testify/suite"

	"github.com/tendermint/tendermint/crypto/ed25519"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	joltifyapp "gitlab.com/oppy-finance/oppychain/app"
	"gitlab.com/oppy-finance/oppychain/testutil/simapp"

	"gitlab.com/oppy-finance/oppychain/x/swap/pool_models/balancer"
	gammtypes "gitlab.com/oppy-finance/oppychain/x/swap/types"

	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/types"
)

type KeeperTestSuite struct {
	suite.Suite

	app         *joltifyapp.App
	ctx         sdk.Context
	queryClient types.QueryClient
}

func (suite *KeeperTestSuite) SetupTest() {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, "%s", runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(suite.T(), err)
	}(tempPath)

	app := simapp.New(tempPath).(*joltifyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{Height: 1, Time: time.Now().UTC()})
	suite.app = app
	suite.ctx = ctx

	queryHelper := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())
	types.RegisterQueryServer(queryHelper, suite.app.PoolIncentivesKeeper)
	suite.queryClient = types.NewQueryClient(queryHelper)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

var (
	acc1 = sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	acc2 = sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	acc3 = sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
)

func (suite *KeeperTestSuite) prepareBalancerPoolWithPoolParams(PoolParams balancer.PoolParams) uint64 {
	// Mint some assets to the accounts.
	for _, acc := range []sdk.AccAddress{acc1, acc2, acc3} {
		err := simapp.FundAccount(suite.app.BankKeeper, suite.ctx, acc, sdk.NewCoins(
			sdk.NewCoin("ujolt", sdk.NewInt(10000000000)),
			sdk.NewCoin("foo", sdk.NewInt(10000000)),
			sdk.NewCoin("bar", sdk.NewInt(10000000)),
			sdk.NewCoin("baz", sdk.NewInt(10000000)),
		))
		if err != nil {
			panic(err)
		}
	}

	poolId, err := suite.app.SwapKeeper.CreateBalancerPool(suite.ctx, acc1, PoolParams, []gammtypes.PoolAsset{
		{
			Weight: sdk.NewInt(100),
			Token:  sdk.NewCoin("foo", sdk.NewInt(5000000)),
		},
		{
			Weight: sdk.NewInt(200),
			Token:  sdk.NewCoin("bar", sdk.NewInt(5000000)),
		},
		{
			Weight: sdk.NewInt(300),
			Token:  sdk.NewCoin("baz", sdk.NewInt(5000000)),
		},
	}, "")
	suite.NoError(err)
	return poolId
}

func (suite *KeeperTestSuite) prepareBalancerPool() uint64 {
	poolId := suite.prepareBalancerPoolWithPoolParams(balancer.PoolParams{
		SwapFee: sdk.NewDec(0),
		ExitFee: sdk.NewDec(0),
	})

	spotPrice, err := suite.app.SwapKeeper.CalculateSpotPrice(suite.ctx, poolId, "foo", "bar")
	suite.NoError(err)
	suite.Equal(sdk.NewDec(2).String(), spotPrice.String())
	spotPrice, err = suite.app.SwapKeeper.CalculateSpotPrice(suite.ctx, poolId, "bar", "baz")
	suite.NoError(err)
	suite.Equal(sdk.NewDecWithPrec(15, 1).String(), spotPrice.String())
	spotPrice, err = suite.app.SwapKeeper.CalculateSpotPrice(suite.ctx, poolId, "baz", "foo")
	suite.NoError(err)
	suite.Equal(sdk.NewDec(1).Quo(sdk.NewDec(3)).String(), spotPrice.String())

	return poolId
}

func (suite *KeeperTestSuite) TestCreateBalancerPoolGauges() {
	suite.SetupTest()

	keeper := suite.app.PoolIncentivesKeeper

	// LockableDurations should be 1, 3, 7 hours from the default genesis state.
	lockableDurations := keeper.GetLockableDurations(suite.ctx)
	suite.Equal(3, len(lockableDurations))

	for i := 0; i < 3; i++ {
		poolId := suite.prepareBalancerPool()
		pool, err := suite.app.SwapKeeper.GetPool(suite.ctx, poolId)
		suite.NoError(err)

		// Same amount of gauges as lockableDurations must be created for every pool created.
		gaugeId, err := keeper.GetPoolGaugeId(suite.ctx, poolId, lockableDurations[0])
		suite.NoError(err)
		gauge, err := suite.app.IncentivesKeeper.GetGaugeByID(suite.ctx, gaugeId)
		suite.NoError(err)
		suite.Equal(0, len(gauge.Coins))
		suite.Equal(true, gauge.IsPerpetual)
		suite.Equal(pool.GetTotalShares().Denom, gauge.DistributeTo.Denom)
		suite.Equal(lockableDurations[0], gauge.DistributeTo.Duration)

		gaugeId, err = keeper.GetPoolGaugeId(suite.ctx, poolId, lockableDurations[1])
		suite.NoError(err)
		gauge, err = suite.app.IncentivesKeeper.GetGaugeByID(suite.ctx, gaugeId)
		suite.NoError(err)
		suite.Equal(0, len(gauge.Coins))
		suite.Equal(true, gauge.IsPerpetual)
		suite.Equal(pool.GetTotalShares().Denom, gauge.DistributeTo.Denom)
		suite.Equal(lockableDurations[1], gauge.DistributeTo.Duration)

		gaugeId, err = keeper.GetPoolGaugeId(suite.ctx, poolId, lockableDurations[2])
		suite.NoError(err)
		gauge, err = suite.app.IncentivesKeeper.GetGaugeByID(suite.ctx, gaugeId)
		suite.NoError(err)
		suite.Equal(0, len(gauge.Coins))
		suite.Equal(true, gauge.IsPerpetual)
		suite.Equal(pool.GetTotalShares().Denom, gauge.DistributeTo.Denom)
		suite.Equal(lockableDurations[2], gauge.DistributeTo.Duration)
	}
}
