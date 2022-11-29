import { Client, registry, MissingWalletError } from 'oppy-finance-oppychain-client-ts'

import { PoolParams } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.stableswap.v1beta1/types"
import { Pool } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.stableswap.v1beta1/types"


export { PoolParams, Pool };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				
				_Structure: {
						PoolParams: getStructure(PoolParams.fromPartial({})),
						Pool: getStructure(Pool.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: oppyfinance.oppychain.swap.stableswap.v1beta1 initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		async sendMsgCreateStableswapPool({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapStableswapV1Beta1.tx.sendMsgCreateStableswapPool({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateStableswapPool:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateStableswapPool:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgStableSwapAdjustScalingFactors({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapStableswapV1Beta1.tx.sendMsgStableSwapAdjustScalingFactors({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgStableSwapAdjustScalingFactors:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgStableSwapAdjustScalingFactors:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateStableswapPool({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapStableswapV1Beta1.tx.msgCreateStableswapPool({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateStableswapPool:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateStableswapPool:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgStableSwapAdjustScalingFactors({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapStableswapV1Beta1.tx.msgStableSwapAdjustScalingFactors({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgStableSwapAdjustScalingFactors:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgStableSwapAdjustScalingFactors:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
