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

import { exists, mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { LaboratoryDTOPagedResponse } from './LaboratoryDTOPagedResponse';
import {
    LaboratoryDTOPagedResponseFromJSON,
    LaboratoryDTOPagedResponseFromJSONTyped,
    LaboratoryDTOPagedResponseToJSON,
} from './LaboratoryDTOPagedResponse';

/**
 * 
 * @export
 * @interface LaboratoryDTOPagedResponseRequestResponse
 */
export interface LaboratoryDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {LaboratoryDTOPagedResponse}
     * @memberof LaboratoryDTOPagedResponseRequestResponse
     */
    response?: LaboratoryDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof LaboratoryDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the LaboratoryDTOPagedResponseRequestResponse interface.
 */
export function instanceOfLaboratoryDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LaboratoryDTOPagedResponseRequestResponseFromJSON(json: any): LaboratoryDTOPagedResponseRequestResponse {
    return LaboratoryDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function LaboratoryDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LaboratoryDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : LaboratoryDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function LaboratoryDTOPagedResponseRequestResponseToJSON(value?: LaboratoryDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': LaboratoryDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}
