/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Coin } from "../../cosmos/base/v1beta1/coin";

export const protobufPackage = "oppyfinance.oppychain.swap.v1beta1";

/** ===================== MsgJoinPool */
export interface MsgJoinPool {
  sender: string;
  poolId: number;
  shareOutAmount: string;
  tokenInMaxs: Coin[];
}

export interface MsgJoinPoolResponse {}

/** ===================== MsgExitPool */
export interface MsgExitPool {
  sender: string;
  poolId: number;
  shareInAmount: string;
  tokenOutMins: Coin[];
}

export interface MsgExitPoolResponse {}

/** ===================== MsgSwapExactAmountIn */
export interface SwapAmountInRoute {
  poolId: number;
  tokenOutDenom: string;
}

export interface MsgSwapExactAmountIn {
  sender: string;
  routes: SwapAmountInRoute[];
  tokenIn: Coin | undefined;
  tokenOutMinAmount: string;
}

export interface MsgSwapExactAmountInResponse {}

/** ===================== MsgSwapExactAmountOut */
export interface SwapAmountOutRoute {
  poolId: number;
  tokenInDenom: string;
}

export interface MsgSwapExactAmountOut {
  sender: string;
  routes: SwapAmountOutRoute[];
  tokenInMaxAmount: string;
  tokenOut: Coin | undefined;
}

export interface MsgSwapExactAmountOutResponse {}

/** ===================== MsgJoinSwapExternAmountIn */
export interface MsgJoinSwapExternAmountIn {
  sender: string;
  poolId: number;
  tokenIn: Coin | undefined;
  shareOutMinAmount: string;
}

export interface MsgJoinSwapExternAmountInResponse {}

/** ===================== MsgJoinSwapShareAmountOut */
export interface MsgJoinSwapShareAmountOut {
  sender: string;
  poolId: number;
  tokenInDenom: string;
  shareOutAmount: string;
  tokenInMaxAmount: string;
}

export interface MsgJoinSwapShareAmountOutResponse {}

/** ===================== MsgExitSwapShareAmountIn */
export interface MsgExitSwapShareAmountIn {
  sender: string;
  poolId: number;
  tokenOutDenom: string;
  shareInAmount: string;
  tokenOutMinAmount: string;
}

export interface MsgExitSwapShareAmountInResponse {}

/** ===================== MsgExitSwapExternAmountOut */
export interface MsgExitSwapExternAmountOut {
  sender: string;
  poolId: number;
  tokenOut: Coin | undefined;
  shareInMaxAmount: string;
}

export interface MsgExitSwapExternAmountOutResponse {}

const baseMsgJoinPool: object = { sender: "", poolId: 0, shareOutAmount: "" };

export const MsgJoinPool = {
  encode(message: MsgJoinPool, writer: Writer = Writer.create()): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.shareOutAmount !== "") {
      writer.uint32(26).string(message.shareOutAmount);
    }
    for (const v of message.tokenInMaxs) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgJoinPool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgJoinPool } as MsgJoinPool;
    message.tokenInMaxs = [];
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
          message.shareOutAmount = reader.string();
          break;
        case 4:
          message.tokenInMaxs.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgJoinPool {
    const message = { ...baseMsgJoinPool } as MsgJoinPool;
    message.tokenInMaxs = [];
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
    if (object.shareOutAmount !== undefined && object.shareOutAmount !== null) {
      message.shareOutAmount = String(object.shareOutAmount);
    } else {
      message.shareOutAmount = "";
    }
    if (object.tokenInMaxs !== undefined && object.tokenInMaxs !== null) {
      for (const e of object.tokenInMaxs) {
        message.tokenInMaxs.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgJoinPool): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.shareOutAmount !== undefined &&
      (obj.shareOutAmount = message.shareOutAmount);
    if (message.tokenInMaxs) {
      obj.tokenInMaxs = message.tokenInMaxs.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.tokenInMaxs = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgJoinPool>): MsgJoinPool {
    const message = { ...baseMsgJoinPool } as MsgJoinPool;
    message.tokenInMaxs = [];
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
    if (object.shareOutAmount !== undefined && object.shareOutAmount !== null) {
      message.shareOutAmount = object.shareOutAmount;
    } else {
      message.shareOutAmount = "";
    }
    if (object.tokenInMaxs !== undefined && object.tokenInMaxs !== null) {
      for (const e of object.tokenInMaxs) {
        message.tokenInMaxs.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgJoinPoolResponse: object = {};

export const MsgJoinPoolResponse = {
  encode(_: MsgJoinPoolResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgJoinPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgJoinPoolResponse } as MsgJoinPoolResponse;
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

  fromJSON(_: any): MsgJoinPoolResponse {
    const message = { ...baseMsgJoinPoolResponse } as MsgJoinPoolResponse;
    return message;
  },

  toJSON(_: MsgJoinPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgJoinPoolResponse>): MsgJoinPoolResponse {
    const message = { ...baseMsgJoinPoolResponse } as MsgJoinPoolResponse;
    return message;
  },
};

const baseMsgExitPool: object = { sender: "", poolId: 0, shareInAmount: "" };

export const MsgExitPool = {
  encode(message: MsgExitPool, writer: Writer = Writer.create()): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.shareInAmount !== "") {
      writer.uint32(26).string(message.shareInAmount);
    }
    for (const v of message.tokenOutMins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgExitPool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgExitPool } as MsgExitPool;
    message.tokenOutMins = [];
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
          message.shareInAmount = reader.string();
          break;
        case 4:
          message.tokenOutMins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExitPool {
    const message = { ...baseMsgExitPool } as MsgExitPool;
    message.tokenOutMins = [];
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
    if (object.shareInAmount !== undefined && object.shareInAmount !== null) {
      message.shareInAmount = String(object.shareInAmount);
    } else {
      message.shareInAmount = "";
    }
    if (object.tokenOutMins !== undefined && object.tokenOutMins !== null) {
      for (const e of object.tokenOutMins) {
        message.tokenOutMins.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MsgExitPool): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.shareInAmount !== undefined &&
      (obj.shareInAmount = message.shareInAmount);
    if (message.tokenOutMins) {
      obj.tokenOutMins = message.tokenOutMins.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.tokenOutMins = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MsgExitPool>): MsgExitPool {
    const message = { ...baseMsgExitPool } as MsgExitPool;
    message.tokenOutMins = [];
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
    if (object.shareInAmount !== undefined && object.shareInAmount !== null) {
      message.shareInAmount = object.shareInAmount;
    } else {
      message.shareInAmount = "";
    }
    if (object.tokenOutMins !== undefined && object.tokenOutMins !== null) {
      for (const e of object.tokenOutMins) {
        message.tokenOutMins.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMsgExitPoolResponse: object = {};

export const MsgExitPoolResponse = {
  encode(_: MsgExitPoolResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgExitPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgExitPoolResponse } as MsgExitPoolResponse;
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

  fromJSON(_: any): MsgExitPoolResponse {
    const message = { ...baseMsgExitPoolResponse } as MsgExitPoolResponse;
    return message;
  },

  toJSON(_: MsgExitPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgExitPoolResponse>): MsgExitPoolResponse {
    const message = { ...baseMsgExitPoolResponse } as MsgExitPoolResponse;
    return message;
  },
};

const baseSwapAmountInRoute: object = { poolId: 0, tokenOutDenom: "" };

export const SwapAmountInRoute = {
  encode(message: SwapAmountInRoute, writer: Writer = Writer.create()): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(18).string(message.tokenOutDenom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SwapAmountInRoute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSwapAmountInRoute } as SwapAmountInRoute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.tokenOutDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SwapAmountInRoute {
    const message = { ...baseSwapAmountInRoute } as SwapAmountInRoute;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.tokenOutDenom !== undefined && object.tokenOutDenom !== null) {
      message.tokenOutDenom = String(object.tokenOutDenom);
    } else {
      message.tokenOutDenom = "";
    }
    return message;
  },

  toJSON(message: SwapAmountInRoute): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenOutDenom !== undefined &&
      (obj.tokenOutDenom = message.tokenOutDenom);
    return obj;
  },

  fromPartial(object: DeepPartial<SwapAmountInRoute>): SwapAmountInRoute {
    const message = { ...baseSwapAmountInRoute } as SwapAmountInRoute;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.tokenOutDenom !== undefined && object.tokenOutDenom !== null) {
      message.tokenOutDenom = object.tokenOutDenom;
    } else {
      message.tokenOutDenom = "";
    }
    return message;
  },
};

const baseMsgSwapExactAmountIn: object = { sender: "", tokenOutMinAmount: "" };

export const MsgSwapExactAmountIn = {
  encode(
    message: MsgSwapExactAmountIn,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(34).string(message.tokenOutMinAmount);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSwapExactAmountIn {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSwapExactAmountIn } as MsgSwapExactAmountIn;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.routes.push(
            SwapAmountInRoute.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.tokenIn = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.tokenOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapExactAmountIn {
    const message = { ...baseMsgSwapExactAmountIn } as MsgSwapExactAmountIn;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountInRoute.fromJSON(e));
      }
    }
    if (object.tokenIn !== undefined && object.tokenIn !== null) {
      message.tokenIn = Coin.fromJSON(object.tokenIn);
    } else {
      message.tokenIn = undefined;
    }
    if (
      object.tokenOutMinAmount !== undefined &&
      object.tokenOutMinAmount !== null
    ) {
      message.tokenOutMinAmount = String(object.tokenOutMinAmount);
    } else {
      message.tokenOutMinAmount = "";
    }
    return message;
  },

  toJSON(message: MsgSwapExactAmountIn): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? SwapAmountInRoute.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    message.tokenIn !== undefined &&
      (obj.tokenIn = message.tokenIn
        ? Coin.toJSON(message.tokenIn)
        : undefined);
    message.tokenOutMinAmount !== undefined &&
      (obj.tokenOutMinAmount = message.tokenOutMinAmount);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSwapExactAmountIn>): MsgSwapExactAmountIn {
    const message = { ...baseMsgSwapExactAmountIn } as MsgSwapExactAmountIn;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountInRoute.fromPartial(e));
      }
    }
    if (object.tokenIn !== undefined && object.tokenIn !== null) {
      message.tokenIn = Coin.fromPartial(object.tokenIn);
    } else {
      message.tokenIn = undefined;
    }
    if (
      object.tokenOutMinAmount !== undefined &&
      object.tokenOutMinAmount !== null
    ) {
      message.tokenOutMinAmount = object.tokenOutMinAmount;
    } else {
      message.tokenOutMinAmount = "";
    }
    return message;
  },
};

const baseMsgSwapExactAmountInResponse: object = {};

export const MsgSwapExactAmountInResponse = {
  encode(
    _: MsgSwapExactAmountInResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSwapExactAmountInResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSwapExactAmountInResponse,
    } as MsgSwapExactAmountInResponse;
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

  fromJSON(_: any): MsgSwapExactAmountInResponse {
    const message = {
      ...baseMsgSwapExactAmountInResponse,
    } as MsgSwapExactAmountInResponse;
    return message;
  },

  toJSON(_: MsgSwapExactAmountInResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSwapExactAmountInResponse>
  ): MsgSwapExactAmountInResponse {
    const message = {
      ...baseMsgSwapExactAmountInResponse,
    } as MsgSwapExactAmountInResponse;
    return message;
  },
};

const baseSwapAmountOutRoute: object = { poolId: 0, tokenInDenom: "" };

export const SwapAmountOutRoute = {
  encode(
    message: SwapAmountOutRoute,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.poolId !== 0) {
      writer.uint32(8).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(18).string(message.tokenInDenom);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SwapAmountOutRoute {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSwapAmountOutRoute } as SwapAmountOutRoute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.tokenInDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SwapAmountOutRoute {
    const message = { ...baseSwapAmountOutRoute } as SwapAmountOutRoute;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = Number(object.poolId);
    } else {
      message.poolId = 0;
    }
    if (object.tokenInDenom !== undefined && object.tokenInDenom !== null) {
      message.tokenInDenom = String(object.tokenInDenom);
    } else {
      message.tokenInDenom = "";
    }
    return message;
  },

  toJSON(message: SwapAmountOutRoute): unknown {
    const obj: any = {};
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenInDenom !== undefined &&
      (obj.tokenInDenom = message.tokenInDenom);
    return obj;
  },

  fromPartial(object: DeepPartial<SwapAmountOutRoute>): SwapAmountOutRoute {
    const message = { ...baseSwapAmountOutRoute } as SwapAmountOutRoute;
    if (object.poolId !== undefined && object.poolId !== null) {
      message.poolId = object.poolId;
    } else {
      message.poolId = 0;
    }
    if (object.tokenInDenom !== undefined && object.tokenInDenom !== null) {
      message.tokenInDenom = object.tokenInDenom;
    } else {
      message.tokenInDenom = "";
    }
    return message;
  },
};

const baseMsgSwapExactAmountOut: object = { sender: "", tokenInMaxAmount: "" };

export const MsgSwapExactAmountOut = {
  encode(
    message: MsgSwapExactAmountOut,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(26).string(message.tokenInMaxAmount);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSwapExactAmountOut {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSwapExactAmountOut } as MsgSwapExactAmountOut;
    message.routes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.routes.push(
            SwapAmountOutRoute.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.tokenInMaxAmount = reader.string();
          break;
        case 4:
          message.tokenOut = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSwapExactAmountOut {
    const message = { ...baseMsgSwapExactAmountOut } as MsgSwapExactAmountOut;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountOutRoute.fromJSON(e));
      }
    }
    if (
      object.tokenInMaxAmount !== undefined &&
      object.tokenInMaxAmount !== null
    ) {
      message.tokenInMaxAmount = String(object.tokenInMaxAmount);
    } else {
      message.tokenInMaxAmount = "";
    }
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = Coin.fromJSON(object.tokenOut);
    } else {
      message.tokenOut = undefined;
    }
    return message;
  },

  toJSON(message: MsgSwapExactAmountOut): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    if (message.routes) {
      obj.routes = message.routes.map((e) =>
        e ? SwapAmountOutRoute.toJSON(e) : undefined
      );
    } else {
      obj.routes = [];
    }
    message.tokenInMaxAmount !== undefined &&
      (obj.tokenInMaxAmount = message.tokenInMaxAmount);
    message.tokenOut !== undefined &&
      (obj.tokenOut = message.tokenOut
        ? Coin.toJSON(message.tokenOut)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgSwapExactAmountOut>
  ): MsgSwapExactAmountOut {
    const message = { ...baseMsgSwapExactAmountOut } as MsgSwapExactAmountOut;
    message.routes = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.routes !== undefined && object.routes !== null) {
      for (const e of object.routes) {
        message.routes.push(SwapAmountOutRoute.fromPartial(e));
      }
    }
    if (
      object.tokenInMaxAmount !== undefined &&
      object.tokenInMaxAmount !== null
    ) {
      message.tokenInMaxAmount = object.tokenInMaxAmount;
    } else {
      message.tokenInMaxAmount = "";
    }
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = Coin.fromPartial(object.tokenOut);
    } else {
      message.tokenOut = undefined;
    }
    return message;
  },
};

const baseMsgSwapExactAmountOutResponse: object = {};

export const MsgSwapExactAmountOutResponse = {
  encode(
    _: MsgSwapExactAmountOutResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSwapExactAmountOutResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSwapExactAmountOutResponse,
    } as MsgSwapExactAmountOutResponse;
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

  fromJSON(_: any): MsgSwapExactAmountOutResponse {
    const message = {
      ...baseMsgSwapExactAmountOutResponse,
    } as MsgSwapExactAmountOutResponse;
    return message;
  },

  toJSON(_: MsgSwapExactAmountOutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSwapExactAmountOutResponse>
  ): MsgSwapExactAmountOutResponse {
    const message = {
      ...baseMsgSwapExactAmountOutResponse,
    } as MsgSwapExactAmountOutResponse;
    return message;
  },
};

const baseMsgJoinSwapExternAmountIn: object = {
  sender: "",
  poolId: 0,
  shareOutMinAmount: "",
};

export const MsgJoinSwapExternAmountIn = {
  encode(
    message: MsgJoinSwapExternAmountIn,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== undefined) {
      Coin.encode(message.tokenIn, writer.uint32(26).fork()).ldelim();
    }
    if (message.shareOutMinAmount !== "") {
      writer.uint32(34).string(message.shareOutMinAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgJoinSwapExternAmountIn {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgJoinSwapExternAmountIn,
    } as MsgJoinSwapExternAmountIn;
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
          message.tokenIn = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.shareOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgJoinSwapExternAmountIn {
    const message = {
      ...baseMsgJoinSwapExternAmountIn,
    } as MsgJoinSwapExternAmountIn;
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
      message.tokenIn = Coin.fromJSON(object.tokenIn);
    } else {
      message.tokenIn = undefined;
    }
    if (
      object.shareOutMinAmount !== undefined &&
      object.shareOutMinAmount !== null
    ) {
      message.shareOutMinAmount = String(object.shareOutMinAmount);
    } else {
      message.shareOutMinAmount = "";
    }
    return message;
  },

  toJSON(message: MsgJoinSwapExternAmountIn): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenIn !== undefined &&
      (obj.tokenIn = message.tokenIn
        ? Coin.toJSON(message.tokenIn)
        : undefined);
    message.shareOutMinAmount !== undefined &&
      (obj.shareOutMinAmount = message.shareOutMinAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgJoinSwapExternAmountIn>
  ): MsgJoinSwapExternAmountIn {
    const message = {
      ...baseMsgJoinSwapExternAmountIn,
    } as MsgJoinSwapExternAmountIn;
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
      message.tokenIn = Coin.fromPartial(object.tokenIn);
    } else {
      message.tokenIn = undefined;
    }
    if (
      object.shareOutMinAmount !== undefined &&
      object.shareOutMinAmount !== null
    ) {
      message.shareOutMinAmount = object.shareOutMinAmount;
    } else {
      message.shareOutMinAmount = "";
    }
    return message;
  },
};

const baseMsgJoinSwapExternAmountInResponse: object = {};

export const MsgJoinSwapExternAmountInResponse = {
  encode(
    _: MsgJoinSwapExternAmountInResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgJoinSwapExternAmountInResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgJoinSwapExternAmountInResponse,
    } as MsgJoinSwapExternAmountInResponse;
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

  fromJSON(_: any): MsgJoinSwapExternAmountInResponse {
    const message = {
      ...baseMsgJoinSwapExternAmountInResponse,
    } as MsgJoinSwapExternAmountInResponse;
    return message;
  },

  toJSON(_: MsgJoinSwapExternAmountInResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgJoinSwapExternAmountInResponse>
  ): MsgJoinSwapExternAmountInResponse {
    const message = {
      ...baseMsgJoinSwapExternAmountInResponse,
    } as MsgJoinSwapExternAmountInResponse;
    return message;
  },
};

const baseMsgJoinSwapShareAmountOut: object = {
  sender: "",
  poolId: 0,
  tokenInDenom: "",
  shareOutAmount: "",
  tokenInMaxAmount: "",
};

export const MsgJoinSwapShareAmountOut = {
  encode(
    message: MsgJoinSwapShareAmountOut,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenInDenom !== "") {
      writer.uint32(26).string(message.tokenInDenom);
    }
    if (message.shareOutAmount !== "") {
      writer.uint32(34).string(message.shareOutAmount);
    }
    if (message.tokenInMaxAmount !== "") {
      writer.uint32(42).string(message.tokenInMaxAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgJoinSwapShareAmountOut {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgJoinSwapShareAmountOut,
    } as MsgJoinSwapShareAmountOut;
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
          message.tokenInDenom = reader.string();
          break;
        case 4:
          message.shareOutAmount = reader.string();
          break;
        case 5:
          message.tokenInMaxAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgJoinSwapShareAmountOut {
    const message = {
      ...baseMsgJoinSwapShareAmountOut,
    } as MsgJoinSwapShareAmountOut;
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
    if (object.tokenInDenom !== undefined && object.tokenInDenom !== null) {
      message.tokenInDenom = String(object.tokenInDenom);
    } else {
      message.tokenInDenom = "";
    }
    if (object.shareOutAmount !== undefined && object.shareOutAmount !== null) {
      message.shareOutAmount = String(object.shareOutAmount);
    } else {
      message.shareOutAmount = "";
    }
    if (
      object.tokenInMaxAmount !== undefined &&
      object.tokenInMaxAmount !== null
    ) {
      message.tokenInMaxAmount = String(object.tokenInMaxAmount);
    } else {
      message.tokenInMaxAmount = "";
    }
    return message;
  },

  toJSON(message: MsgJoinSwapShareAmountOut): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenInDenom !== undefined &&
      (obj.tokenInDenom = message.tokenInDenom);
    message.shareOutAmount !== undefined &&
      (obj.shareOutAmount = message.shareOutAmount);
    message.tokenInMaxAmount !== undefined &&
      (obj.tokenInMaxAmount = message.tokenInMaxAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgJoinSwapShareAmountOut>
  ): MsgJoinSwapShareAmountOut {
    const message = {
      ...baseMsgJoinSwapShareAmountOut,
    } as MsgJoinSwapShareAmountOut;
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
    if (object.tokenInDenom !== undefined && object.tokenInDenom !== null) {
      message.tokenInDenom = object.tokenInDenom;
    } else {
      message.tokenInDenom = "";
    }
    if (object.shareOutAmount !== undefined && object.shareOutAmount !== null) {
      message.shareOutAmount = object.shareOutAmount;
    } else {
      message.shareOutAmount = "";
    }
    if (
      object.tokenInMaxAmount !== undefined &&
      object.tokenInMaxAmount !== null
    ) {
      message.tokenInMaxAmount = object.tokenInMaxAmount;
    } else {
      message.tokenInMaxAmount = "";
    }
    return message;
  },
};

const baseMsgJoinSwapShareAmountOutResponse: object = {};

export const MsgJoinSwapShareAmountOutResponse = {
  encode(
    _: MsgJoinSwapShareAmountOutResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgJoinSwapShareAmountOutResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgJoinSwapShareAmountOutResponse,
    } as MsgJoinSwapShareAmountOutResponse;
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

  fromJSON(_: any): MsgJoinSwapShareAmountOutResponse {
    const message = {
      ...baseMsgJoinSwapShareAmountOutResponse,
    } as MsgJoinSwapShareAmountOutResponse;
    return message;
  },

  toJSON(_: MsgJoinSwapShareAmountOutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgJoinSwapShareAmountOutResponse>
  ): MsgJoinSwapShareAmountOutResponse {
    const message = {
      ...baseMsgJoinSwapShareAmountOutResponse,
    } as MsgJoinSwapShareAmountOutResponse;
    return message;
  },
};

const baseMsgExitSwapShareAmountIn: object = {
  sender: "",
  poolId: 0,
  tokenOutDenom: "",
  shareInAmount: "",
  tokenOutMinAmount: "",
};

export const MsgExitSwapShareAmountIn = {
  encode(
    message: MsgExitSwapShareAmountIn,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenOutDenom !== "") {
      writer.uint32(26).string(message.tokenOutDenom);
    }
    if (message.shareInAmount !== "") {
      writer.uint32(34).string(message.shareInAmount);
    }
    if (message.tokenOutMinAmount !== "") {
      writer.uint32(42).string(message.tokenOutMinAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgExitSwapShareAmountIn {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgExitSwapShareAmountIn,
    } as MsgExitSwapShareAmountIn;
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
          message.tokenOutDenom = reader.string();
          break;
        case 4:
          message.shareInAmount = reader.string();
          break;
        case 5:
          message.tokenOutMinAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExitSwapShareAmountIn {
    const message = {
      ...baseMsgExitSwapShareAmountIn,
    } as MsgExitSwapShareAmountIn;
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
    if (object.tokenOutDenom !== undefined && object.tokenOutDenom !== null) {
      message.tokenOutDenom = String(object.tokenOutDenom);
    } else {
      message.tokenOutDenom = "";
    }
    if (object.shareInAmount !== undefined && object.shareInAmount !== null) {
      message.shareInAmount = String(object.shareInAmount);
    } else {
      message.shareInAmount = "";
    }
    if (
      object.tokenOutMinAmount !== undefined &&
      object.tokenOutMinAmount !== null
    ) {
      message.tokenOutMinAmount = String(object.tokenOutMinAmount);
    } else {
      message.tokenOutMinAmount = "";
    }
    return message;
  },

  toJSON(message: MsgExitSwapShareAmountIn): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenOutDenom !== undefined &&
      (obj.tokenOutDenom = message.tokenOutDenom);
    message.shareInAmount !== undefined &&
      (obj.shareInAmount = message.shareInAmount);
    message.tokenOutMinAmount !== undefined &&
      (obj.tokenOutMinAmount = message.tokenOutMinAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgExitSwapShareAmountIn>
  ): MsgExitSwapShareAmountIn {
    const message = {
      ...baseMsgExitSwapShareAmountIn,
    } as MsgExitSwapShareAmountIn;
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
    if (object.tokenOutDenom !== undefined && object.tokenOutDenom !== null) {
      message.tokenOutDenom = object.tokenOutDenom;
    } else {
      message.tokenOutDenom = "";
    }
    if (object.shareInAmount !== undefined && object.shareInAmount !== null) {
      message.shareInAmount = object.shareInAmount;
    } else {
      message.shareInAmount = "";
    }
    if (
      object.tokenOutMinAmount !== undefined &&
      object.tokenOutMinAmount !== null
    ) {
      message.tokenOutMinAmount = object.tokenOutMinAmount;
    } else {
      message.tokenOutMinAmount = "";
    }
    return message;
  },
};

const baseMsgExitSwapShareAmountInResponse: object = {};

export const MsgExitSwapShareAmountInResponse = {
  encode(
    _: MsgExitSwapShareAmountInResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgExitSwapShareAmountInResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgExitSwapShareAmountInResponse,
    } as MsgExitSwapShareAmountInResponse;
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

  fromJSON(_: any): MsgExitSwapShareAmountInResponse {
    const message = {
      ...baseMsgExitSwapShareAmountInResponse,
    } as MsgExitSwapShareAmountInResponse;
    return message;
  },

  toJSON(_: MsgExitSwapShareAmountInResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgExitSwapShareAmountInResponse>
  ): MsgExitSwapShareAmountInResponse {
    const message = {
      ...baseMsgExitSwapShareAmountInResponse,
    } as MsgExitSwapShareAmountInResponse;
    return message;
  },
};

const baseMsgExitSwapExternAmountOut: object = {
  sender: "",
  poolId: 0,
  shareInMaxAmount: "",
};

export const MsgExitSwapExternAmountOut = {
  encode(
    message: MsgExitSwapExternAmountOut,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== 0) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenOut !== undefined) {
      Coin.encode(message.tokenOut, writer.uint32(26).fork()).ldelim();
    }
    if (message.shareInMaxAmount !== "") {
      writer.uint32(34).string(message.shareInMaxAmount);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgExitSwapExternAmountOut {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgExitSwapExternAmountOut,
    } as MsgExitSwapExternAmountOut;
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
          message.tokenOut = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.shareInMaxAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExitSwapExternAmountOut {
    const message = {
      ...baseMsgExitSwapExternAmountOut,
    } as MsgExitSwapExternAmountOut;
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
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = Coin.fromJSON(object.tokenOut);
    } else {
      message.tokenOut = undefined;
    }
    if (
      object.shareInMaxAmount !== undefined &&
      object.shareInMaxAmount !== null
    ) {
      message.shareInMaxAmount = String(object.shareInMaxAmount);
    } else {
      message.shareInMaxAmount = "";
    }
    return message;
  },

  toJSON(message: MsgExitSwapExternAmountOut): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.tokenOut !== undefined &&
      (obj.tokenOut = message.tokenOut
        ? Coin.toJSON(message.tokenOut)
        : undefined);
    message.shareInMaxAmount !== undefined &&
      (obj.shareInMaxAmount = message.shareInMaxAmount);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgExitSwapExternAmountOut>
  ): MsgExitSwapExternAmountOut {
    const message = {
      ...baseMsgExitSwapExternAmountOut,
    } as MsgExitSwapExternAmountOut;
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
    if (object.tokenOut !== undefined && object.tokenOut !== null) {
      message.tokenOut = Coin.fromPartial(object.tokenOut);
    } else {
      message.tokenOut = undefined;
    }
    if (
      object.shareInMaxAmount !== undefined &&
      object.shareInMaxAmount !== null
    ) {
      message.shareInMaxAmount = object.shareInMaxAmount;
    } else {
      message.shareInMaxAmount = "";
    }
    return message;
  },
};

const baseMsgExitSwapExternAmountOutResponse: object = {};

export const MsgExitSwapExternAmountOutResponse = {
  encode(
    _: MsgExitSwapExternAmountOutResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgExitSwapExternAmountOutResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgExitSwapExternAmountOutResponse,
    } as MsgExitSwapExternAmountOutResponse;
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

  fromJSON(_: any): MsgExitSwapExternAmountOutResponse {
    const message = {
      ...baseMsgExitSwapExternAmountOutResponse,
    } as MsgExitSwapExternAmountOutResponse;
    return message;
  },

  toJSON(_: MsgExitSwapExternAmountOutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgExitSwapExternAmountOutResponse>
  ): MsgExitSwapExternAmountOutResponse {
    const message = {
      ...baseMsgExitSwapExternAmountOutResponse,
    } as MsgExitSwapExternAmountOutResponse;
    return message;
  },
};

export interface Msg {
  JoinPool(request: MsgJoinPool): Promise<MsgJoinPoolResponse>;
  ExitPool(request: MsgExitPool): Promise<MsgExitPoolResponse>;
  SwapExactAmountIn(
    request: MsgSwapExactAmountIn
  ): Promise<MsgSwapExactAmountInResponse>;
  SwapExactAmountOut(
    request: MsgSwapExactAmountOut
  ): Promise<MsgSwapExactAmountOutResponse>;
  JoinSwapExternAmountIn(
    request: MsgJoinSwapExternAmountIn
  ): Promise<MsgJoinSwapExternAmountInResponse>;
  JoinSwapShareAmountOut(
    request: MsgJoinSwapShareAmountOut
  ): Promise<MsgJoinSwapShareAmountOutResponse>;
  ExitSwapExternAmountOut(
    request: MsgExitSwapExternAmountOut
  ): Promise<MsgExitSwapExternAmountOutResponse>;
  ExitSwapShareAmountIn(
    request: MsgExitSwapShareAmountIn
  ): Promise<MsgExitSwapShareAmountInResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  JoinPool(request: MsgJoinPool): Promise<MsgJoinPoolResponse> {
    const data = MsgJoinPool.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "JoinPool",
      data
    );
    return promise.then((data) => MsgJoinPoolResponse.decode(new Reader(data)));
  }

  ExitPool(request: MsgExitPool): Promise<MsgExitPoolResponse> {
    const data = MsgExitPool.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "ExitPool",
      data
    );
    return promise.then((data) => MsgExitPoolResponse.decode(new Reader(data)));
  }

  SwapExactAmountIn(
    request: MsgSwapExactAmountIn
  ): Promise<MsgSwapExactAmountInResponse> {
    const data = MsgSwapExactAmountIn.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "SwapExactAmountIn",
      data
    );
    return promise.then((data) =>
      MsgSwapExactAmountInResponse.decode(new Reader(data))
    );
  }

  SwapExactAmountOut(
    request: MsgSwapExactAmountOut
  ): Promise<MsgSwapExactAmountOutResponse> {
    const data = MsgSwapExactAmountOut.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "SwapExactAmountOut",
      data
    );
    return promise.then((data) =>
      MsgSwapExactAmountOutResponse.decode(new Reader(data))
    );
  }

  JoinSwapExternAmountIn(
    request: MsgJoinSwapExternAmountIn
  ): Promise<MsgJoinSwapExternAmountInResponse> {
    const data = MsgJoinSwapExternAmountIn.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "JoinSwapExternAmountIn",
      data
    );
    return promise.then((data) =>
      MsgJoinSwapExternAmountInResponse.decode(new Reader(data))
    );
  }

  JoinSwapShareAmountOut(
    request: MsgJoinSwapShareAmountOut
  ): Promise<MsgJoinSwapShareAmountOutResponse> {
    const data = MsgJoinSwapShareAmountOut.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "JoinSwapShareAmountOut",
      data
    );
    return promise.then((data) =>
      MsgJoinSwapShareAmountOutResponse.decode(new Reader(data))
    );
  }

  ExitSwapExternAmountOut(
    request: MsgExitSwapExternAmountOut
  ): Promise<MsgExitSwapExternAmountOutResponse> {
    const data = MsgExitSwapExternAmountOut.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "ExitSwapExternAmountOut",
      data
    );
    return promise.then((data) =>
      MsgExitSwapExternAmountOutResponse.decode(new Reader(data))
    );
  }

  ExitSwapShareAmountIn(
    request: MsgExitSwapShareAmountIn
  ): Promise<MsgExitSwapShareAmountInResponse> {
    const data = MsgExitSwapShareAmountIn.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.v1beta1.Msg",
      "ExitSwapShareAmountIn",
      data
    );
    return promise.then((data) =>
      MsgExitSwapShareAmountInResponse.decode(new Reader(data))
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
