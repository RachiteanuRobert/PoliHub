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
  LoginDTO,
  LoginResponseDTORequestResponse,
  RequestResponse,
  UserAddDTO,
} from '../models';
import {
    LoginDTOFromJSON,
    LoginDTOToJSON,
    LoginResponseDTORequestResponseFromJSON,
    LoginResponseDTORequestResponseToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
    UserAddDTOFromJSON,
    UserAddDTOToJSON,
} from '../models';

export interface ApiAuthorizationLoginPostRequest {
    loginDTO?: LoginDTO;
}

export interface ApiAuthorizationRegisterPostRequest {
    userAddDTO?: UserAddDTO;
}

/**
 * 
 */
export class AuthorizationApi extends runtime.BaseAPI {

    /**
     */
    async apiAuthorizationLoginPostRaw(requestParameters: ApiAuthorizationLoginPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LoginResponseDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Authorization/Login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginDTOToJSON(requestParameters.loginDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LoginResponseDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAuthorizationLoginPost(requestParameters: ApiAuthorizationLoginPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LoginResponseDTORequestResponse> {
        const response = await this.apiAuthorizationLoginPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiAuthorizationRegisterPostRaw(requestParameters: ApiAuthorizationRegisterPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Authorization/Register`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UserAddDTOToJSON(requestParameters.userAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiAuthorizationRegisterPost(requestParameters: ApiAuthorizationRegisterPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiAuthorizationRegisterPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
