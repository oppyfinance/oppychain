package keeper_test

import (
	"context"
	oppyapp "gitlab.com/oppy-finance/oppychain/app"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func setupMsgServer(t testing.TB) (*oppyapp.App, types.MsgServer, context.Context) {
	app, ctx := keepertest.SetupVaultApp(t)
	return app, keeper.NewMsgServerImpl(app.VaultKeeper), sdk.WrapSDKContext(ctx)
}
