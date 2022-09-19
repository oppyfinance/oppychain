package keeper

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/store"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	tmdb "github.com/tendermint/tm-db"
	"gitlab.com/oppy-finance/oppychain/x/epochs/keeper"
	epochtypes "gitlab.com/oppy-finance/oppychain/x/epochs/types"
)

func SetupEpochKeeper(t testing.TB) (*keeper.Keeper, sdk.Context) {
	storeKey := sdk.NewKVStoreKey(epochtypes.StoreKey)

	db := tmdb.NewMemDB()
	stateStore := store.NewCommitMultiStore(db)
	stateStore.MountStoreWithDB(storeKey, sdk.StoreTypeIAVL, db)
	require.NoError(t, stateStore.LoadLatestVersion())

	registry := codectypes.NewInterfaceRegistry()
	keeper := keeper.NewKeeper(
		codec.NewProtoCodec(registry),
		storeKey,
	)
	ctx := sdk.NewContext(stateStore, tmproto.Header{}, false, log.NewNopLogger())
	return keeper, ctx
}
