package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

// SetQuotaData set a specific createPool in the store from its index
func (k Keeper) SetQuotaData(ctx sdk.Context, coinsQuota types.CoinsQuota) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.QuotaStoreKey))
	b := k.cdc.MustMarshal(&coinsQuota)

	store.Set(types.KeyPrefix("info"), b)
}

// GetQuotaData returns a createPool from its index
func (k Keeper) GetQuotaData(ctx sdk.Context) (val types.CoinsQuota, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.QuotaStoreKey))

	b := store.Get(types.KeyPrefix("info"))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}
