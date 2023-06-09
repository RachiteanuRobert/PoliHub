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
import type { LaboratoryInstanceDTO } from './LaboratoryInstanceDTO';
import {
    LaboratoryInstanceDTOFromJSON,
    LaboratoryInstanceDTOFromJSONTyped,
    LaboratoryInstanceDTOToJSON,
} from './LaboratoryInstanceDTO';

/**
 * 
 * @export
 * @interface LaboratoryInstanceDTORequestResponse
 */
export interface LaboratoryInstanceDTORequestResponse {
    /**
     * 
     * @type {LaboratoryInstanceDTO}
     * @memberof LaboratoryInstanceDTORequestResponse
     */
    response?: LaboratoryInstanceDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof LaboratoryInstanceDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the LaboratoryInstanceDTORequestResponse interface.
 */
export function instanceOfLaboratoryInstanceDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LaboratoryInstanceDTORequestResponseFromJSON(json: any): LaboratoryInstanceDTORequestResponse {
    return LaboratoryInstanceDTORequestResponseFromJSONTyped(json, false);
}

export function LaboratoryInstanceDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LaboratoryInstanceDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : LaboratoryInstanceDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function LaboratoryInstanceDTORequestResponseToJSON(value?: LaboratoryInstanceDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': LaboratoryInstanceDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

