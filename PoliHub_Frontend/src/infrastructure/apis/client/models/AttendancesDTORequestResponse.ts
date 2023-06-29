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
import type { AttendancesDTO } from './AttendancesDTO';
import {
    AttendancesDTOFromJSON,
    AttendancesDTOFromJSONTyped,
    AttendancesDTOToJSON,
} from './AttendancesDTO';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';

/**
 * 
 * @export
 * @interface AttendancesDTORequestResponse
 */
export interface AttendancesDTORequestResponse {
    /**
     * 
     * @type {AttendancesDTO}
     * @memberof AttendancesDTORequestResponse
     */
    response?: AttendancesDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof AttendancesDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the AttendancesDTORequestResponse interface.
 */
export function instanceOfAttendancesDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AttendancesDTORequestResponseFromJSON(json: any): AttendancesDTORequestResponse {
    return AttendancesDTORequestResponseFromJSONTyped(json, false);
}

export function AttendancesDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AttendancesDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : AttendancesDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function AttendancesDTORequestResponseToJSON(value?: AttendancesDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': AttendancesDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}
