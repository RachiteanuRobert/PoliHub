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
import type { CourseDTOPagedResponse } from './CourseDTOPagedResponse';
import {
    CourseDTOPagedResponseFromJSON,
    CourseDTOPagedResponseFromJSONTyped,
    CourseDTOPagedResponseToJSON,
} from './CourseDTOPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface CourseDTOPagedResponseRequestResponse
 */
export interface CourseDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {CourseDTOPagedResponse}
     * @memberof CourseDTOPagedResponseRequestResponse
     */
    response?: CourseDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof CourseDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the CourseDTOPagedResponseRequestResponse interface.
 */
export function instanceOfCourseDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseDTOPagedResponseRequestResponseFromJSON(json: any): CourseDTOPagedResponseRequestResponse {
    return CourseDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function CourseDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : CourseDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function CourseDTOPagedResponseRequestResponseToJSON(value?: CourseDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': CourseDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

