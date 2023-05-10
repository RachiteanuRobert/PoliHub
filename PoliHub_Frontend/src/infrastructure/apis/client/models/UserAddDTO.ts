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
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
} from './UserRoleEnum';

/**
 * 
 * @export
 * @interface UserAddDTO
 */
export interface UserAddDTO {
    /**
     * 
     * @type {string}
     * @memberof UserAddDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserAddDTO
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserAddDTO
     */
    password?: string | null;
    /**
     * 
     * @type {UserRoleEnum}
     * @memberof UserAddDTO
     */
    role?: UserRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof UserAddDTO
     */
    group?: string | null;
}

/**
 * Check if a given object implements the UserAddDTO interface.
 */
export function instanceOfUserAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserAddDTOFromJSON(json: any): UserAddDTO {
    return UserAddDTOFromJSONTyped(json, false);
}

export function UserAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'role': !exists(json, 'role') ? undefined : UserRoleEnumFromJSON(json['role']),
        'group': !exists(json, 'group') ? undefined : json['group'],
    };
}

export function UserAddDTOToJSON(value?: UserAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'password': value.password,
        'role': UserRoleEnumToJSON(value.role),
        'group': value.group,
    };
}

