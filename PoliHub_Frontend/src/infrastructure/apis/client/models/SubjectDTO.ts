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
<<<<<<< HEAD
import type { UserSimpleDTO } from './UserSimpleDTO';
import {
    UserSimpleDTOFromJSON,
    UserSimpleDTOFromJSONTyped,
    UserSimpleDTOToJSON,
} from './UserSimpleDTO';
=======
import type { LaboratorySimpleDTO } from './LaboratorySimpleDTO';
import {
    LaboratorySimpleDTOFromJSON,
    LaboratorySimpleDTOFromJSONTyped,
    LaboratorySimpleDTOToJSON,
} from './LaboratorySimpleDTO';
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)

/**
 * 
 * @export
 * @interface SubjectDTO
 */
export interface SubjectDTO {
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    year?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    professor?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    department?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    creditsNo?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    description?: string | null;
    /**
     * 
     * @type {CourseSimpleDTO}
     * @memberof SubjectDTO
     */
<<<<<<< HEAD
    courses?: Array<CourseSimpleDTO> | null;
    /**
     * 
     * @type {Array<UserSimpleDTO>}
     * @memberof SubjectDTO
     */
    students?: Array<UserSimpleDTO> | null;
=======
    course?: CourseSimpleDTO;
    /**
     * 
     * @type {Array<LaboratorySimpleDTO>}
     * @memberof SubjectDTO
     */
    laboratories?: Array<LaboratorySimpleDTO> | null;
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
}

/**
 * Check if a given object implements the SubjectDTO interface.
 */
export function instanceOfSubjectDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectDTOFromJSON(json: any): SubjectDTO {
    return SubjectDTOFromJSONTyped(json, false);
}

export function SubjectDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'professor': !exists(json, 'professor') ? undefined : json['professor'],
        'department': !exists(json, 'department') ? undefined : json['department'],
        'creditsNo': !exists(json, 'creditsNo') ? undefined : json['creditsNo'],
        'description': !exists(json, 'description') ? undefined : json['description'],
<<<<<<< HEAD
        'courses': !exists(json, 'courses') ? undefined : (json['courses'] === null ? null : (json['courses'] as Array<any>).map(CourseSimpleDTOFromJSON)),
        'students': !exists(json, 'students') ? undefined : (json['students'] === null ? null : (json['students'] as Array<any>).map(UserSimpleDTOFromJSON)),
=======
        'course': !exists(json, 'course') ? undefined : CourseSimpleDTOFromJSON(json['course']),
        'laboratories': !exists(json, 'laboratories') ? undefined : (json['laboratories'] === null ? null : (json['laboratories'] as Array<any>).map(LaboratorySimpleDTOFromJSON)),
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
    };
}

export function SubjectDTOToJSON(value?: SubjectDTO | null): any {
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
        'creditsNo': value.creditsNo,
        'description': value.description,
<<<<<<< HEAD
        'courses': value.courses === undefined ? undefined : (value.courses === null ? null : (value.courses as Array<any>).map(CourseSimpleDTOToJSON)),
        'students': value.students === undefined ? undefined : (value.students === null ? null : (value.students as Array<any>).map(UserSimpleDTOToJSON)),
=======
        'course': CourseSimpleDTOToJSON(value.course),
        'laboratories': value.laboratories === undefined ? undefined : (value.laboratories === null ? null : (value.laboratories as Array<any>).map(LaboratorySimpleDTOToJSON)),
>>>>>>> parent of 6434a11 (Subject, Course, Laboratory Forms and Tables)
    };
}

