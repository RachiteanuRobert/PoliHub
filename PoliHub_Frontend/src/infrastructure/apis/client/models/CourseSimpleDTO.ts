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
 * @interface CourseSimpleDTO
 */
export interface CourseSimpleDTO {
    /**
     * 
     * @type {string}
     * @memberof CourseSimpleDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof CourseSimpleDTO
     */
    startTime?: number;
    /**
     * 
     * @type {number}
     * @memberof CourseSimpleDTO
     */
    duration?: number;
    /**
     * 
     * @type {string}
     * @memberof CourseSimpleDTO
     */
    location?: string | null;
    /**
     * 
<<<<<<< HEAD
     * @type {string}
     * @memberof CourseSimpleDTO
     */
    series?: string | null;
    /**
     * 
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
     * @type {string}
     * @memberof CourseSimpleDTO
     */
    subjectId?: string;
}

/**
 * Check if a given object implements the CourseSimpleDTO interface.
 */
export function instanceOfCourseSimpleDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseSimpleDTOFromJSON(json: any): CourseSimpleDTO {
    return CourseSimpleDTOFromJSONTyped(json, false);
}

export function CourseSimpleDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseSimpleDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'startTime': !exists(json, 'startTime') ? undefined : json['startTime'],
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'location': !exists(json, 'location') ? undefined : json['location'],
<<<<<<< HEAD
<<<<<<< HEAD
        'dayOfWeek': !exists(json, 'dayOfWeek') ? undefined : json['dayOfWeek'],
        'series': !exists(json, 'series') ? undefined : json['series'],
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
    };
}

export function CourseSimpleDTOToJSON(value?: CourseSimpleDTO | null): any {
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
<<<<<<< HEAD
<<<<<<< HEAD
        'dayOfWeek': value.dayOfWeek,
        'series': value.series,
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
=======
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
        'subjectId': value.subjectId,
    };
}

