import { Client, registry, MissingWalletError } from 'oppy-finance-oppychain-client-ts'

import { Gauge } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.incentives/types"
import { LockableDurationsInfo } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.incentives/types"
import { Params } from "oppy-finance-oppychain-client-ts/oppyfinance.oppychain.incentives/types"


export { Gauge, LockableDurationsInfo, Params };

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
				ModuleToDistributeCoins: {},
				ModuleDistributedCoins: {},
				GaugeByID: {},
				Gauges: {},
				ActiveGauges: {},
				ActiveGaugesPerDenom: {},
				UpcomingGauges: {},
				UpcomingGaugesPerDenom: {},
				RewardsEst: {},
				LockableDurations: {},
				
				_Structure: {
						Gauge: getStructure(Gauge.fromPartial({})),
						LockableDurationsInfo: getStructure(LockableDurationsInfo.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						
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
				getModuleToDistributeCoins: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ModuleToDistributeCoins[JSON.stringify(params)] ?? {}
		},
				getModuleDistributedCoins: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ModuleDistributedCoins[JSON.stringify(params)] ?? {}
		},
				getGaugeByID: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.GaugeByID[JSON.stringify(params)] ?? {}
		},
				getGauges: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Gauges[JSON.stringify(params)] ?? {}
		},
				getActiveGauges: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ActiveGauges[JSON.stringify(params)] ?? {}
		},
				getActiveGaugesPerDenom: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ActiveGaugesPerDenom[JSON.stringify(params)] ?? {}
		},
				getUpcomingGauges: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.UpcomingGauges[JSON.stringify(params)] ?? {}
		},
				getUpcomingGaugesPerDenom: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.UpcomingGaugesPerDenom[JSON.stringify(params)] ?? {}
		},
				getRewardsEst: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.RewardsEst[JSON.stringify(params)] ?? {}
		},
				getLockableDurations: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.LockableDurations[JSON.stringify(params)] ?? {}
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
			console.log('Vuex module: oppyfinance.oppychain.incentives initialized!')
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
		
		
		
		 		
		
		
		async QueryModuleToDistributeCoins({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryModuleToDistributeCoins()).data
				
					
				commit('QUERY', { query: 'ModuleToDistributeCoins', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryModuleToDistributeCoins', payload: { options: { all }, params: {...key},query }})
				return getters['getModuleToDistributeCoins']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryModuleToDistributeCoins API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryModuleDistributedCoins({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryModuleDistributedCoins()).data
				
					
				commit('QUERY', { query: 'ModuleDistributedCoins', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryModuleDistributedCoins', payload: { options: { all }, params: {...key},query }})
				return getters['getModuleDistributedCoins']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryModuleDistributedCoins API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryGaugeByID({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryGaugeById( key.id)).data
				
					
				commit('QUERY', { query: 'GaugeByID', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryGaugeByID', payload: { options: { all }, params: {...key},query }})
				return getters['getGaugeByID']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryGaugeByID API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryGauges({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryGauges(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryGauges({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'Gauges', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryGauges', payload: { options: { all }, params: {...key},query }})
				return getters['getGauges']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryGauges API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryActiveGauges({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryActiveGauges(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryActiveGauges({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ActiveGauges', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryActiveGauges', payload: { options: { all }, params: {...key},query }})
				return getters['getActiveGauges']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryActiveGauges API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryActiveGaugesPerDenom({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryActiveGaugesPerDenom(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryActiveGaugesPerDenom({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ActiveGaugesPerDenom', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryActiveGaugesPerDenom', payload: { options: { all }, params: {...key},query }})
				return getters['getActiveGaugesPerDenom']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryActiveGaugesPerDenom API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryUpcomingGauges({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryUpcomingGauges(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryUpcomingGauges({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'UpcomingGauges', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUpcomingGauges', payload: { options: { all }, params: {...key},query }})
				return getters['getUpcomingGauges']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryUpcomingGauges API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryUpcomingGaugesPerDenom({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryUpcomingGaugesPerDenom(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryUpcomingGaugesPerDenom({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'UpcomingGaugesPerDenom', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryUpcomingGaugesPerDenom', payload: { options: { all }, params: {...key},query }})
				return getters['getUpcomingGaugesPerDenom']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryUpcomingGaugesPerDenom API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryRewardsEst({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryRewardsEst( key.owner, query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.OppyfinanceOppychainIncentives.query.queryRewardsEst( key.owner, {...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'RewardsEst', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryRewardsEst', payload: { options: { all }, params: {...key},query }})
				return getters['getRewardsEst']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryRewardsEst API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryLockableDurations({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.OppyfinanceOppychainIncentives.query.queryLockableDurations()).data
				
					
				commit('QUERY', { query: 'LockableDurations', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryLockableDurations', payload: { options: { all }, params: {...key},query }})
				return getters['getLockableDurations']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryLockableDurations API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgCreateGauge({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainIncentives.tx.sendMsgCreateGauge({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateGauge:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateGauge:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgAddToGauge({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.OppyfinanceOppychainIncentives.tx.sendMsgAddToGauge({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddToGauge:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAddToGauge:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgCreateGauge({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainIncentives.tx.msgCreateGauge({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateGauge:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateGauge:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgAddToGauge({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.OppyfinanceOppychainIncentives.tx.msgAddToGauge({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAddToGauge:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAddToGauge:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
