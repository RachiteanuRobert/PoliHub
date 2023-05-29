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
import type { LaboratorySimpleDTO } from './LaboratorySimpleDTO';
import {
    LaboratorySimpleDTOFromJSON,
    LaboratorySimpleDTOFromJSONTyped,
    LaboratorySimpleDTOToJSON,
} from './LaboratorySimpleDTO';

/**
 * 
 * @export
 * @interface JoinUserSimpleLaboratoryDTO
 */
export interface JoinUserSimpleLaboratoryDTO {
    /**
     * 
     * @type {string}
     * @memberof JoinUserSimpleLaboratoryDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof JoinUserSimpleLaboratoryDTO
     */
    laboratoryId?: string;
    /**
     * 
     * @type {LaboratorySimpleDTO}
     * @memberof JoinUserSimpleLaboratoryDTO
     */
    laboratory?: LaboratorySimpleDTO;
}

/**
 * Check if a given object implements the JoinUserSimpleLaboratoryDTO interface.
 */
export function instanceOfJoinUserSimpleLaboratoryDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function JoinUserSimpleLaboratoryDTOFromJSON(json: any): JoinUserSimpleLaboratoryDTO {
    return JoinUserSimpleLaboratoryDTOFromJSONTyped(json, false);
}

export function JoinUserSimpleLaboratoryDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): JoinUserSimpleLaboratoryDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'laboratoryId': !exists(json, 'laboratoryId') ? undefined : json['laboratoryId'],
        'laboratory': !exists(json, 'laboratory') ? undefined : LaboratorySimpleDTOFromJSON(json['laboratory']),
    };
}

export function JoinUserSimpleLaboratoryDTOToJSON(value?: JoinUserSimpleLaboratoryDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'laboratoryId': value.laboratoryId,
        'laboratory': LaboratorySimpleDTOToJSON(value.laboratory),
    };
}

