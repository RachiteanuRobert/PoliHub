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
import type { CourseSimpleDTO } from './CourseSimpleDTO';
import {
    CourseSimpleDTOFromJSON,
    CourseSimpleDTOFromJSONTyped,
    CourseSimpleDTOToJSON,
} from './CourseSimpleDTO';

/**
 * 
 * @export
 * @interface SubjectUpdateDTO
 */
export interface SubjectUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    year?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    professor?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    department?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectUpdateDTO
     */
    creditsNo?: string | null;
    /**
     * 
     * @type {CourseSimpleDTO}
     * @memberof SubjectUpdateDTO
     */
    course?: CourseSimpleDTO;
    /**
     * 
     * @type {Array<string>}
     * @memberof SubjectUpdateDTO
     */
    laboratories?: Array<string> | null;
}

/**
 * Check if a given object implements the SubjectUpdateDTO interface.
 */
export function instanceOfSubjectUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectUpdateDTOFromJSON(json: any): SubjectUpdateDTO {
    return SubjectUpdateDTOFromJSONTyped(json, false);
}

export function SubjectUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectUpdateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'professor': !exists(json, 'professor') ? undefined : json['professor'],
        'department': !exists(json, 'department') ? undefined : json['department'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'creditsNo': !exists(json, 'creditsNo') ? undefined : json['creditsNo'],
        'course': !exists(json, 'course') ? undefined : CourseSimpleDTOFromJSON(json['course']),
        'laboratories': !exists(json, 'laboratories') ? undefined : json['laboratories'],
    };
}

export function SubjectUpdateDTOToJSON(value?: SubjectUpdateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'year': value.year,
        'professor': value.professor,
        'department': value.department,
        'description': value.description,
        'creditsNo': value.creditsNo,
        'course': CourseSimpleDTOToJSON(value.course),
        'laboratories': value.laboratories,
    };
}

