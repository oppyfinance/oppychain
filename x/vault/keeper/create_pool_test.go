package keeper_test

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func createNCreatePool(keeper *keeper.Keeper, ctx sdk.Context, n int, addresses []sdk.AccAddress) []types.CreatePool {
	items := make([]types.CreatePool, n)
	for i := range items {
		poolProposal := types.PoolProposal{
			PoolPubKey: fmt.Sprintf("%d", i),
		}
		poolProposal.Nodes = addresses
		items[i].Proposal = []*types.PoolProposal{&poolProposal}
		items[i].BlockHeight = fmt.Sprintf("%d", i)
		keeper.SetCreatePool(ctx, items[i])
	}
	return items
}

func TestCreatePoolGet(t *testing.T) {
	var addresses []sdk.AccAddress
	for i := 0; i < 3; i++ {
		sk := ed25519.GenPrivKey()
		addr := sk.PubKey().Address().Bytes()
		addresses = append(addresses, addr)
	}

	app, ctx := keepertest.SetupVaultApp(t)
	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	for _, item := range items {
		rst, found := app.VaultKeeper.GetCreatePool(ctx, item.BlockHeight)
		assert.True(t, found)
		assert.Equal(t, item, rst)
	}
}

func TestCreatePoolRemove(t *testing.T) {
	var addresses []sdk.AccAddress
	for i := 0; i < 3; i++ {
		sk := ed25519.GenPrivKey()
		addr := sk.PubKey().Address().Bytes()
		addresses = append(addresses, addr)
	}

	app, ctx := keepertest.SetupVaultApp(t)

	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	for _, item := range items {
		app.VaultKeeper.RemoveCreatePool(ctx, item.BlockHeight)
		_, found := app.VaultKeeper.GetCreatePool(ctx, item.BlockHeight)
		assert.False(t, found)
	}
}

func TestCreatePoolGetAll(t *testing.T) {
	var addresses []sdk.AccAddress
	for i := 0; i < 3; i++ {
		sk := ed25519.GenPrivKey()
		addr := sk.PubKey().Address().Bytes()
		addresses = append(addresses, addr)
	}
	app, ctx := keepertest.SetupVaultApp(t)
	items := createNCreatePool(&app.VaultKeeper, ctx, 10, addresses)
	assert.Equal(t, items, app.VaultKeeper.GetAllCreatePool(ctx))
}
