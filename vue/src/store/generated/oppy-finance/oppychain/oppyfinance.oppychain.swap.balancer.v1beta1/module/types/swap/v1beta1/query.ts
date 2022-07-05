/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Any } from "../../google/protobuf/any";
import {
  PageRequest,
  PageResponse,
} from "../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { SwapAmountInRoute, SwapAmountOutRoute } from "../../swap/v1beta1/tx";

export const protobufPackage = "oppyfinance.oppychain.swap.v1beta1";

/** =============================== Pool */
export interface QueryPoolRequest {
  poolId: number;
}

export interface QueryPoolResponse {
  pool: Any | undefined;
}

/** =============================== Pools */
export interface QueryPoolsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface QueryPoolsResponse {
  pools: Any[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** =============================== NumPools */
export interface QueryNumPoolsRequest {}

export interface QueryNumPoolsResponse {
  numPools: number;
}

/** =============================== PoolParams */
export interface QueryPoolParamsRequest {
  poolId: number;
}

export interface QueryPoolParamsResponse {
  params: Any | undefined;
}

/** =============================== PoolLiquidity */
export interface QueryTotalPoolLiquidityRequest {
  poolId: number;
}

export interface QueryTotalPoolLiquidityResponse {
  liquidity: Coin[];
}

/** =============================== TotalShares */
export interface QueryTotalSharesRequest {
  poolId: number;
}

export interface QueryTotalSharesResponse {
  totalShares: Coin | undefined;
}

/**
 * QuerySpotPriceRequest defines the gRPC request structure for a SpotPrice
 * query.
 */
export interface QuerySpotPriceRequest {
  poolId: number;
  base_asset_denom: string;
  quote_asset_denom: string;
}

/**
 * QuerySpotPriceResponse defines the gRPC response structure for a SpotPrice
 * query.
 */
export interface QuerySpotPriceResponse {
  /** String of the Dec. Ex) 10.203uatom */
  spotPrice: string;
}

/** =============================== EstimateSwapExactAmountIn */
export interface QuerySwapExactAmountInRequest {
  sender: string;
  poolId: number;
  tokenIn: string;
  routes: SwapAmountInRoute[];
}

export interface QuerySwapExactAmountInResponse {
  tokenOutAmount: string;
}

/** =============================== EstimateSwapExactAmountOut */
export interface QuerySwapExactAmountOutRequest {
  sender: string;
  poolId: number;
  routes: SwapAmountOutRoute[];
  tokenOut: string;
}

export interface QuerySwapExactAmountOutResponse {
  tokenInAmount: string;
}

export interface QueryTotalLiquidityRequest {}

export interface QueryTotalLiquidityResponse {
  liquidity: Coin[];
}

const baseQueryPoolRequest: object = { poolId: 0 };

export const QueryPoolRequest = {
  encode(message: QueryPoolRequest, writer: Writer = Writer.create()): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolRequest {
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    return message;
  },

  toJSON(message: QueryPoolRequest): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryPoolRequest>): QueryPoolRequest {
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    return message;
  },
};

const baseQueryPoolResponse: object = {};

export const QueryPoolResponse = {
  encode(message: QueryPoolResponse, writer: Writer = Writer.create()): Writer {
    if (message.pool !== undefined) {
      Any.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Any.fromJSON(object.pool);
    } else {
      message.pool = undefined;
    }
    return message;
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Any.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryPoolResponse>): QueryPoolResponse {
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    if (object.pool !== undefined && object.pool !== null) {
      message.pool = Any.fromPartial(object.pool);
    } else {
      message.pool = undefined;
    }
    return message;
  },
};

const baseQueryPoolsRequest: object = {};

export const QueryPoolsRequest = {
  encode(message: QueryPoolsRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolsRequest } as QueryPoolsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolsRequest {
    const message = { ...baseQueryPoolsRequest } as QueryPoolsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryPoolsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryPoolsRequest>): QueryPoolsRequest {
    const message = { ...baseQueryPoolsRequest } as QueryPoolsRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryPoolsResponse: object = {};

export const QueryPoolsResponse = {
  encode(
    message: QueryPoolsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolsResponse } as QueryPoolsResponse;
    message.pools = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(Any.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolsResponse {
    const message = { ...baseQueryPoolsResponse } as QueryPoolsResponse;
    message.pools = [];
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Any.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryPoolsResponse): unknown {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.pools = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryPoolsResponse>): QueryPoolsResponse {
    const message = { ...baseQueryPoolsResponse } as QueryPoolsResponse;
    message.pools = [];
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Any.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryNumPoolsRequest: object = {};

export const QueryNumPoolsRequest = {
  encode(_: QueryNumPoolsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNumPoolsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNumPoolsRequest } as QueryNumPoolsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryNumPoolsRequest {
    const message = { ...baseQueryNumPoolsRequest } as QueryNumPoolsRequest;
    return message;
  },

  toJSON(_: QueryNumPoolsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryNumPoolsRequest>): QueryNumPoolsRequest {
    const message = { ...baseQueryNumPoolsRequest } as QueryNumPoolsRequest;
    return message;
  },
};

const baseQueryNumPoolsResponse: object = { numPools: 0 };

export const QueryNumPoolsResponse = {
  encode(
    message: QueryNumPoolsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.numPools !== 0) {
      writer.uint32(8).uint64(message.numPools);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryNumPoolsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryNumPoolsResponse } as QueryNumPoolsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numPools = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryNumPoolsResponse {
    const message = { ...baseQueryNumPoolsResponse } as QueryNumPoolsResponse;
    if (object.numPools !== undefined && object.numPools !== null) {
      message.numPools = Number(object.numPools);
    } else {
      message.numPools = 0;
    }
    return message;
  },

  toJSON(message: QueryNumPoolsResponse): unknown {
    const obj: any = {};
    message.numPools !== undefined && (obj.numPools = message.numPools);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryNumPoolsResponse>
  ): QueryNumPoolsResponse {
    const message = { ...baseQueryNumPoolsResponse } as QueryNumPoolsResponse;
    if (object.numPools !== undefined && object.numPools !== null) {
      message.numPools = object.numPools;
    } else {
      message.numPools = 0;
    }
    return message;
  },
};

const baseQueryPoolParamsRequest: object = { poolId: 0 };

export const QueryPoolParamsRequest = {
  encode(
    message: QueryPoolParamsRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolParamsRequest } as QueryPoolParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolParamsRequest {
    const message = { ...baseQueryPoolParamsRequest } as QueryPoolParamsRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    return message;
  },

  toJSON(message: QueryPoolParamsRequest): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryPoolParamsRequest>
  ): QueryPoolParamsRequest {
    const message = { ...baseQueryPoolParamsRequest } as QueryPoolParamsRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    return message;
  },
};

const baseQueryPoolParamsResponse: object = {};

export const QueryPoolParamsResponse = {
  encode(
    message: QueryPoolParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Any.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryPoolParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryPoolParamsResponse,
    } as QueryPoolParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolParamsResponse {
    const message = {
      ...baseQueryPoolParamsResponse,
    } as QueryPoolParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Any.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryPoolParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Any.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryPoolParamsResponse>
  ): QueryPoolParamsResponse {
    const message = {
      ...baseQueryPoolParamsResponse,
    } as QueryPoolParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Any.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryTotalPoolLiquidityRequest: object = { poolId: 0 };

export const QueryTotalPoolLiquidityRequest = {
  encode(
    message: QueryTotalPoolLiquidityRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalPoolLiquidityRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalPoolLiquidityRequest,
    } as QueryTotalPoolLiquidityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalPoolLiquidityRequest {
    const message = {
      ...baseQueryTotalPoolLiquidityRequest,
    } as QueryTotalPoolLiquidityRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    return message;
  },

  toJSON(message: QueryTotalPoolLiquidityRequest): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalPoolLiquidityRequest>
  ): QueryTotalPoolLiquidityRequest {
    const message = {
      ...baseQueryTotalPoolLiquidityRequest,
    } as QueryTotalPoolLiquidityRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    return message;
  },
};

const baseQueryTotalPoolLiquidityResponse: object = {};

export const QueryTotalPoolLiquidityResponse = {
  encode(
    message: QueryTotalPoolLiquidityResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalPoolLiquidityResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalPoolLiquidityResponse,
    } as QueryTotalPoolLiquidityResponse;
    message.liquidity = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalPoolLiquidityResponse {
    const message = {
      ...baseQueryTotalPoolLiquidityResponse,
    } as QueryTotalPoolLiquidityResponse;
    message.liquidity = [];
    if (object.liquidity !== undefined && object.liquidity !== null) {
      for (const e of object.liquidity) {
        message.liquidity.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryTotalPoolLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity) {
      obj.liquidity = message.liquidity.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.liquidity = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalPoolLiquidityResponse>
  ): QueryTotalPoolLiquidityResponse {
    const message = {
      ...baseQueryTotalPoolLiquidityResponse,
    } as QueryTotalPoolLiquidityResponse;
    message.liquidity = [];
    if (object.liquidity !== undefined && object.liquidity !== null) {
      for (const e of object.liquidity) {
        message.liquidity.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQueryTotalSharesRequest: object = { poolId: 0 };

export const QueryTotalSharesRequest = {
  encode(
    message: QueryTotalSharesRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryTotalSharesRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalSharesRequest,
    } as QueryTotalSharesRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalSharesRequest {
    const message = {
      ...baseQueryTotalSharesRequest,
    } as QueryTotalSharesRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    return message;
  },

  toJSON(message: QueryTotalSharesRequest): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalSharesRequest>
  ): QueryTotalSharesRequest {
    const message = {
      ...baseQueryTotalSharesRequest,
    } as QueryTotalSharesRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    return message;
  },
};

const baseQueryTotalSharesResponse: object = {};

export const QueryTotalSharesResponse = {
  encode(
    message: QueryTotalSharesResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.totalShares !== undefined) {
      Coin.encode(message.totalShares, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalSharesResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalSharesResponse,
    } as QueryTotalSharesResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalShares = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalSharesResponse {
    const message = {
      ...baseQueryTotalSharesResponse,
    } as QueryTotalSharesResponse;
    if (object.totalShares !== undefined && object.totalShares !== null) {
      message.totalShares = Coin.fromJSON(object.totalShares);
    } else {
      message.totalShares = undefined;
    }
    return message;
  },

  toJSON(message: QueryTotalSharesResponse): unknown {
    const obj: any = {};
    message.totalShares !== undefined &&
      (obj.totalShares = message.totalShares
        ? Coin.toJSON(message.totalShares)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalSharesResponse>
  ): QueryTotalSharesResponse {
    const message = {
      ...baseQueryTotalSharesResponse,
    } as QueryTotalSharesResponse;
    if (object.totalShares !== undefined && object.totalShares !== null) {
      message.totalShares = Coin.fromPartial(object.totalShares);
    } else {
      message.totalShares = undefined;
    }
    return message;
  },
};

const baseQuerySpotPriceRequest: object = {
  poolId: 0,
  base_asset_denom: "",
  quote_asset_denom: "",
};

export const QuerySpotPriceRequest = {
  encode(
    message: QuerySpotPriceRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.base_asset_denom !== "") {
      writer.uint32(18).string(message.base_asset_denom);
    }
    if (message.quote_asset_denom !== "") {
      writer.uint32(26).string(message.quote_asset_denom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySpotPriceRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySpotPriceRequest } as QuerySpotPriceRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.base_asset_denom = reader.string();
          break;
        case 3:
          message.quote_asset_denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySpotPriceRequest {
    const message = { ...baseQuerySpotPriceRequest } as QuerySpotPriceRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (
      object.base_asset_denom !== undefined &&
      object.base_asset_denom !== null
    ) {
      message.base_asset_denom = String(object.base_asset_denom);
    } else {
      message.base_asset_denom = "";
    }
    if (
      object.quote_asset_denom !== undefined &&
      object.quote_asset_denom !== null
    ) {
      message.quote_asset_denom = String(object.quote_asset_denom);
    } else {
      message.quote_asset_denom = "";
    }
    return message;
  },

  toJSON(message: QuerySpotPriceRequest): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.base_asset_denom !== undefined &&
      (obj.base_asset_denom = message.base_asset_denom);
    message.quote_asset_denom !== undefined &&
      (obj.quote_asset_denom = message.quote_asset_denom);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySpotPriceRequest>
  ): QuerySpotPriceRequest {
    const message = { ...baseQuerySpotPriceRequest } as QuerySpotPriceRequest;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (
      object.base_asset_denom !== undefined &&
      object.base_asset_denom !== null
    ) {
      message.base_asset_denom = object.base_asset_denom;
    } else {
      message.base_asset_denom = "";
    }
    if (
      object.quote_asset_denom !== undefined &&
      object.quote_asset_denom !== null
    ) {
      message.quote_asset_denom = object.quote_asset_denom;
    } else {
      message.quote_asset_denom = "";
    }
    return message;
  },
};

const baseQuerySpotPriceResponse: object = { spotPrice: "" };

export const QuerySpotPriceResponse = {
  encode(
    message: QuerySpotPriceResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.spotPrice !== "") {
      writer.uint32(10).string(message.spotPrice);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QuerySpotPriceResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQuerySpotPriceResponse } as QuerySpotPriceResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spotPrice = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySpotPriceResponse {
    const message = { ...baseQuerySpotPriceResponse } as QuerySpotPriceResponse;
    if (object.spotPrice !== undefined && object.spotPrice !== null) {
      message.spotPrice = String(object.spotPrice);
    } else {
      message.spotPrice = "";
    }
    return message;
  },

  toJSON(message: QuerySpotPriceResponse): unknown {
    const obj: any = {};
    message.spotPrice !== undefined && (obj.spotPrice = message.spotPrice);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySpotPriceResponse>
  ): QuerySpotPriceResponse {
    const message = { ...baseQuerySpotPriceResponse } as QuerySpotPriceResponse;
    if (object.spotPrice !== undefined && object.spotPrice !== null) {
      message.spotPrice = object.spotPrice;
    } else {
      message.spotPrice = "";
    }
    return message;
  },
};

const baseQuerySwapExactAmountInRequest: object = {
  sender: "",
  poolId: 0,
  tokenIn: "",
};

export const QuerySwapExactAmountInRequest = {
  encode(
    message: QuerySwapExactAmountInRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QuerySwapExactAmountInRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQuerySwapExactAmountInRequest,
    } as QuerySwapExactAmountInRequest;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.routes.push(
            SwapAmountInRoute.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountInRequest {
    const message = {
      ...baseQuerySwapExactAmountInRequest,
    } as QuerySwapExactAmountInRequest;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.tokenIn !== undefined && object.tokenIn !== null) {
      message.tokenIn = String(object.tokenIn);
    } else {
      message.tokenIn = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountInRoute.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QuerySwapExactAmountInRequest): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenIn !== undefined && (obj.tokenIn = message.tokenIn);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? SwapAmountInRoute.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySwapExactAmountInRequest>
  ): QuerySwapExactAmountInRequest {
    const message = {
      ...baseQuerySwapExactAmountInRequest,
    } as QuerySwapExactAmountInRequest;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.tokenIn !== undefined && object.tokenIn !== null) {
      message.tokenIn = object.tokenIn;
    } else {
      message.tokenIn = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountInRoute.fromPartial(e));
      }
    }
    return message;
  },
};

const baseQuerySwapExactAmountInResponse: object = { tokenOutAmount: "" };

export const QuerySwapExactAmountInResponse = {
  encode(
    message: QuerySwapExactAmountInResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QuerySwapExactAmountInResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQuerySwapExactAmountInResponse,
    } as QuerySwapExactAmountInResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountInResponse {
    const message = {
      ...baseQuerySwapExactAmountInResponse,
    } as QuerySwapExactAmountInResponse;
    if (object.tokenOutAmount !== undefined && object.tokenOutAmount !== null) {
      message.tokenOutAmount = String(object.tokenOutAmount);
    } else {
      message.tokenOutAmount = "";
    }
    return message;
  },

  toJSON(message: QuerySwapExactAmountInResponse): unknown {
    const obj: any = {};
    message.tokenOutAmount !== undefined &&
      (obj.tokenOutAmount = message.tokenOutAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySwapExactAmountInResponse>
  ): QuerySwapExactAmountInResponse {
    const message = {
      ...baseQuerySwapExactAmountInResponse,
    } as QuerySwapExactAmountInResponse;
    if (object.tokenOutAmount !== undefined && object.tokenOutAmount !== null) {
      message.tokenOutAmount = object.tokenOutAmount;
    } else {
      message.tokenOutAmount = "";
    }
    return message;
  },
};

const baseQuerySwapExactAmountOutRequest: object = {
  sender: "",
  poolId: 0,
  tokenOut: "",
};

export const QuerySwapExactAmountOutRequest = {
  encode(
    message: QuerySwapExactAmountOutRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QuerySwapExactAmountOutRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQuerySwapExactAmountOutRequest,
    } as QuerySwapExactAmountOutRequest;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.routes.push(
            SwapAmountOutRoute.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountOutRequest {
    const message = {
      ...baseQuerySwapExactAmountOutRequest,
    } as QuerySwapExactAmountOutRequest;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountOutRoute.fromJSON(e));
      }
    }
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = String(object.tokenOut);
    } else {
      message.tokenOut = "";
    }
    return message;
  },

  toJSON(message: QuerySwapExactAmountOutRequest): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? SwapAmountOutRoute.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    message.tokenOut !== undefined && (obj.tokenOut = message.tokenOut);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySwapExactAmountOutRequest>
  ): QuerySwapExactAmountOutRequest {
    const message = {
      ...baseQuerySwapExactAmountOutRequest,
    } as QuerySwapExactAmountOutRequest;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountOutRoute.fromPartial(e));
      }
    }
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = object.tokenOut;
    } else {
      message.tokenOut = "";
    }
    return message;
  },
};

const baseQuerySwapExactAmountOutResponse: object = { tokenInAmount: "" };

export const QuerySwapExactAmountOutResponse = {
  encode(
    message: QuerySwapExactAmountOutResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QuerySwapExactAmountOutResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQuerySwapExactAmountOutResponse,
    } as QuerySwapExactAmountOutResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QuerySwapExactAmountOutResponse {
    const message = {
      ...baseQuerySwapExactAmountOutResponse,
    } as QuerySwapExactAmountOutResponse;
    if (object.tokenInAmount !== undefined && object.tokenInAmount !== null) {
      message.tokenInAmount = String(object.tokenInAmount);
    } else {
      message.tokenInAmount = "";
    }
    return message;
  },

  toJSON(message: QuerySwapExactAmountOutResponse): unknown {
    const obj: any = {};
    message.tokenInAmount !== undefined &&
      (obj.tokenInAmount = message.tokenInAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QuerySwapExactAmountOutResponse>
  ): QuerySwapExactAmountOutResponse {
    const message = {
      ...baseQuerySwapExactAmountOutResponse,
    } as QuerySwapExactAmountOutResponse;
    if (object.tokenInAmount !== undefined && object.tokenInAmount !== null) {
      message.tokenInAmount = object.tokenInAmount;
    } else {
      message.tokenInAmount = "";
    }
    return message;
  },
};

const baseQueryTotalLiquidityRequest: object = {};

export const QueryTotalLiquidityRequest = {
  encode(
    _: QueryTotalLiquidityRequest,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalLiquidityRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalLiquidityRequest,
    } as QueryTotalLiquidityRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryTotalLiquidityRequest {
    const message = {
      ...baseQueryTotalLiquidityRequest,
    } as QueryTotalLiquidityRequest;
    return message;
  },

  toJSON(_: QueryTotalLiquidityRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<QueryTotalLiquidityRequest>
  ): QueryTotalLiquidityRequest {
    const message = {
      ...baseQueryTotalLiquidityRequest,
    } as QueryTotalLiquidityRequest;
    return message;
  },
};

const baseQueryTotalLiquidityResponse: object = {};

export const QueryTotalLiquidityResponse = {
  encode(
    message: QueryTotalLiquidityResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.liquidity) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryTotalLiquidityResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryTotalLiquidityResponse,
    } as QueryTotalLiquidityResponse;
    message.liquidity = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liquidity.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTotalLiquidityResponse {
    const message = {
      ...baseQueryTotalLiquidityResponse,
    } as QueryTotalLiquidityResponse;
    message.liquidity = [];
    if (object.liquidity !== undefined && object.liquidity !== null) {
      for (const e of object.liquidity) {
        message.liquidity.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: QueryTotalLiquidityResponse): unknown {
    const obj: any = {};
    if (message.liquidity) {
      obj.liquidity = message.liquidity.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.liquidity = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryTotalLiquidityResponse>
  ): QueryTotalLiquidityResponse {
    const message = {
      ...baseQueryTotalLiquidityResponse,
    } as QueryTotalLiquidityResponse;
    message.liquidity = [];
    if (object.liquidity !== undefined && object.liquidity !== null) {
      for (const e of object.liquidity) {
        message.liquidity.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

export interface Query {
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  NumPools(request: QueryNumPoolsRequest): Promise<QueryNumPoolsResponse>;
  TotalLiquidity(
    request: QueryTotalLiquidityRequest
  ): Promise<QueryTotalLiquidityResponse>;
  /** Per Pool gRPC Endpoints */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  PoolParams(request: QueryPoolParamsRequest): Promise<QueryPoolParamsResponse>;
  TotalPoolLiquidity(
    request: QueryTotalPoolLiquidityRequest
  ): Promise<QueryTotalPoolLiquidityResponse>;
  TotalShares(
    request: QueryTotalSharesRequest
  ): Promise<QueryTotalSharesResponse>;
  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse>;
  /** Estimate the swap. */
  EstimateSwapExactAmountIn(
    request: QuerySwapExactAmountInRequest
  ): Promise<QuerySwapExactAmountInResponse>;
  EstimateSwapExactAmountOut(
    request: QuerySwapExactAmountOutRequest
  ): Promise<QuerySwapExactAmountOutResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "Pools",
      data
    );
    return promise.then((data) => QueryPoolsResponse.decode(new Reader(data)));
  }

  NumPools(request: QueryNumPoolsRequest): Promise<QueryNumPoolsResponse> {
    const data = QueryNumPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "NumPools",
      data
    );
    return promise.then((data) =>
      QueryNumPoolsResponse.decode(new Reader(data))
    );
  }

  TotalLiquidity(
    request: QueryTotalLiquidityRequest
  ): Promise<QueryTotalLiquidityResponse> {
    const data = QueryTotalLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "TotalLiquidity",
      data
    );
    return promise.then((data) =>
      QueryTotalLiquidityResponse.decode(new Reader(data))
    );
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "Pool",
      data
    );
    return promise.then((data) => QueryPoolResponse.decode(new Reader(data)));
  }

  PoolParams(
    request: QueryPoolParamsRequest
  ): Promise<QueryPoolParamsResponse> {
    const data = QueryPoolParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "PoolParams",
      data
    );
    return promise.then((data) =>
      QueryPoolParamsResponse.decode(new Reader(data))
    );
  }

  TotalPoolLiquidity(
    request: QueryTotalPoolLiquidityRequest
  ): Promise<QueryTotalPoolLiquidityResponse> {
    const data = QueryTotalPoolLiquidityRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "TotalPoolLiquidity",
      data
    );
    return promise.then((data) =>
      QueryTotalPoolLiquidityResponse.decode(new Reader(data))
    );
  }

  TotalShares(
    request: QueryTotalSharesRequest
  ): Promise<QueryTotalSharesResponse> {
    const data = QueryTotalSharesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "TotalShares",
      data
    );
    return promise.then((data) =>
      QueryTotalSharesResponse.decode(new Reader(data))
    );
  }

  SpotPrice(request: QuerySpotPriceRequest): Promise<QuerySpotPriceResponse> {
    const data = QuerySpotPriceRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "SpotPrice",
      data
    );
    return promise.then((data) =>
      QuerySpotPriceResponse.decode(new Reader(data))
    );
  }

  EstimateSwapExactAmountIn(
    request: QuerySwapExactAmountInRequest
  ): Promise<QuerySwapExactAmountInResponse> {
    const data = QuerySwapExactAmountInRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "EstimateSwapExactAmountIn",
      data
    );
    return promise.then((data) =>
      QuerySwapExactAmountInResponse.decode(new Reader(data))
    );
  }

  EstimateSwapExactAmountOut(
    request: QuerySwapExactAmountOutRequest
  ): Promise<QuerySwapExactAmountOutResponse> {
    const data = QuerySwapExactAmountOutRequest.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Query",
      "EstimateSwapExactAmountOut",
      data
    );
    return promise.then((data) =>
      QuerySwapExactAmountOutResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
