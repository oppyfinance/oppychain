// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgCreateGauge } from "./types/incentives/tx";
import { MsgAddToGauge } from "./types/incentives/tx";


export { MsgCreateGauge, MsgAddToGauge };

type sendMsgCreateGaugeParams = {
  value: MsgCreateGauge,
  fee?: StdFee,
  memo?: string
};

type sendMsgAddToGaugeParams = {
  value: MsgAddToGauge,
  fee?: StdFee,
  memo?: string
};


type msgCreateGaugeParams = {
  value: MsgCreateGauge,
};

type msgAddToGaugeParams = {
  value: MsgAddToGauge,
};


export const registry = new Registry(msgTypes);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgCreateGauge({ value, fee, memo }: sendMsgCreateGaugeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateGauge: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateGauge({ value: MsgCreateGauge.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateGauge: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgAddToGauge({ value, fee, memo }: sendMsgAddToGaugeParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAddToGauge: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgAddToGauge({ value: MsgAddToGauge.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgAddToGauge: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgCreateGauge({ value }: msgCreateGaugeParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.incentives.MsgCreateGauge", value: MsgCreateGauge.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateGauge: Could not create message: ' + e.message)
			}
		},
		
		msgAddToGauge({ value }: msgAddToGaugeParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.incentives.MsgAddToGauge", value: MsgAddToGauge.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgAddToGauge: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	
	public registry: Array<[string, GeneratedType]>;

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });
		this.tx = txClient({ signer: client.signer, addr: client.env.rpcURL, prefix: client.env.prefix ?? "cosmos" });
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			OppyfinanceOppychainIncentives: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;