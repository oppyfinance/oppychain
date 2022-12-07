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

export interface IncentivesActiveGaugesPerDenomResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesActiveGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
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

export interface IncentivesGaugeByIDResponse {
  gauge?: IncentivesGauge;
}

export interface IncentivesGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesModuleDistributedCoinsResponse {
  coins?: V1Beta1Coin[];
}

export interface IncentivesModuleToDistributeCoinsResponse {
  coins?: V1Beta1Coin[];
}

export type IncentivesMsgAddToGaugeResponse = object;

export type IncentivesMsgCreateGaugeResponse = object;

export interface IncentivesQueryLockableDurationsResponse {
  lockable_durations?: string[];
}

export interface IncentivesRewardsEstResponse {
  coins?: V1Beta1Coin[];
}

export interface IncentivesUpcomingGaugesPerDenomResponse {
  upcoming_gauges?: IncentivesGauge[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface IncentivesUpcomingGaugesResponse {
  data?: IncentivesGauge[];

  /** pagination defines an pagination for the response. */
  pagination?: V1Beta1PageResponse;
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

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /**
   * next_key is the key to be passed to PageRequest.key to
   * query the next page most efficiently
   * @format byte
   */
  next_key?: string;

  /**
   * total is total number of results available if PageRequest.count_total
   * was set, its value is undefined otherwise
   * @format uint64
   */
  total?: string;
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
 * @title incentives/gauge.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryActiveGauges
   * @summary returns active gauges
   * @request GET:/oppy/incentives/v1beta1/active_gauges
   */
  queryActiveGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesActiveGaugesResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/active_gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryActiveGaugesPerDenom
   * @summary returns active gauges per denom
   * @request GET:/oppy/incentives/v1beta1/active_gauges_per_denom
   */
  queryActiveGaugesPerDenom = (
    query?: {
      denom?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesActiveGaugesPerDenomResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/active_gauges_per_denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGaugeById
   * @summary returns Gauge by id
   * @request GET:/oppy/incentives/v1beta1/gauge_by_id/{id}
   */
  queryGaugeById = (id: string, params: RequestParams = {}) =>
    this.request<IncentivesGaugeByIDResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/gauge_by_id/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGauges
   * @summary returns gauges both upcoming and active
   * @request GET:/oppy/incentives/v1beta1/gauges
   */
  queryGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesGaugesResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryLockableDurations
   * @summary returns lockable durations that are valid to give incentives
   * @request GET:/oppy/incentives/v1beta1/lockable_durations
   */
  queryLockableDurations = (params: RequestParams = {}) =>
    this.request<IncentivesQueryLockableDurationsResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/lockable_durations`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleDistributedCoins
   * @summary returns coins that are distributed by module so far
   * @request GET:/oppy/incentives/v1beta1/module_distributed_coins
   */
  queryModuleDistributedCoins = (params: RequestParams = {}) =>
    this.request<IncentivesModuleDistributedCoinsResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/module_distributed_coins`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryModuleToDistributeCoins
   * @summary returns coins that is going to be distributed
   * @request GET:/oppy/incentives/v1beta1/module_to_distribute_coins
   */
  queryModuleToDistributeCoins = (params: RequestParams = {}) =>
    this.request<IncentivesModuleToDistributeCoinsResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/module_to_distribute_coins`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
 * No description
 * 
 * @tags Query
 * @name QueryRewardsEst
 * @summary RewardsEst returns an estimate of the rewards at a future specific time.
The querier either provides an address or a set of locks
for which they want to find the associated rewards.
 * @request GET:/oppy/incentives/v1beta1/rewards_est/{owner}
 */
  queryRewardsEst = (owner: string, query?: { lock_ids?: string[]; end_epoch?: string }, params: RequestParams = {}) =>
    this.request<IncentivesRewardsEstResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/rewards_est/${owner}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpcomingGauges
   * @summary returns scheduled gauges
   * @request GET:/oppy/incentives/v1beta1/upcoming_gauges
   */
  queryUpcomingGauges = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesUpcomingGaugesResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/upcoming_gauges`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryUpcomingGaugesPerDenom
   * @summary returns scheduled gauges per denom
   * @request GET:/oppy/incentives/v1beta1/upcoming_gauges_per_denom
   */
  queryUpcomingGaugesPerDenom = (
    query?: {
      denom?: string;
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<IncentivesUpcomingGaugesPerDenomResponse, RpcStatus>({
      path: `/oppy/incentives/v1beta1/upcoming_gauges_per_denom`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
