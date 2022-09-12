/* eslint-disable */
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "oppyfinance.oppychain.vault";

export interface entity {
  address: Uint8Array;
  feecoin: Coin[];
}

export interface proposals {
  entry: entity[];
}

export interface OutboundTx {
  index: string;
  processed: boolean;
  items: { [key: string]: proposals };
}

export interface OutboundTx_ItemsEntry {
  key: string;
  value: proposals | undefined;
}

const baseentity: object = {};

export const entity = {
  encode(message: entity, writer: Writer = Writer.create()): Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    for (const v of message.feecoin) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): entity {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseentity } as entity;
    message.feecoin = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.feecoin.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): entity {
    const message = { ...baseentity } as entity;
    message.feecoin = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = bytesFromBase64(object.address);
    }
    if (object.feecoin !== undefined && object.feecoin !== null) {
      for (const e of object.feecoin) {
        message.feecoin.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: entity): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    if (message.feecoin) {
      obj.feecoin = message.feecoin.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.feecoin = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<entity>): entity {
    const message = { ...baseentity } as entity;
    message.feecoin = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = new Uint8Array();
    }
    if (object.feecoin !== undefined && object.feecoin !== null) {
      for (const e of object.feecoin) {
        message.feecoin.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const baseproposals: object = {};

export const proposals = {
  encode(message: proposals, writer: Writer = Writer.create()): Writer {
    for (const v of message.entry) {
      entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): proposals {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseproposals } as proposals;
    message.entry = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entry.push(entity.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): proposals {
    const message = { ...baseproposals } as proposals;
    message.entry = [];
    if (object.entry !== undefined && object.entry !== null) {
      for (const e of object.entry) {
        message.entry.push(entity.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: proposals): unknown {
    const obj: any = {};
    if (message.entry) {
      obj.entry = message.entry.map((e) => (e ? entity.toJSON(e) : undefined));
    } else {
      obj.entry = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<proposals>): proposals {
    const message = { ...baseproposals } as proposals;
    message.entry = [];
    if (object.entry !== undefined && object.entry !== null) {
      for (const e of object.entry) {
        message.entry.push(entity.fromPartial(e));
      }
    }
    return message;
  },
};

const baseOutboundTx: object = { index: "", processed: false };

export const OutboundTx = {
  encode(message: OutboundTx, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.processed === true) {
      writer.uint32(16).bool(message.processed);
    }
    Object.entries(message.items).forEach(([key, value]) => {
      OutboundTx_ItemsEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): OutboundTx {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOutboundTx } as OutboundTx;
    message.items = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.processed = reader.bool();
          break;
        case 3:
          const entry3 = OutboundTx_ItemsEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.items[entry3.key] = entry3.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OutboundTx {
    const message = { ...baseOutboundTx } as OutboundTx;
    message.items = {};
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.processed !== undefined && object.processed !== null) {
      message.processed = Boolean(object.processed);
    } else {
      message.processed = false;
    }
    if (object.items !== undefined && object.items !== null) {
      Object.entries(object.items).forEach(([key, value]) => {
        message.items[key] = proposals.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: OutboundTx): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.processed !== undefined && (obj.processed = message.processed);
    obj.items = {};
    if (message.items) {
      Object.entries(message.items).forEach(([k, v]) => {
        obj.items[k] = proposals.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<OutboundTx>): OutboundTx {
    const message = { ...baseOutboundTx } as OutboundTx;
    message.items = {};
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.processed !== undefined && object.processed !== null) {
      message.processed = object.processed;
    } else {
      message.processed = false;
    }
    if (object.items !== undefined && object.items !== null) {
      Object.entries(object.items).forEach(([key, value]) => {
        if (value !== undefined) {
          message.items[key] = proposals.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseOutboundTx_ItemsEntry: object = { key: "" };

export const OutboundTx_ItemsEntry = {
  encode(
    message: OutboundTx_ItemsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      proposals.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): OutboundTx_ItemsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = proposals.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OutboundTx_ItemsEntry {
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = proposals.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: OutboundTx_ItemsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? proposals.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<OutboundTx_ItemsEntry>
  ): OutboundTx_ItemsEntry {
    const message = { ...baseOutboundTx_ItemsEntry } as OutboundTx_ItemsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = proposals.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

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
