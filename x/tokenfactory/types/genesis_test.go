package types_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	"gitlab.com/oppy-finance/oppychain/x/tokenfactory/types"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7",
						},
					},
				},
			},
			valid: true,
		},
		{
			desc: "different admin from creator",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd",
						},
					},
				},
			},
			valid: true,
		},
		{
			desc: "empty admin",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "",
						},
					},
				},
			},
			valid: true,
		},
		{
			desc: "no admin",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
					},
				},
			},
			valid: true,
		},
		{
			desc: "invalid admin",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "moose",
						},
					},
				},
			},
			valid: false,
		},
		{
			desc: "multiple denoms",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "",
						},
					},
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/litecoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "",
						},
					},
				},
			},
			valid: true,
		},
		{
			desc: "duplicate denoms",
			genState: &types.GenesisState{
				FactoryDenoms: []types.GenesisDenom{
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "",
						},
					},
					{
						Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
						AuthorityMetadata: types.DenomAuthorityMetadata{
							Admin: "",
						},
					},
				},
			},
			valid: false,
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}
