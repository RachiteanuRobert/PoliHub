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
 * @interface CourseInstanceUpdateDTO
 */
export interface CourseInstanceUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof CourseInstanceUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof CourseInstanceUpdateDTO
     */
    courseId?: string;
    /**
     * 
     * @type {Date}
     * @memberof CourseInstanceUpdateDTO
     */
    courseInstanceDate?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof CourseInstanceUpdateDTO
     */
    students?: Array<string> | null;
}

/**
 * Check if a given object implements the CourseInstanceUpdateDTO interface.
 */
export function instanceOfCourseInstanceUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseInstanceUpdateDTOFromJSON(json: any): CourseInstanceUpdateDTO {
    return CourseInstanceUpdateDTOFromJSONTyped(json, false);
}

export function CourseInstanceUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseInstanceUpdateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'courseId': !exists(json, 'courseId') ? undefined : json['courseId'],
        'courseInstanceDate': !exists(json, 'courseInstanceDate') ? undefined : (new Date(json['courseInstanceDate'])),
        'students': !exists(json, 'students') ? undefined : json['students'],
    };
}

export function CourseInstanceUpdateDTOToJSON(value?: CourseInstanceUpdateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'courseId': value.courseId,
        'courseInstanceDate': value.courseInstanceDate === undefined ? undefined : (value.courseInstanceDate.toISOString()),
        'students': value.students,
    };
}
