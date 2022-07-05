package client

import (
	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/client/cli"
	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/client/rest"

	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
)

var UpdatePoolIncentivesHandler = govclient.NewProposalHandler(cli.NewCmdSubmitUpdatePoolIncentivesProposal, rest.ProposalUpdatePoolIncentivesRESTHandler)
