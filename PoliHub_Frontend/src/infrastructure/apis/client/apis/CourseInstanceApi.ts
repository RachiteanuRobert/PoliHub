/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BooleanRequestResponse,
  CourseInstanceAddDTO,
  CourseInstanceDTOPagedResponseRequestResponse,
  CourseInstanceDTORequestResponse,
  CourseInstanceUpdateDTO,
  RequestResponse,
  UserToCourseInstanceAddDTO,
} from '../models';
import {
    BooleanRequestResponseFromJSON,
    BooleanRequestResponseToJSON,
    CourseInstanceAddDTOFromJSON,
    CourseInstanceAddDTOToJSON,
    CourseInstanceDTOPagedResponseRequestResponseFromJSON,
    CourseInstanceDTOPagedResponseRequestResponseToJSON,
    CourseInstanceDTORequestResponseFromJSON,
    CourseInstanceDTORequestResponseToJSON,
    CourseInstanceUpdateDTOFromJSON,
    CourseInstanceUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
    UserToCourseInstanceAddDTOFromJSON,
    UserToCourseInstanceAddDTOToJSON,
} from '../models';

export interface ApiCourseInstanceAddPostRequest {
    courseInstanceAddDTO?: CourseInstanceAddDTO;
}

export interface ApiCourseInstanceAddUserToCourseInstancePostRequest {
    userToCourseInstanceAddDTO?: UserToCourseInstanceAddDTO;
}

export interface ApiCourseInstanceDeleteIdDeleteRequest {
    id: string;
}

export interface ApiCourseInstanceGetByIdIdGetRequest {
    id: string;
}

export interface ApiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGetRequest {
    courseInstanceId: string;
}

export interface ApiCourseInstanceGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiCourseInstanceUpdatePutRequest {
    courseInstanceUpdateDTO?: CourseInstanceUpdateDTO;
}

/**
 * 
 */
export class CourseInstanceApi extends runtime.BaseAPI {

    /**
     */
    async apiCourseInstanceAddPostRaw(requestParameters: ApiCourseInstanceAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CourseInstanceAddDTOToJSON(requestParameters.courseInstanceAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceAddPost(requestParameters: ApiCourseInstanceAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCourseInstanceAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceAddUserToCourseInstancePostRaw(requestParameters: ApiCourseInstanceAddUserToCourseInstancePostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/AddUserToCourseInstance`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserToCourseInstanceAddDTOToJSON(requestParameters.userToCourseInstanceAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceAddUserToCourseInstancePost(requestParameters: ApiCourseInstanceAddUserToCourseInstancePostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCourseInstanceAddUserToCourseInstancePostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceDeleteIdDeleteRaw(requestParameters: ApiCourseInstanceDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiCourseInstanceDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceDeleteIdDelete(requestParameters: ApiCourseInstanceDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCourseInstanceDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceGetByIdIdGetRaw(requestParameters: ApiCourseInstanceGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CourseInstanceDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiCourseInstanceGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CourseInstanceDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceGetByIdIdGet(requestParameters: ApiCourseInstanceGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseInstanceDTORequestResponse> {
        const response = await this.apiCourseInstanceGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGetRaw(requestParameters: ApiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BooleanRequestResponse>> {
        if (requestParameters.courseInstanceId === null || requestParameters.courseInstanceId === undefined) {
            throw new runtime.RequiredError('courseInstanceId','Required parameter requestParameters.courseInstanceId was null or undefined when calling apiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/GetIsUserInCourseInstance/{courseInstanceId}`.replace(`{${"courseInstanceId"}}`, encodeURIComponent(String(requestParameters.courseInstanceId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BooleanRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGet(requestParameters: ApiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BooleanRequestResponse> {
        const response = await this.apiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceGetPageGetRaw(requestParameters: ApiCourseInstanceGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CourseInstanceDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CourseInstanceDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceGetPageGet(requestParameters: ApiCourseInstanceGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CourseInstanceDTOPagedResponseRequestResponse> {
        const response = await this.apiCourseInstanceGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCourseInstanceUpdatePutRaw(requestParameters: ApiCourseInstanceUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/CourseInstance/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CourseInstanceUpdateDTOToJSON(requestParameters.courseInstanceUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCourseInstanceUpdatePut(requestParameters: ApiCourseInstanceUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCourseInstanceUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
