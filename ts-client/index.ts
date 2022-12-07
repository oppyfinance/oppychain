// Generated by Ignite ignite.com/cli
import { Registry } from '@cosmjs/proto-signing'
import { IgniteClient } from "./client";
import { MissingWalletError } from "./helpers";
import { Module as CosmosAuthV1Beta1, msgTypes as CosmosAuthV1Beta1MsgTypes } from './cosmos.auth.v1beta1'
import { Module as CosmosBankV1Beta1, msgTypes as CosmosBankV1Beta1MsgTypes } from './cosmos.bank.v1beta1'
import { Module as CosmosBaseTendermintV1Beta1, msgTypes as CosmosBaseTendermintV1Beta1MsgTypes } from './cosmos.base.tendermint.v1beta1'
import { Module as CosmosCrisisV1Beta1, msgTypes as CosmosCrisisV1Beta1MsgTypes } from './cosmos.crisis.v1beta1'
import { Module as CosmosDistributionV1Beta1, msgTypes as CosmosDistributionV1Beta1MsgTypes } from './cosmos.distribution.v1beta1'
import { Module as CosmosEvidenceV1Beta1, msgTypes as CosmosEvidenceV1Beta1MsgTypes } from './cosmos.evidence.v1beta1'
import { Module as CosmosFeegrantV1Beta1, msgTypes as CosmosFeegrantV1Beta1MsgTypes } from './cosmos.feegrant.v1beta1'
import { Module as CosmosGovV1Beta1, msgTypes as CosmosGovV1Beta1MsgTypes } from './cosmos.gov.v1beta1'
import { Module as CosmosParamsV1Beta1, msgTypes as CosmosParamsV1Beta1MsgTypes } from './cosmos.params.v1beta1'
import { Module as CosmosSlashingV1Beta1, msgTypes as CosmosSlashingV1Beta1MsgTypes } from './cosmos.slashing.v1beta1'
import { Module as CosmosStakingV1Beta1, msgTypes as CosmosStakingV1Beta1MsgTypes } from './cosmos.staking.v1beta1'
import { Module as CosmosTxV1Beta1, msgTypes as CosmosTxV1Beta1MsgTypes } from './cosmos.tx.v1beta1'
import { Module as CosmosUpgradeV1Beta1, msgTypes as CosmosUpgradeV1Beta1MsgTypes } from './cosmos.upgrade.v1beta1'
import { Module as CosmosVestingV1Beta1, msgTypes as CosmosVestingV1Beta1MsgTypes } from './cosmos.vesting.v1beta1'
import { Module as IbcApplicationsTransferV1, msgTypes as IbcApplicationsTransferV1MsgTypes } from './ibc.applications.transfer.v1'
import { Module as IbcCoreChannelV1, msgTypes as IbcCoreChannelV1MsgTypes } from './ibc.core.channel.v1'
import { Module as IbcCoreClientV1, msgTypes as IbcCoreClientV1MsgTypes } from './ibc.core.client.v1'
import { Module as IbcCoreConnectionV1, msgTypes as IbcCoreConnectionV1MsgTypes } from './ibc.core.connection.v1'
import { Module as IbcCorePortV1, msgTypes as IbcCorePortV1MsgTypes } from './ibc.core.port.v1'
import { Module as OppyfinanceOppychainEpochs, msgTypes as OppyfinanceOppychainEpochsMsgTypes } from './oppyfinance.oppychain.epochs'
import { Module as OppyfinanceOppychainIncentives, msgTypes as OppyfinanceOppychainIncentivesMsgTypes } from './oppyfinance.oppychain.incentives'
import { Module as OppyfinanceOppychainLockup, msgTypes as OppyfinanceOppychainLockupMsgTypes } from './oppyfinance.oppychain.lockup'
import { Module as OppyfinanceOppychainMintV1Beta1, msgTypes as OppyfinanceOppychainMintV1Beta1MsgTypes } from './oppyfinance.oppychain.mint.v1beta1'
import { Module as OppyfinanceOppychainPoolincentivesV1Beta1, msgTypes as OppyfinanceOppychainPoolincentivesV1Beta1MsgTypes } from './oppyfinance.oppychain.poolincentives.v1beta1'
import { Module as OppyfinanceOppychainSwapBalancerV1Beta1, msgTypes as OppyfinanceOppychainSwapBalancerV1Beta1MsgTypes } from './oppyfinance.oppychain.swap.balancer.v1beta1'
import { Module as OppyfinanceOppychainSwapStableswapV1Beta1, msgTypes as OppyfinanceOppychainSwapStableswapV1Beta1MsgTypes } from './oppyfinance.oppychain.swap.stableswap.v1beta1'
import { Module as OppyfinanceOppychainSwapV1Beta1, msgTypes as OppyfinanceOppychainSwapV1Beta1MsgTypes } from './oppyfinance.oppychain.swap.v1beta1'
import { Module as OppyfinanceOppychainVault, msgTypes as OppyfinanceOppychainVaultMsgTypes } from './oppyfinance.oppychain.vault'
import { Module as TendermintSpnMonitoringp, msgTypes as TendermintSpnMonitoringpMsgTypes } from './tendermint.spn.monitoringp'


const Client = IgniteClient.plugin([
    CosmosAuthV1Beta1, CosmosBankV1Beta1, CosmosBaseTendermintV1Beta1, CosmosCrisisV1Beta1, CosmosDistributionV1Beta1, CosmosEvidenceV1Beta1, CosmosFeegrantV1Beta1, CosmosGovV1Beta1, CosmosParamsV1Beta1, CosmosSlashingV1Beta1, CosmosStakingV1Beta1, CosmosTxV1Beta1, CosmosUpgradeV1Beta1, CosmosVestingV1Beta1, IbcApplicationsTransferV1, IbcCoreChannelV1, IbcCoreClientV1, IbcCoreConnectionV1, IbcCorePortV1, OppyfinanceOppychainEpochs, OppyfinanceOppychainIncentives, OppyfinanceOppychainLockup, OppyfinanceOppychainMintV1Beta1, OppyfinanceOppychainPoolincentivesV1Beta1, OppyfinanceOppychainSwapBalancerV1Beta1, OppyfinanceOppychainSwapStableswapV1Beta1, OppyfinanceOppychainSwapV1Beta1, OppyfinanceOppychainVault, TendermintSpnMonitoringp
]);

const registry = new Registry([
  ...CosmosAuthV1Beta1MsgTypes,
  ...CosmosBankV1Beta1MsgTypes,
  ...CosmosBaseTendermintV1Beta1MsgTypes,
  ...CosmosCrisisV1Beta1MsgTypes,
  ...CosmosDistributionV1Beta1MsgTypes,
  ...CosmosEvidenceV1Beta1MsgTypes,
  ...CosmosFeegrantV1Beta1MsgTypes,
  ...CosmosGovV1Beta1MsgTypes,
  ...CosmosParamsV1Beta1MsgTypes,
  ...CosmosSlashingV1Beta1MsgTypes,
  ...CosmosStakingV1Beta1MsgTypes,
  ...CosmosTxV1Beta1MsgTypes,
  ...CosmosUpgradeV1Beta1MsgTypes,
  ...CosmosVestingV1Beta1MsgTypes,
  ...IbcApplicationsTransferV1MsgTypes,
  ...IbcCoreChannelV1MsgTypes,
  ...IbcCoreClientV1MsgTypes,
  ...IbcCoreConnectionV1MsgTypes,
  ...IbcCorePortV1MsgTypes,
  ...OppyfinanceOppychainEpochsMsgTypes,
  ...OppyfinanceOppychainIncentivesMsgTypes,
  ...OppyfinanceOppychainLockupMsgTypes,
  ...OppyfinanceOppychainMintV1Beta1MsgTypes,
  ...OppyfinanceOppychainPoolincentivesV1Beta1MsgTypes,
  ...OppyfinanceOppychainSwapBalancerV1Beta1MsgTypes,
  ...OppyfinanceOppychainSwapStableswapV1Beta1MsgTypes,
  ...OppyfinanceOppychainSwapV1Beta1MsgTypes,
  ...OppyfinanceOppychainVaultMsgTypes,
  ...TendermintSpnMonitoringpMsgTypes,
  
])

export {
    Client,
    registry,
    MissingWalletError
}
