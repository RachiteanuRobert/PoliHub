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
 * @interface UserToLaboratoryAddDTO
 */
export interface UserToLaboratoryAddDTO {
    /**
     * 
     * @type {string}
     * @memberof UserToLaboratoryAddDTO
     */
    laboratoryId?: string;
    /**
     * 
     * @type {string}
     * @memberof UserToLaboratoryAddDTO
     */
    userId?: string;
}

/**
 * Check if a given object implements the UserToLaboratoryAddDTO interface.
 */
export function instanceOfUserToLaboratoryAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserToLaboratoryAddDTOFromJSON(json: any): UserToLaboratoryAddDTO {
    return UserToLaboratoryAddDTOFromJSONTyped(json, false);
}

export function UserToLaboratoryAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserToLaboratoryAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'laboratoryId': !exists(json, 'laboratoryId') ? undefined : json['laboratoryId'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function UserToLaboratoryAddDTOToJSON(value?: UserToLaboratoryAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'laboratoryId': value.laboratoryId,
        'userId': value.userId,
    };
}
