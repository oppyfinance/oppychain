package vault

import (
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the outboundTx
	for _, elem := range genState.OutboundTxList {
		k.SetOutboundTx(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	// Set all the issueToken
	for _, elem := range genState.IssueTokenList {
		k.SetIssueToken(ctx, *elem)
	}

	// Set all the createPool
	for _, elem := range genState.CreatePoolList {
		k.SetCreatePool(ctx, *elem)
	}

	// set all the validator info
	for _, elem := range genState.ValidatorinfoList {
		k.SetValidators(ctx, strconv.FormatInt(elem.Height, 10), *elem)
	}

	// set all standbyPower info
	for _, elem := range genState.StandbypowerList {
		k.SetStandbyPower(ctx, elem.Addr, *elem)
	}

	k.SetParams(ctx, genState.Params)

	// this line is used by starport scaffolding # ibc/genesis/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.OutboundTxList = k.GetAllOutboundTx(ctx)
	// this line is used by starport scaffolding # genesis/module/export
	// Get all issueToken
	issueTokenList := k.GetAllIssueToken(ctx)
	for _, elem := range issueTokenList {
		elem := elem
		genesis.IssueTokenList = append(genesis.IssueTokenList, &elem)
	}

	// Get all createPool
	createPoolList := k.GetAllCreatePool(ctx)
	for _, elem := range createPoolList {
		elem := elem
		genesis.CreatePoolList = append(genesis.CreatePoolList, &elem)
	}

	// Get all validator info
	validators := k.DoGetAllValidators(ctx)
	for _, elem := range validators {
		elem := elem
		genesis.ValidatorinfoList = append(genesis.ValidatorinfoList, &elem)
	}

	// set all standbypower info

	allStandbyPowerInfo := k.DoGetAllStandbyPower(ctx)
	for _, elem := range allStandbyPowerInfo {
		elem := elem
		genesis.StandbypowerList = append(genesis.StandbypowerList, &elem)
	}

	// this line is used by starport scaffolding # ibc/genesis/export

	return genesis
}
