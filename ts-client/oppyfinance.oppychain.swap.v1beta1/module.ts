// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgExitSwapShareAmountIn } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountIn } from "./types/swap/v1beta1/tx";
import { MsgJoinSwapShareAmountOut } from "./types/swap/v1beta1/tx";
import { MsgExitSwapExternAmountOut } from "./types/swap/v1beta1/tx";
import { MsgJoinPool } from "./types/swap/v1beta1/tx";
import { MsgExitPool } from "./types/swap/v1beta1/tx";
import { MsgSwapExactAmountOut } from "./types/swap/v1beta1/tx";
import { MsgJoinSwapExternAmountIn } from "./types/swap/v1beta1/tx";


export { MsgExitSwapShareAmountIn, MsgSwapExactAmountIn, MsgJoinSwapShareAmountOut, MsgExitSwapExternAmountOut, MsgJoinPool, MsgExitPool, MsgSwapExactAmountOut, MsgJoinSwapExternAmountIn };

type sendMsgExitSwapShareAmountInParams = {
  value: MsgExitSwapShareAmountIn,
  fee?: StdFee,
  memo?: string
};

type sendMsgSwapExactAmountInParams = {
  value: MsgSwapExactAmountIn,
  fee?: StdFee,
  memo?: string
};

type sendMsgJoinSwapShareAmountOutParams = {
  value: MsgJoinSwapShareAmountOut,
  fee?: StdFee,
  memo?: string
};

type sendMsgExitSwapExternAmountOutParams = {
  value: MsgExitSwapExternAmountOut,
  fee?: StdFee,
  memo?: string
};

type sendMsgJoinPoolParams = {
  value: MsgJoinPool,
  fee?: StdFee,
  memo?: string
};

type sendMsgExitPoolParams = {
  value: MsgExitPool,
  fee?: StdFee,
  memo?: string
};

type sendMsgSwapExactAmountOutParams = {
  value: MsgSwapExactAmountOut,
  fee?: StdFee,
  memo?: string
};

type sendMsgJoinSwapExternAmountInParams = {
  value: MsgJoinSwapExternAmountIn,
  fee?: StdFee,
  memo?: string
};


type msgExitSwapShareAmountInParams = {
  value: MsgExitSwapShareAmountIn,
};

type msgSwapExactAmountInParams = {
  value: MsgSwapExactAmountIn,
};

type msgJoinSwapShareAmountOutParams = {
  value: MsgJoinSwapShareAmountOut,
};

type msgExitSwapExternAmountOutParams = {
  value: MsgExitSwapExternAmountOut,
};

type msgJoinPoolParams = {
  value: MsgJoinPool,
};

type msgExitPoolParams = {
  value: MsgExitPool,
};

type msgSwapExactAmountOutParams = {
  value: MsgSwapExactAmountOut,
};

type msgJoinSwapExternAmountInParams = {
  value: MsgJoinSwapExternAmountIn,
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
		
		async sendMsgExitSwapShareAmountIn({ value, fee, memo }: sendMsgExitSwapShareAmountInParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExitSwapShareAmountIn: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExitSwapShareAmountIn({ value: MsgExitSwapShareAmountIn.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExitSwapShareAmountIn: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSwapExactAmountIn({ value, fee, memo }: sendMsgSwapExactAmountInParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSwapExactAmountIn: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSwapExactAmountIn({ value: MsgSwapExactAmountIn.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSwapExactAmountIn: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgJoinSwapShareAmountOut({ value, fee, memo }: sendMsgJoinSwapShareAmountOutParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgJoinSwapShareAmountOut: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgJoinSwapShareAmountOut({ value: MsgJoinSwapShareAmountOut.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgJoinSwapShareAmountOut: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgExitSwapExternAmountOut({ value, fee, memo }: sendMsgExitSwapExternAmountOutParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExitSwapExternAmountOut: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExitSwapExternAmountOut({ value: MsgExitSwapExternAmountOut.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExitSwapExternAmountOut: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgJoinPool({ value, fee, memo }: sendMsgJoinPoolParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgJoinPool: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgJoinPool({ value: MsgJoinPool.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgJoinPool: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgExitPool({ value, fee, memo }: sendMsgExitPoolParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgExitPool: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgExitPool({ value: MsgExitPool.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgExitPool: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgSwapExactAmountOut({ value, fee, memo }: sendMsgSwapExactAmountOutParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgSwapExactAmountOut: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgSwapExactAmountOut({ value: MsgSwapExactAmountOut.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgSwapExactAmountOut: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgJoinSwapExternAmountIn({ value, fee, memo }: sendMsgJoinSwapExternAmountInParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgJoinSwapExternAmountIn: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgJoinSwapExternAmountIn({ value: MsgJoinSwapExternAmountIn.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgJoinSwapExternAmountIn: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgExitSwapShareAmountIn({ value }: msgExitSwapShareAmountInParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapShareAmountIn", value: MsgExitSwapShareAmountIn.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExitSwapShareAmountIn: Could not create message: ' + e.message)
			}
		},
		
		msgSwapExactAmountIn({ value }: msgSwapExactAmountInParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountIn", value: MsgSwapExactAmountIn.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSwapExactAmountIn: Could not create message: ' + e.message)
			}
		},
		
		msgJoinSwapShareAmountOut({ value }: msgJoinSwapShareAmountOutParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapShareAmountOut", value: MsgJoinSwapShareAmountOut.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgJoinSwapShareAmountOut: Could not create message: ' + e.message)
			}
		},
		
		msgExitSwapExternAmountOut({ value }: msgExitSwapExternAmountOutParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitSwapExternAmountOut", value: MsgExitSwapExternAmountOut.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExitSwapExternAmountOut: Could not create message: ' + e.message)
			}
		},
		
		msgJoinPool({ value }: msgJoinPoolParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinPool", value: MsgJoinPool.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgJoinPool: Could not create message: ' + e.message)
			}
		},
		
		msgExitPool({ value }: msgExitPoolParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgExitPool", value: MsgExitPool.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgExitPool: Could not create message: ' + e.message)
			}
		},
		
		msgSwapExactAmountOut({ value }: msgSwapExactAmountOutParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgSwapExactAmountOut", value: MsgSwapExactAmountOut.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgSwapExactAmountOut: Could not create message: ' + e.message)
			}
		},
		
		msgJoinSwapExternAmountIn({ value }: msgJoinSwapExternAmountInParams): EncodeObject {
			try {
				return { typeUrl: "/oppyfinance.oppychain.swap.v1beta1.MsgJoinSwapExternAmountIn", value: MsgJoinSwapExternAmountIn.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgJoinSwapExternAmountIn: Could not create message: ' + e.message)
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
			OppyfinanceOppychainSwapV1Beta1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;