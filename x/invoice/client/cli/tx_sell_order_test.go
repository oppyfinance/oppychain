package cli_test

import (
	"encoding/hex"
	"fmt"
	"github.com/cosmos/cosmos-sdk/testutil"
	"strings"
	"testing"

	"github.com/cosmos/cosmos-sdk/client/flags"
	clitestutil "github.com/cosmos/cosmos-sdk/testutil/cli"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gogo/protobuf/proto"
	"github.com/stretchr/testify/require"
	"gitlab.com/oppy-finance/oppychain/testutil/network"
	"gitlab.com/oppy-finance/oppychain/x/invoice/client/cli"
	"gitlab.com/oppy-finance/oppychain/x/invoice/tools"
	"gitlab.com/oppy-finance/oppychain/x/invoice/types"
)

func TestCreateSellOrderUnauthorized(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	createInvoiceFields := []string{"xyz", "jolt1rfmwldwrm3652shx3a7say0v4vvtglast0l05d", "100000", "10", "xyz"}

	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)

	createSellBookFields := []string{invoiceID, "100", "100", "3000"}

	tcs := []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "create invoice",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
		{
			desc: "create order",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
			code: 4,
		},
	}

	var out testutil.BufferWriter
	for _, tc := range tcs[1:] {
		tc2 := tc
		t.Run(tc2.desc, func(t *testing.T) {
			args := createInvoiceFields
			args = append(args, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
			var args2 []string
			args2 = append(args2, createSellBookFields...)
			args2 = append(args2, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
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

func TestCreateSellOrderNotEnoughMoney(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	createInvoiceFields := []string{"xyz", val.Address.String(), "100000", "10", "xyz"}

	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)

	createSellBookFields := []string{invoiceID, "100000000", "100", "3000"}

	tcs := []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "create invoice",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
		{
			desc: "create order",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
			code: 0x12,
		},
	}
	var out testutil.BufferWriter
	for _, tc := range tcs[1:] {
		tc2 := tc
		t.Run(tc2.desc, func(t *testing.T) {
			args := createInvoiceFields
			args = append(args, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
			var args2 []string
			args2 = append(args2, createSellBookFields...)
			args2 = append(args2, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
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

func TestCreateSellOrder(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	createInvoiceFields := []string{"xyz", val.Address.String(), "100000", "10", "xyz"}

	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)

	createSellBookFields := []string{invoiceID, "100", "100", "3000"}

	tcs := []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "create invoice",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
		{
			desc: "create order",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	}
	var out testutil.BufferWriter
	for _, tc := range tcs[1:] {
		tc2 := tc
		t.Run(tc2.desc, func(t *testing.T) {
			args := createInvoiceFields
			args = append(args, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
			var args2 []string
			args2 = append(args2, createSellBookFields...)
			args2 = append(args2, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
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

func TestDeleteSellOrder(t *testing.T) {
	setupBech32Prefix()
	net := network.New(t)
	val := net.Validators[0]
	ctx := val.ClientCtx

	createInvoiceFields := []string{"xyz", val.Address.String(), "100000", "10", "xyz"}

	invoiceIDByte, err := tools.GenHash([]string{val.Address.String(), createInvoiceFields[1], createInvoiceFields[0]})
	require.Nil(t, err)
	invoiceID := hex.EncodeToString(invoiceIDByte)

	createSellBookFields := []string{invoiceID, "100", "100", "3000"}

	tcs := []struct {
		desc string
		args []string
		err  error
		code uint32
	}{
		{
			desc: "create invoice",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
		{
			desc: "create order",
			args: []string{
				fmt.Sprintf("--%s=%s", flags.FlagFrom, val.Address.String()),
				fmt.Sprintf("--%s=true", flags.FlagSkipConfirmation),
				fmt.Sprintf("--%s=%s", flags.FlagBroadcastMode, flags.BroadcastBlock),
				fmt.Sprintf("--%s=%s", flags.FlagFees, sdk.NewCoins(sdk.NewCoin(net.Config.BondDenom, sdk.NewInt(10))).String()),
			},
		},
	}

	for _, tc := range tcs[1:] {
		tc2 := tc
		t.Run(tc2.desc, func(t *testing.T) {
			args := createInvoiceFields
			args = append(args, tc.args...)
			_, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateInvoice(), args)
			require.Nil(t, err)
			var args2 []string
			args2 = append(args2, createSellBookFields...)
			args2 = append(args2, tc.args...)
			out, err := clitestutil.ExecTestCLICmd(ctx, cli.CmdCreateSellOrder(), args2)
			require.Nil(t, err)
			var resp sdk.TxResponse
			require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &resp))
			outbb, _ := hex.DecodeString(resp.Data)
			var respOrder types.MsgCreateSellOrderResponse
			err = proto.Unmarshal(outbb, &respOrder)
			require.Nil(t, err)

			orderID := strings.Split(respOrder.OrderID, "@")[1]

			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdListSellOrder(), []string{})
			require.Nil(t, err)
			var listResp types.QueryAllSellOrderResponse
			require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &listResp))

			deleteArgs := []string{"invalid order"}
			deleteArgs = append(deleteArgs, tc.args...)
			// firstly, we delete the non-exist invoice
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdDeleteSellOrder(), deleteArgs)
			require.Nil(t, err)
			var v2 sdk.TxResponse
			require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &v2))
			require.Equal(t, uint32(0x16), v2.Code)

			// now, we can delete the sell order
			deleteArgs = []string{orderID}
			deleteArgs = append(deleteArgs, tc.args...)
			out, err = clitestutil.ExecTestCLICmd(ctx, cli.CmdDeleteSellOrder(), deleteArgs)
			require.Nil(t, err)
			require.NoError(t, ctx.Codec.UnmarshalJSON(out.Bytes(), &v2))
			require.Equal(t, uint32(0x0), v2.Code)
		})
	}
}
