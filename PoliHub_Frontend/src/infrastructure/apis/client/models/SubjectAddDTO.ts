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
 * @interface SubjectAddDTO
 */
export interface SubjectAddDTO {
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    year?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    professor?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    department?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    creditsNo?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectAddDTO
     */
    description?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof SubjectAddDTO
     */
    laboratories?: Array<string> | null;
}

/**
 * Check if a given object implements the SubjectAddDTO interface.
 */
export function instanceOfSubjectAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectAddDTOFromJSON(json: any): SubjectAddDTO {
    return SubjectAddDTOFromJSONTyped(json, false);
}

export function SubjectAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'year': !exists(json, 'year') ? undefined : json['year'],
        'professor': !exists(json, 'professor') ? undefined : json['professor'],
        'department': !exists(json, 'department') ? undefined : json['department'],
        'creditsNo': !exists(json, 'creditsNo') ? undefined : json['creditsNo'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'laboratories': !exists(json, 'laboratories') ? undefined : json['laboratories'],
    };
}

export function SubjectAddDTOToJSON(value?: SubjectAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'year': value.year,
        'professor': value.professor,
        'department': value.department,
        'creditsNo': value.creditsNo,
        'description': value.description,
        'laboratories': value.laboratories,
    };
}

