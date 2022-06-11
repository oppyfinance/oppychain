/* eslint-disable */
import { Timestamp } from "../google/protobuf/timestamp";
import { Duration } from "../google/protobuf/duration";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "oppyfinance.oppychain.invoice";

export interface SellOrder {
  creator: Uint8Array;
  sellOrderID: string;
  invoiceID: string;
  amount: Uint8Array;
  price: Uint8Array;
  leftAmount: Uint8Array;
  priceRatio: string;
  sellDuration: Duration | undefined;
  createdTime: Date | undefined;
  isDeleted: boolean;
}

const baseSellOrder: object = {
  sellOrderID: "",
  invoiceID: "",
  priceRatio: "",
  isDeleted: false,
};

export const SellOrder = {
  encode(message: SellOrder, writer: Writer = Writer.create()): Writer {
    if (message.creator.length !== 0) {
      writer.uint32(10).bytes(message.creator);
    }
    if (message.sellOrderID !== "") {
      writer.uint32(18).string(message.sellOrderID);
    }
    if (message.invoiceID !== "") {
      writer.uint32(26).string(message.invoiceID);
    }
    if (message.amount.length !== 0) {
      writer.uint32(34).bytes(message.amount);
    }
    if (message.price.length !== 0) {
      writer.uint32(42).bytes(message.price);
    }
    if (message.leftAmount.length !== 0) {
      writer.uint32(50).bytes(message.leftAmount);
    }
    if (message.priceRatio !== "") {
      writer.uint32(58).string(message.priceRatio);
    }
    if (message.sellDuration !== undefined) {
      Duration.encode(message.sellDuration, writer.uint32(66).fork()).ldelim();
    }
    if (message.createdTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdTime),
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.isDeleted === true) {
      writer.uint32(80).bool(message.isDeleted);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SellOrder {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSellOrder } as SellOrder;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.bytes();
          break;
        case 2:
          message.sellOrderID = reader.string();
          break;
        case 3:
          message.invoiceID = reader.string();
          break;
        case 4:
          message.amount = reader.bytes();
          break;
        case 5:
          message.price = reader.bytes();
          break;
        case 6:
          message.leftAmount = reader.bytes();
          break;
        case 7:
          message.priceRatio = reader.string();
          break;
        case 8:
          message.sellDuration = Duration.decode(reader, reader.uint32());
          break;
        case 9:
          message.createdTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.isDeleted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SellOrder {
    const message = { ...baseSellOrder } as SellOrder;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = bytesFromBase64(object.creator);
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = String(object.sellOrderID);
    } else {
      message.sellOrderID = "";
    }
    if (object.invoiceID !== undefined && object.invoiceID !== null) {
      message.invoiceID = String(object.invoiceID);
    } else {
      message.invoiceID = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = bytesFromBase64(object.amount);
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = bytesFromBase64(object.price);
    }
    if (object.leftAmount !== undefined && object.leftAmount !== null) {
      message.leftAmount = bytesFromBase64(object.leftAmount);
    }
    if (object.priceRatio !== undefined && object.priceRatio !== null) {
      message.priceRatio = String(object.priceRatio);
    } else {
      message.priceRatio = "";
    }
    if (object.sellDuration !== undefined && object.sellDuration !== null) {
      message.sellDuration = Duration.fromJSON(object.sellDuration);
    } else {
      message.sellDuration = undefined;
    }
    if (object.createdTime !== undefined && object.createdTime !== null) {
      message.createdTime = fromJsonTimestamp(object.createdTime);
    } else {
      message.createdTime = undefined;
    }
    if (object.isDeleted !== undefined && object.isDeleted !== null) {
      message.isDeleted = Boolean(object.isDeleted);
    } else {
      message.isDeleted = false;
    }
    return message;
  },

  toJSON(message: SellOrder): unknown {
    const obj: any = {};
    message.creator !== undefined &&
      (obj.creator = base64FromBytes(
        message.creator !== undefined ? message.creator : new Uint8Array()
      ));
    message.sellOrderID !== undefined &&
      (obj.sellOrderID = message.sellOrderID);
    message.invoiceID !== undefined && (obj.invoiceID = message.invoiceID);
    message.amount !== undefined &&
      (obj.amount = base64FromBytes(
        message.amount !== undefined ? message.amount : new Uint8Array()
      ));
    message.price !== undefined &&
      (obj.price = base64FromBytes(
        message.price !== undefined ? message.price : new Uint8Array()
      ));
    message.leftAmount !== undefined &&
      (obj.leftAmount = base64FromBytes(
        message.leftAmount !== undefined ? message.leftAmount : new Uint8Array()
      ));
    message.priceRatio !== undefined && (obj.priceRatio = message.priceRatio);
    message.sellDuration !== undefined &&
      (obj.sellDuration = message.sellDuration
        ? Duration.toJSON(message.sellDuration)
        : undefined);
    message.createdTime !== undefined &&
      (obj.createdTime =
        message.createdTime !== undefined
          ? message.createdTime.toISOString()
          : null);
    message.isDeleted !== undefined && (obj.isDeleted = message.isDeleted);
    return obj;
  },

  fromPartial(object: DeepPartial<SellOrder>): SellOrder {
    const message = { ...baseSellOrder } as SellOrder;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = new Uint8Array();
    }
    if (object.sellOrderID !== undefined && object.sellOrderID !== null) {
      message.sellOrderID = object.sellOrderID;
    } else {
      message.sellOrderID = "";
    }
    if (object.invoiceID !== undefined && object.invoiceID !== null) {
      message.invoiceID = object.invoiceID;
    } else {
      message.invoiceID = "";
    }
    if (object.amount !== undefined && object.amount !== null) {
      message.amount = object.amount;
    } else {
      message.amount = new Uint8Array();
    }
    if (object.price !== undefined && object.price !== null) {
      message.price = object.price;
    } else {
      message.price = new Uint8Array();
    }
    if (object.leftAmount !== undefined && object.leftAmount !== null) {
      message.leftAmount = object.leftAmount;
    } else {
      message.leftAmount = new Uint8Array();
    }
    if (object.priceRatio !== undefined && object.priceRatio !== null) {
      message.priceRatio = object.priceRatio;
    } else {
      message.priceRatio = "";
    }
    if (object.sellDuration !== undefined && object.sellDuration !== null) {
      message.sellDuration = Duration.fromPartial(object.sellDuration);
    } else {
      message.sellDuration = undefined;
    }
    if (object.createdTime !== undefined && object.createdTime !== null) {
      message.createdTime = object.createdTime;
    } else {
      message.createdTime = undefined;
    }
    if (object.isDeleted !== undefined && object.isDeleted !== null) {
      message.isDeleted = object.isDeleted;
    } else {
      message.isDeleted = false;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}
