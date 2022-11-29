import { Client, registry, MissingWalletError } from 'oppy-finance-oppychain-client-ts'

import { Params } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.v1beta1/types"
import { SwapAmountInRoute } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.v1beta1/types"
import { SwapAmountOutRoute } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.swap.v1beta1/types"


export { Params, SwapAmountInRoute, SwapAmountOutRoute };

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
				Pools: {},
				NumPools: {},
				TotalLiquidity: {},
				Pool: {},
				PoolParams: {},
				TotalPoolLiquidity: {},
				TotalShares: {},
				SpotPrice: {},
				EstimateSwapExactAmountIn: {},
				EstimateSwapExactAmountOut: {},
				
				_Structure: {
						Params: getStructure(Params.fromPartial({})),
						SwapAmountInRoute: getStructure(SwapAmountInRoute.fromPartial({})),
						SwapAmountOutRoute: getStructure(SwapAmountOutRoute.fromPartial({})),
						
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
				getPools: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Pools[JSON.stringify(params)] ?? {}
		},
				getNumPools: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.NumPools[JSON.stringify(params)] ?? {}
		},
				getTotalLiquidity: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalLiquidity[JSON.stringify(params)] ?? {}
		},
				getPool: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Pool[JSON.stringify(params)] ?? {}
		},
				getPoolParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.PoolParams[JSON.stringify(params)] ?? {}
		},
				getTotalPoolLiquidity: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalPoolLiquidity[JSON.stringify(params)] ?? {}
		},
				getTotalShares: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.TotalShares[JSON.stringify(params)] ?? {}
		},
				getSpotPrice: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.SpotPrice[JSON.stringify(params)] ?? {}
		},
				getEstimateSwapExactAmountIn: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.EstimateSwapExactAmountIn[JSON.stringify(params)] ?? {}
		},
				getEstimateSwapExactAmountOut: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.EstimateSwapExactAmountOut[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: oppyfinance.oppychain.swap.v1beta1 initialized!')
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
		
		
		
		 		
		
		
		async QueryPools({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryPools(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainSwapV1Beta1.query.queryPools({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'Pools', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPools', payload: { options: { all }, params: {...key},query }})
				return getters['getPools']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPools API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryNumPools({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryNumPools()).data
				
					
				commit('QUERY', { query: 'NumPools', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryNumPools', payload: { options: { all }, params: {...key},query }})
				return getters['getNumPools']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryNumPools API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalLiquidity({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryTotalLiquidity()).data
				
					
				commit('QUERY', { query: 'TotalLiquidity', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalLiquidity', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalLiquidity']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalLiquidity API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPool({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryPool( key.poolId)).data
				
					
				commit('QUERY', { query: 'Pool', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPool', payload: { options: { all }, params: {...key},query }})
				return getters['getPool']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPool API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryPoolParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryPoolParams( key.poolId)).data
				
					
				commit('QUERY', { query: 'PoolParams', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryPoolParams', payload: { options: { all }, params: {...key},query }})
				return getters['getPoolParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryPoolParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalPoolLiquidity({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryTotalPoolLiquidity( key.poolId)).data
				
					
				commit('QUERY', { query: 'TotalPoolLiquidity', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalPoolLiquidity', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalPoolLiquidity']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalPoolLiquidity API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryTotalShares({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryTotalShares( key.poolId)).data
				
					
				commit('QUERY', { query: 'TotalShares', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryTotalShares', payload: { options: { all }, params: {...key},query }})
				return getters['getTotalShares']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryTotalShares API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QuerySpotPrice({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.querySpotPrice( key.poolId, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainSwapV1Beta1.query.querySpotPrice( key.poolId, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'SpotPrice', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QuerySpotPrice', payload: { options: { all }, params: {...key},query }})
				return getters['getSpotPrice']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QuerySpotPrice API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryEstimateSwapExactAmountIn({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryEstimateSwapExactAmountIn( key.poolId, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainSwapV1Beta1.query.queryEstimateSwapExactAmountIn( key.poolId, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'EstimateSwapExactAmountIn', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryEstimateSwapExactAmountIn', payload: { options: { all }, params: {...key},query }})
				return getters['getEstimateSwapExactAmountIn']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryEstimateSwapExactAmountIn API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryEstimateSwapExactAmountOut({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainSwapV1Beta1.query.queryEstimateSwapExactAmountOut( key.poolId, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainSwapV1Beta1.query.queryEstimateSwapExactAmountOut( key.poolId, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'EstimateSwapExactAmountOut', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryEstimateSwapExactAmountOut', payload: { options: { all }, params: {...key},query }})
				return getters['getEstimateSwapExactAmountOut']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryEstimateSwapExactAmountOut API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgSwapExactAmountOut({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgSwapExactAmountOut({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSwapExactAmountOut:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSwapExactAmountOut:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgJoinPool({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgJoinPool({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinPool:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgJoinPool:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgExitPool({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgExitPool({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitPool:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgExitPool:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgJoinSwapExternAmountIn({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgJoinSwapExternAmountIn({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinSwapExternAmountIn:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgJoinSwapExternAmountIn:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgJoinSwapShareAmountOut({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgJoinSwapShareAmountOut({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinSwapShareAmountOut:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgJoinSwapShareAmountOut:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgExitSwapShareAmountIn({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgExitSwapShareAmountIn({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitSwapShareAmountIn:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgExitSwapShareAmountIn:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgSwapExactAmountIn({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgSwapExactAmountIn({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSwapExactAmountIn:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgSwapExactAmountIn:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgExitSwapExternAmountOut({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainSwapV1Beta1.tx.sendMsgExitSwapExternAmountOut({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitSwapExternAmountOut:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgExitSwapExternAmountOut:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgSwapExactAmountOut({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgSwapExactAmountOut({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSwapExactAmountOut:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSwapExactAmountOut:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgJoinPool({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgJoinPool({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinPool:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgJoinPool:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgExitPool({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgExitPool({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitPool:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgExitPool:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgJoinSwapExternAmountIn({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgJoinSwapExternAmountIn({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinSwapExternAmountIn:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgJoinSwapExternAmountIn:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgJoinSwapShareAmountOut({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgJoinSwapShareAmountOut({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgJoinSwapShareAmountOut:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgJoinSwapShareAmountOut:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgExitSwapShareAmountIn({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgExitSwapShareAmountIn({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitSwapShareAmountIn:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgExitSwapShareAmountIn:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgSwapExactAmountIn({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgSwapExactAmountIn({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgSwapExactAmountIn:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgSwapExactAmountIn:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgExitSwapExternAmountOut({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainSwapV1Beta1.tx.msgExitSwapExternAmountOut({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgExitSwapExternAmountOut:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgExitSwapExternAmountOut:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
