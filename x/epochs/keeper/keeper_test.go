package keeper_test

import (
	"gitlab.com/oppy-finance/oppychain/app"
	tsimapp "gitlab.com/oppy-finance/oppychain/testutil/simapp"
	"testing"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"gitlab.com/oppy-finance/oppychain/x/epochs/types"
)

type KeeperTestSuite struct {
	suite.Suite

	app         *app.App
	ctx         sdk.Context
	queryClient types.QueryClient
}

func (suite *KeeperTestSuite) SetupTest() {
	lapp := tsimapp.New(suite.T().TempDir()).(*app.App)
	suite.app = lapp
	suite.ctx = suite.app.BaseApp.NewContext(false, tmproto.Header{})

	queryHelper := baseapp.NewQueryServerTestHelper(suite.ctx, suite.app.InterfaceRegistry())
	types.RegisterQueryServer(queryHelper, suite.app.EpochsKeeper)
	suite.queryClient = types.NewQueryClient(queryHelper)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
