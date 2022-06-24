package keeper_test

import (
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"os"
	path2 "path"
	"runtime"

	"gitlab.com/oppy-finance/oppychain/testutil/simapp"
	"gitlab.com/oppy-finance/oppychain/x/mint/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	oppyapp "gitlab.com/oppy-finance/oppychain/app"
)

// returns context and an app with updated mint keeper
func createTestApp(isCheckTx bool) (*oppyapp.App, sdk.Context) {

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		panic(err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)

	ctx := app.BaseApp.NewContext(isCheckTx, tmproto.Header{})
	app.MintKeeper.SetParams(ctx, types.DefaultParams())
	app.MintKeeper.SetMinter(ctx, types.DefaultInitialMinter())

	return app, ctx
}
