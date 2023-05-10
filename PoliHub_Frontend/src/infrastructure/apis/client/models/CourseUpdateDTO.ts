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
 * @interface CourseUpdateDTO
 */
export interface CourseUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof CourseUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof CourseUpdateDTO
     */
    startTime?: number | null;
    /**
     * 
     * @type {number}
     * @memberof CourseUpdateDTO
     */
    duration?: number | null;
    /**
     * 
     * @type {string}
     * @memberof CourseUpdateDTO
     */
    location?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CourseUpdateDTO
     */
    subjectId?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseUpdateDTO
     */
    courseInstances?: Array<string> | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseUpdateDTO
     */
    students?: Array<string> | null;
}

/**
 * Check if a given object implements the CourseUpdateDTO interface.
 */
export function instanceOfCourseUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseUpdateDTOFromJSON(json: any): CourseUpdateDTO {
    return CourseUpdateDTOFromJSONTyped(json, false);
}

export function CourseUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseUpdateDTO {
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

export function CourseUpdateDTOToJSON(value?: CourseUpdateDTO | null): any {
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

