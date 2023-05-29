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
import type { CourseInstanceDTOPagedResponse } from './CourseInstanceDTOPagedResponse';
import {
    CourseInstanceDTOPagedResponseFromJSON,
    CourseInstanceDTOPagedResponseFromJSONTyped,
    CourseInstanceDTOPagedResponseToJSON,
} from './CourseInstanceDTOPagedResponse';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface CourseInstanceDTOPagedResponseRequestResponse
 */
export interface CourseInstanceDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {CourseInstanceDTOPagedResponse}
     * @memberof CourseInstanceDTOPagedResponseRequestResponse
     */
    response?: CourseInstanceDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof CourseInstanceDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the CourseInstanceDTOPagedResponseRequestResponse interface.
 */
export function instanceOfCourseInstanceDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseInstanceDTOPagedResponseRequestResponseFromJSON(json: any): CourseInstanceDTOPagedResponseRequestResponse {
    return CourseInstanceDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function CourseInstanceDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseInstanceDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : CourseInstanceDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function CourseInstanceDTOPagedResponseRequestResponseToJSON(value?: CourseInstanceDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': CourseInstanceDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

