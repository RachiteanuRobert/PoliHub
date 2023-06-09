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
import type { CourseInstanceDTO } from './CourseInstanceDTO';
import {
    CourseInstanceDTOFromJSON,
    CourseInstanceDTOFromJSONTyped,
    CourseInstanceDTOToJSON,
} from './CourseInstanceDTO';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface CourseInstanceDTORequestResponse
 */
export interface CourseInstanceDTORequestResponse {
    /**
     * 
     * @type {CourseInstanceDTO}
     * @memberof CourseInstanceDTORequestResponse
     */
    response?: CourseInstanceDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof CourseInstanceDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the CourseInstanceDTORequestResponse interface.
 */
export function instanceOfCourseInstanceDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseInstanceDTORequestResponseFromJSON(json: any): CourseInstanceDTORequestResponse {
    return CourseInstanceDTORequestResponseFromJSONTyped(json, false);
}

export function CourseInstanceDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseInstanceDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : CourseInstanceDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function CourseInstanceDTORequestResponseToJSON(value?: CourseInstanceDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': CourseInstanceDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

