package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	v17 "gitlab.com/oppy-finance/oppychain/x/vault/migrations/v17"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper Keeper) Migrator {
	return Migrator{keeper: keeper}
}

// Migrate2to3 from version 2 to 3.
func (m Migrator) Migrate2to3(ctx sdk.Context) error {
	return v17.MigrateStore(ctx, m.keeper.storeKey, m.keeper.cdc)
}
