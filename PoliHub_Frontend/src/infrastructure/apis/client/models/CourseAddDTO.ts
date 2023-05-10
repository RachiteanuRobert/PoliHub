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
     * @type {number}
     * @memberof CourseAddDTO
     */
    startTime?: number;
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
    subjectId?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseAddDTO
     */
    courseInstances?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseAddDTO
     */
    students?: Array<string> | null;
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
        
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'location': !exists(json, 'location') ? undefined : json['location'],
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
        'courseInstances': !exists(json, 'courseInstances') ? undefined : json['courseInstances'],
        'students': !exists(json, 'students') ? undefined : json['students'],
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
        
        'startTime': value.startTime,
        'duration': value.duration,
        'location': value.location,
        'subjectId': value.subjectId,
        'courseInstances': value.courseInstances,
        'students': value.students,
    };
}

