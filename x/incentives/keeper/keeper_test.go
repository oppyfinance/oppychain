package keeper_test

import (
	"github.com/stretchr/testify/require"
	"os"
	path2 "path"
	"runtime"
	"testing"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	oppyapp "gitlab.com/oppy-finance/oppychain/app"
	"gitlab.com/oppy-finance/oppychain/testutil/simapp"
)

type KeeperTestSuite struct {
	suite.Suite

	ctx sdk.Context
	app *oppyapp.App
}

func (suite *KeeperTestSuite) SetupTest() {
	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(suite.T(), err)
	}(tempPath)

	app := simapp.New(tempPath).(*oppyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{Height: 1, ChainID: "joltify-1", Time: time.Now().UTC()})
	suite.app = app
	suite.ctx = ctx

	lockableDurations := suite.app.IncentivesKeeper.GetLockableDurations(suite.ctx)
	lockableDurations = append(lockableDurations, 2*time.Second)
	suite.app.IncentivesKeeper.SetLockableDurations(suite.ctx, lockableDurations)
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}
