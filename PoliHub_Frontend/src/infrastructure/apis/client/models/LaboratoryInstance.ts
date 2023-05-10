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
import type { Laboratory } from './Laboratory';
import {
    LaboratoryFromJSON,
    LaboratoryFromJSONTyped,
    LaboratoryToJSON,
} from './Laboratory';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface LaboratoryInstance
 */
export interface LaboratoryInstance {
    /**
     * 
     * @type {string}
     * @memberof LaboratoryInstance
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof LaboratoryInstance
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof LaboratoryInstance
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof LaboratoryInstance
     */
    laboratoryId?: string;
    /**
     * 
     * @type {Date}
     * @memberof LaboratoryInstance
     */
    laboratoryInstanceDate?: Date;
    /**
     * 
     * @type {Laboratory}
     * @memberof LaboratoryInstance
     */
    laboratory?: Laboratory;
    /**
     * 
     * @type {Array<User>}
     * @memberof LaboratoryInstance
     */
    students?: Array<User> | null;
}

/**
 * Check if a given object implements the LaboratoryInstance interface.
 */
export function instanceOfLaboratoryInstance(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LaboratoryInstanceFromJSON(json: any): LaboratoryInstance {
    return LaboratoryInstanceFromJSONTyped(json, false);
}

export function LaboratoryInstanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): LaboratoryInstance {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'laboratoryId': !exists(json, 'laboratoryId') ? undefined : json['laboratoryId'],
        'laboratoryInstanceDate': !exists(json, 'laboratoryInstanceDate') ? undefined : (new Date(json['laboratoryInstanceDate'])),
        'laboratory': !exists(json, 'laboratory') ? undefined : LaboratoryFromJSON(json['laboratory']),
        'students': !exists(json, 'students') ? undefined : (json['students'] === null ? null : (json['students'] as Array<any>).map(UserFromJSON)),
    };
}

export function LaboratoryInstanceToJSON(value?: LaboratoryInstance | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'laboratoryId': value.laboratoryId,
        'laboratoryInstanceDate': value.laboratoryInstanceDate === undefined ? undefined : (value.laboratoryInstanceDate.toISOString().substr(0,10)),
        'laboratory': LaboratoryToJSON(value.laboratory),
        'students': value.students === undefined ? undefined : (value.students === null ? null : (value.students as Array<any>).map(UserToJSON)),
    };
}

