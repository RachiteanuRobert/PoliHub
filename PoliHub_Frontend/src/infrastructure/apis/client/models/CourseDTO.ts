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
 * @interface CourseDTO
 */
export interface CourseDTO {
    /**
     * 
     * @type {string}
     * @memberof CourseDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof CourseDTO
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof CourseDTO
     */
    duration?: number;
    /**
     * 
     * @type {string}
     * @memberof CourseDTO
     */
    location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CourseDTO
     */
    subjectId?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseDTO
     */
    courseInstances?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseDTO
     */
    students?: Array<string> | null;
}

/**
 * Check if a given object implements the CourseDTO interface.
 */
export function instanceOfCourseDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseDTOFromJSON(json: any): CourseDTO {
    return CourseDTOFromJSONTyped(json, false);
}

export function CourseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'location': !exists(json, 'location') ? undefined : json['location'],
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
        'courseInstances': !exists(json, 'courseInstances') ? undefined : json['courseInstances'],
        'students': !exists(json, 'students') ? undefined : json['students'],
    };
}

export function CourseDTOToJSON(value?: CourseDTO | null): any {
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
        'subjectId': value.subjectId,
        'courseInstances': value.courseInstances,
        'students': value.students,
    };
}

