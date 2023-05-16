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
 * @interface CourseAddDTO
 */
export interface CourseAddDTO {
    /**
     * 
     * @type {string}
     * @memberof CourseAddDTO
     */
    professorName?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CourseAddDTO
     */
    startTime?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CourseAddDTO
     */
    duration?: number;
    /**
     * 
     * @type {string}
     * @memberof CourseAddDTO
     */
    location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CourseAddDTO
     */
    series?: string | null;
    /**
     * 
     * @type {number}
     * @memberof CourseAddDTO
     */
    dayOfWeek?: number;
    /**
     * 
     * @type {string}
     * @memberof CourseAddDTO
     */
    subjectId?: string;
}

/**
 * Check if a given object implements the CourseAddDTO interface.
 */
export function instanceOfCourseAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseAddDTOFromJSON(json: any): CourseAddDTO {
    return CourseAddDTOFromJSONTyped(json, false);
}

export function CourseAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'professorName': !exists(json, 'professorName') ? undefined : json['professorName'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'location': !exists(json, 'location') ? undefined : json['location'],
        'series': !exists(json, 'series') ? undefined : json['series'],
        'dayOfWeek': !exists(json, 'dayOfWeek') ? undefined : json['dayOfWeek'],
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
    };
}

export function CourseAddDTOToJSON(value?: CourseAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'professorName': value.professorName,
        'startTime': value.startTime,
        'duration': value.duration,
        'location': value.location,
        'series': value.series,
        'dayOfWeek': value.dayOfWeek,
        'subjectId': value.subjectId,
    };
}
