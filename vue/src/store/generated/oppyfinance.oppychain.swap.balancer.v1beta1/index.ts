import { Client, registry, MissingWalletError } from 'oppy-finance-oppychain-client-ts'

import { SmoothWeightChangeParams } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.balancer.v1beta1/types"
import { PoolParams } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.balancer.v1beta1/types"
import { PoolAsset } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.balancer.v1beta1/types"
import { Pool } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.balancer.v1beta1/types"


export { SmoothWeightChangeParams, PoolParams, PoolAsset, Pool };

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
						SmoothWeightChangeParams: getStructure(SmoothWeightChangeParams.fromPartial({})),
						PoolParams: getStructure(PoolParams.fromPartial({})),
						PoolAsset: getStructure(PoolAsset.fromPartial({})),
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
			console.log('Vuex module: oppyfinance.oppychain.swap.balancer.v1beta1 initialized!')
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
		
		async sendMsgCreateBalancerPool({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapBalancerV1Beta1.tx.sendMsgCreateBalancerPool({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateBalancerPool:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateBalancerPool:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateBalancerPool({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapBalancerV1Beta1.tx.msgCreateBalancerPool({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateBalancerPool:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateBalancerPool:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
