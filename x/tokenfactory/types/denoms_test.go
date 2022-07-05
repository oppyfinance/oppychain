package types_test

import (
	"gitlab.com/oppy-finance/oppychain/utils"
	"testing"

	"github.com/stretchr/testify/require"

	"gitlab.com/oppy-finance/oppychain/x/tokenfactory/types"
)

func TestDecomposeDenoms(t *testing.T) {
	utils.SetAddressPrefixes()
	for _, tc := range []struct {
		desc  string
		denom string
		valid bool
	}{
		{
			desc:  "empty is invalid",
			denom: "",
			valid: false,
		},
		{
			desc:  "normal",
			denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
			valid: true,
		},
		{
			desc:  "multiple slashes in subdenom",
			denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin/1",
			valid: true,
		},
		{
			desc:  "no subdenom",
			denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/",
			valid: true,
		},
		{
			desc:  "incorrect prefix",
			denom: "ibc/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
			valid: false,
		},
		{
			desc:  "subdenom of only slashes",
			denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/////",
			valid: true,
		},
		{
			desc:  "too long name",
			denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/adsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsfadsf",
			valid: false,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			_, _, err := types.DeconstructDenom(tc.denom)
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
