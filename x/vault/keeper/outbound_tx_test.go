package keeper_test

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/stretchr/testify/require"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/testutil/nullify"
	"gitlab.com/oppy-finance/oppychain/utils"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
	"math/rand"
	"strconv"
	"testing"
	"time"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNOutboundTx(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.OutboundTx {
	items := make([]types.OutboundTx, n)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	accs := simulation.RandomAccounts(r, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)
		iitems := make(map[string]types.Address)
		iitems[fmt.Sprintf("index%d", i)] = types.Address{Address: []sdk.AccAddress{accs[0].Address}}
		items[i].Items = iitems
		keeper.SetOutboundTx(ctx, items[i])
	}
	return items
}

func TestOutboundTxGet(t *testing.T) {
	utils.SetAddressPrefixes()
	app, ctx := keepertest.SetupVaultApp(t)
	items := createNOutboundTx(&app.VaultKeeper, ctx, 10)
	for _, item := range items {
		rst, found := app.VaultKeeper.GetOutboundTx(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}

func TestOutboundTxGetAll(t *testing.T) {
	app, ctx := keepertest.SetupVaultApp(t)
	items := createNOutboundTx(&app.VaultKeeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(app.VaultKeeper.GetAllOutboundTx(ctx)),
	)
}
