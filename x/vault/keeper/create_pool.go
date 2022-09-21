package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

// SetCreatePool set a specific createPool in the store from its index
func (k Keeper) SetCreatePool(ctx sdk.Context, createPool types.CreatePool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	b := k.cdc.MustMarshal(&createPool)
	store.Set(types.KeyPrefix(createPool.BlockHeight), b)
}

// UpdateLastTwoPool updates the last two pool
func (k Keeper) UpdateLastTwoPool(ctx sdk.Context, latestPool types.CreatePool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LastTwoPoolKey))

	c := sdk.WrapSDKContext(ctx)
	minNodesNeed := k.calMinSupportNodes(c)
	find := false
	for _, el := range latestPool.Proposal {
		if int32(len(el.Nodes)) >= minNodesNeed {
			find = true
			break
		}
	}

	if !find {
		return
	}

	b := k.cdc.MustMarshal(&latestPool)
	previous := store.Get(types.KeyPrefix("new"))
	if previous == nil {
		store.Set(types.KeyPrefix("new"), b)
		return
	}
	var previousItem types.CreatePool
	k.cdc.MustUnmarshal(previous, &previousItem)

	// check whether have been submitted by others
	if previousItem.BlockHeight == latestPool.BlockHeight {
		store.Set(types.KeyPrefix("new"), b)
		return
	}

	store.Set(types.KeyPrefix("old"), previous)
	store.Set(types.KeyPrefix("new"), b)
}

func (k Keeper) GetLatestTwoPool(ctx sdk.Context) []*types.CreatePool {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.LastTwoPoolKey))
	previous := store.Get(types.KeyPrefix("old"))
	latest := store.Get(types.KeyPrefix("new"))

	var o1, n1 types.CreatePool
	k.cdc.MustUnmarshal(previous, &o1)
	k.cdc.MustUnmarshal(latest, &n1)
	return []*types.CreatePool{&n1, &o1}
}

// GetCreatePool returns a createPool from its index
func (k Keeper) GetCreatePool(ctx sdk.Context, index string) (val types.CreatePool, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))

	b := store.Get(types.KeyPrefix(index))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveCreatePool removes a createPool from the store
func (k Keeper) RemoveCreatePool(ctx sdk.Context, index string) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	store.Delete(types.KeyPrefix(index))
}

// GetAllCreatePool returns all createPool
func (k Keeper) GetAllCreatePool(ctx sdk.Context) (list []types.CreatePool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CreatePoolKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.CreatePool
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}
