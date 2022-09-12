/* eslint-disable */
import { Params, Validators, StandbyPower } from "../vault/staking";
import { OutboundTx } from "../vault/outbound_tx";
import { IssueToken } from "../vault/issue_token";
import { CreatePool } from "../vault/create_pool";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { coinsQuota } from "../vault/quota";
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "oppyfinance.oppychain.vault";

/** GenesisState defines the vault module's genesis state. */
export interface GenesisState {
  /** params defines all the paramaters of related to deposit. */
  params: Params | undefined;
  outboundTxList: OutboundTx[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  issueTokenList: IssueToken[];
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  createPoolList: CreatePool[];
  /** this line is used by starport scaffolding # ibc/genesis/proto */
  validatorinfoList: Validators[];
  standbypowerList: StandbyPower[];
  feeCollectedList: Coin[];
  coinsQuota: coinsQuota | undefined;
  exported: boolean;
}

const baseGenesisState: object = { exported: false };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.outboundTxList) {
      OutboundTx.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.issueTokenList) {
      IssueToken.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.createPoolList) {
      CreatePool.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.validatorinfoList) {
      Validators.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.standbypowerList) {
      StandbyPower.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.feeCollectedList) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.coinsQuota !== undefined) {
      coinsQuota.encode(message.coinsQuota, writer.uint32(74).fork()).ldelim();
    }
    if (message.exported === true) {
      writer.uint32(32).bool(message.exported);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.outboundTxList = [];
    message.issueTokenList = [];
    message.createPoolList = [];
    message.validatorinfoList = [];
    message.standbypowerList = [];
    message.feeCollectedList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 5:
          message.outboundTxList.push(
            OutboundTx.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.issueTokenList.push(
            IssueToken.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.createPoolList.push(
            CreatePool.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.validatorinfoList.push(
            Validators.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.standbypowerList.push(
            StandbyPower.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.feeCollectedList.push(Coin.decode(reader, reader.uint32()));
          break;
        case 9:
          message.coinsQuota = coinsQuota.decode(reader, reader.uint32());
          break;
        case 4:
          message.exported = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.outboundTxList = [];
    message.issueTokenList = [];
    message.createPoolList = [];
    message.validatorinfoList = [];
    message.standbypowerList = [];
    message.feeCollectedList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.outboundTxList !== undefined && object.outboundTxList !== null) {
      for (const e of object.outboundTxList) {
        message.outboundTxList.push(OutboundTx.fromJSON(e));
      }
    }
    if (object.issueTokenList !== undefined && object.issueTokenList !== null) {
      for (const e of object.issueTokenList) {
        message.issueTokenList.push(IssueToken.fromJSON(e));
      }
    }
    if (object.createPoolList !== undefined && object.createPoolList !== null) {
      for (const e of object.createPoolList) {
        message.createPoolList.push(CreatePool.fromJSON(e));
      }
    }
    if (
      object.validatorinfoList !== undefined &&
      object.validatorinfoList !== null
    ) {
      for (const e of object.validatorinfoList) {
        message.validatorinfoList.push(Validators.fromJSON(e));
      }
    }
    if (
      object.standbypowerList !== undefined &&
      object.standbypowerList !== null
    ) {
      for (const e of object.standbypowerList) {
        message.standbypowerList.push(StandbyPower.fromJSON(e));
      }
    }
    if (
      object.feeCollectedList !== undefined &&
      object.feeCollectedList !== null
    ) {
      for (const e of object.feeCollectedList) {
        message.feeCollectedList.push(Coin.fromJSON(e));
      }
    }
    if (object.coinsQuota !== undefined && object.coinsQuota !== null) {
      message.coinsQuota = coinsQuota.fromJSON(object.coinsQuota);
    } else {
      message.coinsQuota = undefined;
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = Boolean(object.exported);
    } else {
      message.exported = false;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.outboundTxList) {
      obj.outboundTxList = message.outboundTxList.map((e) =>
        e ? OutboundTx.toJSON(e) : undefined
      );
    } else {
      obj.outboundTxList = [];
    }
    if (message.issueTokenList) {
      obj.issueTokenList = message.issueTokenList.map((e) =>
        e ? IssueToken.toJSON(e) : undefined
      );
    } else {
      obj.issueTokenList = [];
    }
    if (message.createPoolList) {
      obj.createPoolList = message.createPoolList.map((e) =>
        e ? CreatePool.toJSON(e) : undefined
      );
    } else {
      obj.createPoolList = [];
    }
    if (message.validatorinfoList) {
      obj.validatorinfoList = message.validatorinfoList.map((e) =>
        e ? Validators.toJSON(e) : undefined
      );
    } else {
      obj.validatorinfoList = [];
    }
    if (message.standbypowerList) {
      obj.standbypowerList = message.standbypowerList.map((e) =>
        e ? StandbyPower.toJSON(e) : undefined
      );
    } else {
      obj.standbypowerList = [];
    }
    if (message.feeCollectedList) {
      obj.feeCollectedList = message.feeCollectedList.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.feeCollectedList = [];
    }
    message.coinsQuota !== undefined &&
      (obj.coinsQuota = message.coinsQuota
        ? coinsQuota.toJSON(message.coinsQuota)
        : undefined);
    message.exported !== undefined && (obj.exported = message.exported);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.outboundTxList = [];
    message.issueTokenList = [];
    message.createPoolList = [];
    message.validatorinfoList = [];
    message.standbypowerList = [];
    message.feeCollectedList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.outboundTxList !== undefined && object.outboundTxList !== null) {
      for (const e of object.outboundTxList) {
        message.outboundTxList.push(OutboundTx.fromPartial(e));
      }
    }
    if (object.issueTokenList !== undefined && object.issueTokenList !== null) {
      for (const e of object.issueTokenList) {
        message.issueTokenList.push(IssueToken.fromPartial(e));
      }
    }
    if (object.createPoolList !== undefined && object.createPoolList !== null) {
      for (const e of object.createPoolList) {
        message.createPoolList.push(CreatePool.fromPartial(e));
      }
    }
    if (
      object.validatorinfoList !== undefined &&
      object.validatorinfoList !== null
    ) {
      for (const e of object.validatorinfoList) {
        message.validatorinfoList.push(Validators.fromPartial(e));
      }
    }
    if (
      object.standbypowerList !== undefined &&
      object.standbypowerList !== null
    ) {
      for (const e of object.standbypowerList) {
        message.standbypowerList.push(StandbyPower.fromPartial(e));
      }
    }
    if (
      object.feeCollectedList !== undefined &&
      object.feeCollectedList !== null
    ) {
      for (const e of object.feeCollectedList) {
        message.feeCollectedList.push(Coin.fromPartial(e));
      }
    }
    if (object.coinsQuota !== undefined && object.coinsQuota !== null) {
      message.coinsQuota = coinsQuota.fromPartial(object.coinsQuota);
    } else {
      message.coinsQuota = undefined;
    }
    if (object.exported !== undefined && object.exported !== null) {
      message.exported = object.exported;
    } else {
      message.exported = false;
    }
    return message;
  },
};

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
