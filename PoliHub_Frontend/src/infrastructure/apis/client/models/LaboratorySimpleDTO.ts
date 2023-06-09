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
/**
 * 
 * @export
 * @interface LaboratorySimpleDTO
 */
export interface LaboratorySimpleDTO {
    /**
     * 
     * @type {string}
     * @memberof LaboratorySimpleDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof LaboratorySimpleDTO
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof LaboratorySimpleDTO
     */
    duration?: number;
    /**
     * 
     * @type {string}
     * @memberof LaboratorySimpleDTO
     */
    location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LaboratorySimpleDTO
     */
    assistantName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LaboratorySimpleDTO
     */
    subjectId?: string;
}

/**
 * Check if a given object implements the LaboratorySimpleDTO interface.
 */
export function instanceOfLaboratorySimpleDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LaboratorySimpleDTOFromJSON(json: any): LaboratorySimpleDTO {
    return LaboratorySimpleDTOFromJSONTyped(json, false);
}

export function LaboratorySimpleDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): LaboratorySimpleDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'location': !exists(json, 'location') ? undefined : json['location'],
        'assistantName': !exists(json, 'assistantName') ? undefined : json['assistantName'],
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
    };
}

export function LaboratorySimpleDTOToJSON(value?: LaboratorySimpleDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'startTime': value.startTime,
        'duration': value.duration,
        'location': value.location,
        'assistantName': value.assistantName,
        'subjectId': value.subjectId,
    };
}

