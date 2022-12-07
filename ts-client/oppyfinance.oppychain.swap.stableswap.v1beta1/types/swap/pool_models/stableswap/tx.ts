/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { PoolParams } from "./stableswap_pool";

export const protobufPackage = "oppyfinance.oppychain.swap.stableswap.v1beta1";

export interface MsgCreateStableswapPool {
  sender: string;
  poolParams: PoolParams | undefined;
  initialPoolLiquidity: Coin[];
  futurePoolGovernor: string;
}

export interface MsgCreateStableswapPoolResponse {
  poolId: number;
}

export interface MsgStableSwapAdjustScalingFactors {
  /**
   * Sender must be the pool's scaling_factor_governor in order for the tx to
   * succeed
   */
  sender: string;
  poolId: number;
  scalingFactors: number[];
}

export interface MsgStableSwapAdjustScalingFactorsResponse {
}

function createBaseMsgCreateStableswapPool(): MsgCreateStableswapPool {
  return { sender: "", poolParams: undefined, initialPoolLiquidity: [], futurePoolGovernor: "" };
}

export const MsgCreateStableswapPool = {
  encode(message: MsgCreateStableswapPool, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolParams !== undefined) {
      PoolParams.encode(message.poolParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.initialPoolLiquidity) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.futurePoolGovernor !== "") {
      writer.uint32(34).string(message.futurePoolGovernor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateStableswapPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateStableswapPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolParams = PoolParams.decode(reader, reader.uint32());
          break;
        case 3:
          message.initialPoolLiquidity.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.futurePoolGovernor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStableswapPool {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      poolParams: isSet(object.poolParams) ? PoolParams.fromJSON(object.poolParams) : undefined,
      initialPoolLiquidity: Array.isArray(object?.initialPoolLiquidity)
        ? object.initialPoolLiquidity.map((e: any) => Coin.fromJSON(e))
        : [],
      futurePoolGovernor: isSet(object.futurePoolGovernor) ? String(object.futurePoolGovernor) : "",
    };
  },

  toJSON(message: MsgCreateStableswapPool): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolParams !== undefined
      && (obj.poolParams = message.poolParams ? PoolParams.toJSON(message.poolParams) : undefined);
    if (message.initialPoolLiquidity) {
      obj.initialPoolLiquidity = message.initialPoolLiquidity.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.initialPoolLiquidity = [];
    }
    message.futurePoolGovernor !== undefined && (obj.futurePoolGovernor = message.futurePoolGovernor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateStableswapPool>, I>>(object: I): MsgCreateStableswapPool {
    const message = createBaseMsgCreateStableswapPool();
    message.sender = object.sender ?? "";
    message.poolParams = (object.poolParams !== undefined && object.poolParams !== null)
      ? PoolParams.fromPartial(object.poolParams)
      : undefined;
    message.initialPoolLiquidity = object.initialPoolLiquidity?.map((e) => Coin.fromPartial(e)) || [];
    message.futurePoolGovernor = object.futurePoolGovernor ?? "";
    return message;
  },
};

function createBaseMsgCreateStableswapPoolResponse(): MsgCreateStableswapPoolResponse {
  return { poolId: 0 };
}

export const MsgCreateStableswapPoolResponse = {
  encode(message: MsgCreateStableswapPoolResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateStableswapPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateStableswapPoolResponse();
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

  fromJSON(object: any): MsgCreateStableswapPoolResponse {
    return { poolId: isSet(object.poolId) ? Number(object.poolId) : 0 };
  },

  toJSON(message: MsgCreateStableswapPoolResponse): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = Math.round(message.poolId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateStableswapPoolResponse>, I>>(
    object: I,
  ): MsgCreateStableswapPoolResponse {
    const message = createBaseMsgCreateStableswapPoolResponse();
    message.poolId = object.poolId ?? 0;
    return message;
  },
};

function createBaseMsgStableSwapAdjustScalingFactors(): MsgStableSwapAdjustScalingFactors {
  return { sender: "", poolId: 0, scalingFactors: [] };
}

export const MsgStableSwapAdjustScalingFactors = {
  encode(message: MsgStableSwapAdjustScalingFactors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    writer.uint32(26).fork();
    for (const v of message.scalingFactors) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStableSwapAdjustScalingFactors {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStableSwapAdjustScalingFactors();
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
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.scalingFactors.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.scalingFactors.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStableSwapAdjustScalingFactors {
    return {
      sender: isSet(object.sender) ? String(object.sender) : "",
      poolId: isSet(object.poolId) ? Number(object.poolId) : 0,
      scalingFactors: Array.isArray(object?.scalingFactors) ? object.scalingFactors.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: MsgStableSwapAdjustScalingFactors): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = Math.round(message.poolId));
    if (message.scalingFactors) {
      obj.scalingFactors = message.scalingFactors.map((e) => Math.round(e));
    } else {
      obj.scalingFactors = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStableSwapAdjustScalingFactors>, I>>(
    object: I,
  ): MsgStableSwapAdjustScalingFactors {
    const message = createBaseMsgStableSwapAdjustScalingFactors();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId ?? 0;
    message.scalingFactors = object.scalingFactors?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgStableSwapAdjustScalingFactorsResponse(): MsgStableSwapAdjustScalingFactorsResponse {
  return {};
}

export const MsgStableSwapAdjustScalingFactorsResponse = {
  encode(_: MsgStableSwapAdjustScalingFactorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStableSwapAdjustScalingFactorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStableSwapAdjustScalingFactorsResponse();
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

  fromJSON(_: any): MsgStableSwapAdjustScalingFactorsResponse {
    return {};
  },

  toJSON(_: MsgStableSwapAdjustScalingFactorsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStableSwapAdjustScalingFactorsResponse>, I>>(
    _: I,
  ): MsgStableSwapAdjustScalingFactorsResponse {
    const message = createBaseMsgStableSwapAdjustScalingFactorsResponse();
    return message;
  },
};

export interface Msg {
  CreateStableswapPool(request: MsgCreateStableswapPool): Promise<MsgCreateStableswapPoolResponse>;
  StableSwapAdjustScalingFactors(
    request: MsgStableSwapAdjustScalingFactors,
  ): Promise<MsgStableSwapAdjustScalingFactorsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateStableswapPool = this.CreateStableswapPool.bind(this);
    this.StableSwapAdjustScalingFactors = this.StableSwapAdjustScalingFactors.bind(this);
  }
  CreateStableswapPool(request: MsgCreateStableswapPool): Promise<MsgCreateStableswapPoolResponse> {
    const data = MsgCreateStableswapPool.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.swap.stableswap.v1beta1.Msg", "CreateStableswapPool", data);
    return promise.then((data) => MsgCreateStableswapPoolResponse.decode(new _m0.Reader(data)));
  }

  StableSwapAdjustScalingFactors(
    request: MsgStableSwapAdjustScalingFactors,
  ): Promise<MsgStableSwapAdjustScalingFactorsResponse> {
    const data = MsgStableSwapAdjustScalingFactors.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.stableswap.v1beta1.Msg",
      "StableSwapAdjustScalingFactors",
      data,
    );
    return promise.then((data) => MsgStableSwapAdjustScalingFactorsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
