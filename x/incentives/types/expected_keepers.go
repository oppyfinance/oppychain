package types

import (
	time "time"

	"github.com/cosmos/cosmos-sdk/x/auth/types"

	epochstypes "gitlab.com/oppy-finance/oppychain/x/epochs/types"
	lockuptypes "gitlab.com/oppy-finance/oppychain/x/lockup/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// BankKeeper defines the expected interface needed to retrieve account balances.
type BankKeeper interface {
	GetAllBalances(ctx sdk.Context, addr sdk.AccAddress) sdk.Coins

	HasSupply(ctx sdk.Context, denom string) bool

	SendCoinsFromModuleToAccount(ctx sdk.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
	// SendCoinsFromModuleToManyAccounts(
	//	ctx sdk.Context, senderModule string, recipientAddrs []sdk.AccAddress, amts []sdk.Coins) error

	BlockedAddr(addr sdk.AccAddress) bool

	GetBalance(ctx sdk.Context, addr sdk.AccAddress, denom string) sdk.Coin

	SendCoinsFromAccountToModule(ctx sdk.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
}

// LockupKeeper defines the expected interface needed to retrieve locks.
type LockupKeeper interface {
	GetSyntheticLockup(ctx sdk.Context, lockID uint64, suffix string) (*lockuptypes.SyntheticLock, error)
	GetLocksPastTimeDenom(ctx sdk.Context, denom string, timestamp time.Time) []lockuptypes.PeriodLock
	GetLocksLongerThanDurationDenom(ctx sdk.Context, denom string, duration time.Duration) []lockuptypes.PeriodLock
	GetPeriodLocksAccumulation(ctx sdk.Context, query lockuptypes.QueryCondition) sdk.Int
	GetAccountPeriodLocks(ctx sdk.Context, addr sdk.AccAddress) []lockuptypes.PeriodLock
	GetLockByID(ctx sdk.Context, lockID uint64) (*lockuptypes.PeriodLock, error)
}

type EpochKeeper interface {
	GetEpochInfo(ctx sdk.Context, identifier string) epochstypes.EpochInfo
}

type AccountKeeper interface {
	GetModuleAddress(moduleName string) sdk.AccAddress
	GetAccount(ctx sdk.Context, addr sdk.AccAddress) types.AccountI
}
