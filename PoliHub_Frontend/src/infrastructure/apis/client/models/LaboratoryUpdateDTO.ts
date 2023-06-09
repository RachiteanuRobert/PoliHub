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
 * @interface LaboratoryUpdateDTO
 */
export interface LaboratoryUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof LaboratoryUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof LaboratoryUpdateDTO
     */
    startTime?: number | null;
    /**
     * 
     * @type {number}
     * @memberof LaboratoryUpdateDTO
     */
    duration?: number | null;
    /**
     * 
     * @type {string}
     * @memberof LaboratoryUpdateDTO
     */
    location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LaboratoryUpdateDTO
     */
    assistantName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof LaboratoryUpdateDTO
     */
    subjectId?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LaboratoryUpdateDTO
     */
    laboratoryInstances?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof LaboratoryUpdateDTO
     */
    students?: Array<string> | null;
}

/**
 * Check if a given object implements the LaboratoryUpdateDTO interface.
 */
export function instanceOfLaboratoryUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LaboratoryUpdateDTOFromJSON(json: any): LaboratoryUpdateDTO {
    return LaboratoryUpdateDTOFromJSONTyped(json, false);
}

export function LaboratoryUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): LaboratoryUpdateDTO {
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
        'laboratoryInstances': !exists(json, 'laboratoryInstances') ? undefined : json['laboratoryInstances'],
        'students': !exists(json, 'students') ? undefined : json['students'],
    };
}

export function LaboratoryUpdateDTOToJSON(value?: LaboratoryUpdateDTO | null): any {
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
        'laboratoryInstances': value.laboratoryInstances,
        'students': value.students,
    };
}

