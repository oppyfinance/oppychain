/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface QueryGaugeIdsResponseGaugeIdWithDuration {
  /** @format uint64 */
  gauge_id?: string;
  duration?: string;
}

export interface IncentivesGauge {
  /**
   * unique ID of a Gauge
   * @format uint64
   */
  id?: string;

  /**
   * flag to show if it's perpetual or multi-epoch
   * distribution incentives by third party
   */
  is_perpetual?: boolean;

  /**
   * Rewards are distributed to lockups that are are returned by at least one of
   * these queries
   */
  distribute_to?: LockupQueryCondition;

  /**
   * total amount of Coins that has been in the gauge.
   * can distribute multiple coins
   */
  coins?: V1Beta1Coin[];

  /**
   * distribution start time
   * @format date-time
   */
  start_time?: string;

  /**
   * number of epochs distribution will be done
   * @format uint64
   */
  num_epochs_paid_over?: string;

  /**
   * number of epochs distributed already
   * @format uint64
   */
  filled_epochs?: string;

  /** already distributed coins */
  distributed_coins?: V1Beta1Coin[];
}

export enum LockupLockQueryType {
  ByDuration = "ByDuration",
  ByTime = "ByTime",
}

export interface LockupQueryCondition {
  /** type of lock query, ByLockDuration | ByLockTime */
  lock_query_type?: LockupLockQueryType;

  /** What token denomination are we looking for lockups of */
  denom?: string;

  /** valid when query condition is ByDuration */
  duration?: string;

  /**
   * valid when query condition is ByTime
   * @format date-time
   */
  timestamp?: string;
}

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
}

export interface V1Beta1DistrInfo {
  total_weight?: string;
  records?: V1Beta1DistrRecord[];
}

export interface V1Beta1DistrRecord {
  /** @format uint64 */
  gauge_id?: string;
  weight?: string;
}

export interface V1Beta1IncentivizedPool {
  /** @format uint64 */
  pool_id?: string;
  lockable_duration?: string;

  /** @format uint64 */
  gauge_id?: string;
}

export interface V1Beta1Params {
  /**
   * minted_denom is the denomination of the coin expected to be minted by the
   * minting module. Pool-incentives module doesn’t actually mint the coin
   * itself, but rather manages the distribution of coins that matches the
   * defined minted_denom.
   */
  minted_denom?: string;
}

export interface V1Beta1QueryDistrInfoResponse {
  distr_info?: V1Beta1DistrInfo;
}

export interface V1Beta1QueryExternalIncentiveGaugesResponse {
  data?: IncentivesGauge[];
}

export interface V1Beta1QueryGaugeIdsResponse {
  gauge_ids_with_duration?: QueryGaugeIdsResponseGaugeIdWithDuration[];
}

export interface V1Beta1QueryIncentivizedPoolsResponse {
  incentivized_pools?: V1Beta1IncentivizedPool[];
}

export interface V1Beta1QueryLockableDurationsResponse {
  lockable_durations?: string[];
}

export interface V1Beta1QueryParamsResponse {
  params?: V1Beta1Params;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      requestParams.headers.common = { Accept: "*/*" };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title pool_incentives/v1beta1/genesis.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryDistrInfo
   * @request GET:/oppy/pool_incentives/v1beta1/distr_info
   */
  queryDistrInfo = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryDistrInfoResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/distr_info`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryExternalIncentiveGauges
   * @request GET:/oppy/pool_incentives/v1beta1/external_incentive_gauges
   */
  queryExternalIncentiveGauges = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryExternalIncentiveGaugesResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/external_incentive_gauges`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGaugeIds
   * @summary GaugeIds takes the pool id and returns the matching gauge ids and durations
   * @request GET:/oppy/pool_incentives/v1beta1/gauge-ids/{pool_id}
   */
  queryGaugeIds = (poolId: string, params: RequestParams = {}) =>
    this.request<V1Beta1QueryGaugeIdsResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/gauge-ids/${poolId}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIncentivizedPools
   * @request GET:/oppy/pool_incentives/v1beta1/incentivized_pools
   */
  queryIncentivizedPools = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryIncentivizedPoolsResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/incentivized_pools`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockableDurations
   * @request GET:/oppy/pool_incentives/v1beta1/lockable_durations
   */
  queryLockableDurations = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryLockableDurationsResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/lockable_durations`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryParams
   * @request GET:/oppy/pool_incentives/v1beta1/params
   */
  queryParams = (params: RequestParams = {}) =>
    this.request<V1Beta1QueryParamsResponse, RpcStatus>({
      path: `/oppy/pool_incentives/v1beta1/params`,
      method: "GET",
      format: "json",
      ...params,
    });
}
