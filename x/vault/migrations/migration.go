package migrations

import (
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
)

// Migrator is a struct for handling in-place store migrations.
type Migrator struct {
	keeper vaultmodulekeeper.Keeper
}

// NewMigrator returns a new Migrator.
func NewMigrator(keeper vaultmodulekeeper.Keeper) Migrator {
	return Migrator{keeper: keeper}
}

//
//// Migrate1to2 migrates from version 1 to 2.
//func (m Migrator) Migrate2to3(ctx sdk.Context) error {
//	return v17.MigrateStore(ctx, m.keeper.storeKey, m.keeper.cdc)
//}
