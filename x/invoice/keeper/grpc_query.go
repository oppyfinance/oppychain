package keeper

import (
	"gitlab.com/oppy-finance/oppychain/x/invoice/types"
)

var _ types.QueryServer = Keeper{}
