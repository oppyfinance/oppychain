package pricefeed_test

import (
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"testing"

	oppyapp "gitlab.com/oppy-finance/oppychain/app"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.com/oppy-finance/oppychain/x/pricefeed"
	"gitlab.com/oppy-finance/oppychain/x/pricefeed/keeper"

	"github.com/stretchr/testify/suite"
)

type GenesisTestSuite struct {
	suite.Suite

	tApp   *oppyapp.App
	ctx    sdk.Context
	keeper keeper.Keeper
}

func (suite *GenesisTestSuite) SetupTest() {

	app, ctx := keepertest.SetupVaultApp(suite.T())
	suite.tApp = app
	suite.ctx = ctx
	suite.keeper = suite.tApp.PriceFeedKeeper
}

func (suite *GenesisTestSuite) TestValidGenState() {
	app := suite.tApp
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	//
	//swap.InitGenesis(ctx, app.SwapKeeper, types.GenesisState{
	//	Pools:          []*codectypes.Any{any},
	//	NextPoolNumber: 2,
	//	Params: types.Params{
	//		PoolCreationFee: sdk.Coins{sdk.NewInt64Coin(sdk.DefaultBondDenom, 1000_000_000)},
	//	},
	//}, app.AppCodec())
	//

	NewPricefeedGenStateMulti()

	pricefeed.InitGenesis(ctx, app.PriceFeedKeeper, &NewPricefeedGenStateMulti())

	_, addrs := app.GeneratePrivKeyAddressPairs(10)

	// Must create a new TestApp or InitChain will panic with index already set
	suite.tApp = app.NewTestApp()
	suite.NotPanics(func() {
		suite.tApp.InitializeFromGenesisStates(
			NewPricefeedGenStateWithOracles(addrs),
		)
	})
}

func (suite *GenesisTestSuite) TestInitExportGenState() {
	gs := NewPricefeedGen()

	suite.NotPanics(func() {
		pricefeed.InitGenesis(suite.ctx, suite.keeper, gs)
	})

	exportedGs := pricefeed.ExportGenesis(suite.ctx, suite.keeper)
	suite.NoError(gs.VerboseEqual(exportedGs), "exported genesis should match init genesis")
}

func (suite *GenesisTestSuite) TestParamPricesGenState() {
	gs := NewPricefeedGen()

	suite.NotPanics(func() {
		pricefeed.InitGenesis(suite.ctx, suite.keeper, gs)
	})

	params := suite.keeper.GetParams(suite.ctx)
	suite.NoError(gs.Params.VerboseEqual(params), "params should equal init params")

	pps := suite.keeper.GetRawPrices(suite.ctx, "btc:usd")
	suite.NoError(gs.PostedPrices[0].VerboseEqual(pps[0]), "posted prices should equal init posted prices")
}

func TestGenesisTestSuite(t *testing.T) {
	suite.Run(t, new(GenesisTestSuite))
}
