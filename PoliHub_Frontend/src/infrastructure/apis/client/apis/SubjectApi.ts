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
  RequestResponse,
  SubjectAddDTO,
  SubjectDTORequestResponse,
  SubjectUpdateDTO,
} from '../models';
import {
    RequestResponseFromJSON,
    RequestResponseToJSON,
    SubjectAddDTOFromJSON,
    SubjectAddDTOToJSON,
    SubjectDTORequestResponseFromJSON,
    SubjectDTORequestResponseToJSON,
    SubjectUpdateDTOFromJSON,
    SubjectUpdateDTOToJSON,
} from '../models';

export interface ApiSubjectAddPostRequest {
    subjectAddDTO?: SubjectAddDTO;
}

export interface ApiSubjectDeleteIdDeleteRequest {
    id: string;
}

export interface ApiSubjectGetByIdIdGetRequest {
    id: string;
}

export interface ApiSubjectGetByNameIdGetRequest {
    subjectName: string;
    id: string;
}

export interface ApiSubjectUpdatePutRequest {
    subjectUpdateDTO?: SubjectUpdateDTO;
}

/**
 * 
 */
export class SubjectApi extends runtime.BaseAPI {

    /**
     */
    async apiSubjectAddPostRaw(requestParameters: ApiSubjectAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Subject/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SubjectAddDTOToJSON(requestParameters.subjectAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiSubjectAddPost(requestParameters: ApiSubjectAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiSubjectAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiSubjectDeleteIdDeleteRaw(requestParameters: ApiSubjectDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiSubjectDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Subject/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiSubjectDeleteIdDelete(requestParameters: ApiSubjectDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiSubjectDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiSubjectGetByIdIdGetRaw(requestParameters: ApiSubjectGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubjectDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiSubjectGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Subject/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubjectDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiSubjectGetByIdIdGet(requestParameters: ApiSubjectGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubjectDTORequestResponse> {
        const response = await this.apiSubjectGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiSubjectGetByNameIdGetRaw(requestParameters: ApiSubjectGetByNameIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SubjectDTORequestResponse>> {
        if (requestParameters.subjectName === null || requestParameters.subjectName === undefined) {
            throw new runtime.RequiredError('subjectName','Required parameter requestParameters.subjectName was null or undefined when calling apiSubjectGetByNameIdGet.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiSubjectGetByNameIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Subject/GetByName/{id}`.replace(`{${"subjectName"}}`, encodeURIComponent(String(requestParameters.subjectName))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SubjectDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiSubjectGetByNameIdGet(requestParameters: ApiSubjectGetByNameIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SubjectDTORequestResponse> {
        const response = await this.apiSubjectGetByNameIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiSubjectUpdatePutRaw(requestParameters: ApiSubjectUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Subject/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: SubjectUpdateDTOToJSON(requestParameters.subjectUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiSubjectUpdatePut(requestParameters: ApiSubjectUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiSubjectUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
