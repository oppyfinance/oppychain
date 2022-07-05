package cli_test

import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"

	"gitlab.com/oppy-finance/oppychain/testutil/network"
	"gitlab.com/oppy-finance/oppychain/x/invoice/client/cli"
)

func TestCreateInvoice(t *testing.T) {
	setupBech32Prefix()
	cfg := network.DefaultConfig()
	cfg.MinGasPrices = "0poppy"
	net := network.New(t, cfg)
	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyz", "oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7", "100000", "10", "xyz"}
	for _, tc := range []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "valid",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				//fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := fields
			args = append(args, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}

func TestCreateInvoiceInvalid(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyzaaaa", "oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7", "1000", "10", "xyz"}
	for _, tc := range []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "valid",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			args := fields
			args = append(args, tc.args...)
			_, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
		})
	}
}

func TestDeleteInvoice(t *testing.T) {
	setupBech32Prefix()
	cfg := network.DefaultConfig()
	cfg.MinGasPrices = "0poppy"
	net := network.New(t, cfg)

	val := net.Validators[0]
	ctx := val.ClientCtx

	fields := []string{"xyz", "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd", "100000", "10", "xyz"}
	common := []string{
		fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
		fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
		fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
	}
	args := fields
	args = append(args, common...)
	ret, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
	require.NoError(t, err)
	var resp sdk.TxResponse
	require.NoError(t, ctx.Codec.UnmarshalJSON(ret.Bytes(), &resp))

	deleteArgsUser := []string{"xyz", "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd"}
	deleteArgs := append(deleteArgsUser, common...)
	for _, tc := range []struct {
		name string
		args []string
		code uint32
		err  error
	}{
		{
			name: "success delete",
		},
		{
			name: "key not found",
			args: common,
			code: sdkerrors.ErrKeyNotFound.ABCICode(),
		},
	} {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			args = deleteArgs
			if tc.name == "key not found" {
				args[0] = "not found"
			}
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdDeleteInvoice(), args)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				fmt.Printf(">>>>>>>>>>>%v\n", out.String())
				require.NoError(t, err)
				var resp sdk.TxResponse
				require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
				require.Equal(t, tc.code, resp.Code)
			}
		})
	}
}
