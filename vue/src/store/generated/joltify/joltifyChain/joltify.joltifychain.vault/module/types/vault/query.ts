/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { PoolProposal } from '../vault/create_pool'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'

export const protobufPackage = 'joltify.joltifychain.vault'

/** this line is used by starport scaffolding # 3 */
export interface QueryGetCreatePoolRequest {
  index: string
}

export interface QueryGetCreatePoolResponse {
  CreatePool: PoolProposal | undefined
}

export interface QueryLastPoolResponse {
  BlockHeight: string
  CreatePool: PoolProposal | undefined
}

export interface QueryAllCreatePoolRequest {
  pagination: PageRequest | undefined
}

export interface QueryLatestPoolRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllCreatePoolResponse {
  CreatePool: PoolProposal[]
  pagination: PageResponse | undefined
}

const baseQueryGetCreatePoolRequest: object = { index: '' }

export const QueryGetCreatePoolRequest = {
  encode(message: QueryGetCreatePoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.index !== '') {
      writer.uint32(10).string(message.index)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCreatePoolRequest {
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index)
    } else {
      message.index = ''
    }
    return message
  },

  toJSON(message: QueryGetCreatePoolRequest): unknown {
    const obj: any = {}
    message.index !== undefined && (obj.index = message.index)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCreatePoolRequest>): QueryGetCreatePoolRequest {
    const message = { ...baseQueryGetCreatePoolRequest } as QueryGetCreatePoolRequest
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index
    } else {
      message.index = ''
    }
    return message
  }
}

const baseQueryGetCreatePoolResponse: object = {}

export const QueryGetCreatePoolResponse = {
  encode(message: QueryGetCreatePoolResponse, writer: Writer = Writer.create()): Writer {
    if (message.CreatePool !== undefined) {
      PoolProposal.encode(message.CreatePool, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.CreatePool = PoolProposal.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCreatePoolResponse {
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromJSON(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  },

  toJSON(message: QueryGetCreatePoolResponse): unknown {
    const obj: any = {}
    message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCreatePoolResponse>): QueryGetCreatePoolResponse {
    const message = { ...baseQueryGetCreatePoolResponse } as QueryGetCreatePoolResponse
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromPartial(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  }
}

const baseQueryLastPoolResponse: object = { BlockHeight: '' }

export const QueryLastPoolResponse = {
  encode(message: QueryLastPoolResponse, writer: Writer = Writer.create()): Writer {
    if (message.BlockHeight !== '') {
      writer.uint32(10).string(message.BlockHeight)
    }
    if (message.CreatePool !== undefined) {
      PoolProposal.encode(message.CreatePool, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLastPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.BlockHeight = reader.string()
          break
        case 2:
          message.CreatePool = PoolProposal.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLastPoolResponse {
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
      message.BlockHeight = String(object.BlockHeight)
    } else {
      message.BlockHeight = ''
    }
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromJSON(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  },

  toJSON(message: QueryLastPoolResponse): unknown {
    const obj: any = {}
    message.BlockHeight !== undefined && (obj.BlockHeight = message.BlockHeight)
    message.CreatePool !== undefined && (obj.CreatePool = message.CreatePool ? PoolProposal.toJSON(message.CreatePool) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryLastPoolResponse>): QueryLastPoolResponse {
    const message = { ...baseQueryLastPoolResponse } as QueryLastPoolResponse
    if (object.BlockHeight !== undefined && object.BlockHeight !== null) {
      message.BlockHeight = object.BlockHeight
    } else {
      message.BlockHeight = ''
    }
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      message.CreatePool = PoolProposal.fromPartial(object.CreatePool)
    } else {
      message.CreatePool = undefined
    }
    return message
  }
}

const baseQueryAllCreatePoolRequest: object = {}

export const QueryAllCreatePoolRequest = {
  encode(message: QueryAllCreatePoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCreatePoolRequest {
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCreatePoolRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCreatePoolRequest>): QueryAllCreatePoolRequest {
    const message = { ...baseQueryAllCreatePoolRequest } as QueryAllCreatePoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryLatestPoolRequest: object = {}

export const QueryLatestPoolRequest = {
  encode(message: QueryLatestPoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLatestPoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLatestPoolRequest {
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryLatestPoolRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryLatestPoolRequest>): QueryLatestPoolRequest {
    const message = { ...baseQueryLatestPoolRequest } as QueryLatestPoolRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllCreatePoolResponse: object = {}

export const QueryAllCreatePoolResponse = {
  encode(message: QueryAllCreatePoolResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.CreatePool) {
      PoolProposal.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCreatePoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.CreatePool.push(PoolProposal.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCreatePoolResponse {
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      for (const e of object.CreatePool) {
        message.CreatePool.push(PoolProposal.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCreatePoolResponse): unknown {
    const obj: any = {}
    if (message.CreatePool) {
      obj.CreatePool = message.CreatePool.map((e) => (e ? PoolProposal.toJSON(e) : undefined))
    } else {
      obj.CreatePool = []
    }
    message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCreatePoolResponse>): QueryAllCreatePoolResponse {
    const message = { ...baseQueryAllCreatePoolResponse } as QueryAllCreatePoolResponse
    message.CreatePool = []
    if (object.CreatePool !== undefined && object.CreatePool !== null) {
      for (const e of object.CreatePool) {
        message.CreatePool.push(PoolProposal.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a createPool by index. */
  CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse>
  /** Queries a list of createPool items. */
  CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse>
  /** Queries a createPool by index. */
  GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  CreatePool(request: QueryGetCreatePoolRequest): Promise<QueryGetCreatePoolResponse> {
    const data = QueryGetCreatePoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePool', data)
    return promise.then((data) => QueryGetCreatePoolResponse.decode(new Reader(data)))
  }

  CreatePoolAll(request: QueryAllCreatePoolRequest): Promise<QueryAllCreatePoolResponse> {
    const data = QueryAllCreatePoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'CreatePoolAll', data)
    return promise.then((data) => QueryAllCreatePoolResponse.decode(new Reader(data)))
  }

  GetLastPool(request: QueryLatestPoolRequest): Promise<QueryLastPoolResponse> {
    const data = QueryLatestPoolRequest.encode(request).finish()
    const promise = this.rpc.request('joltify.joltifychain.vault.Query', 'GetLastPool', data)
    return promise.then((data) => QueryLastPoolResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
