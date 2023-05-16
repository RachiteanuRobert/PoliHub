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
import type { Course } from './Course';
import {
    CourseFromJSON,
    CourseFromJSONTyped,
    CourseToJSON,
} from './Course';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './User';

/**
 * 
 * @export
 * @interface CourseInstance
 */
export interface CourseInstance {
    /**
     * 
     * @type {string}
     * @memberof CourseInstance
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof CourseInstance
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CourseInstance
     */
    updatedAt?: Date;
    /**
     * 
     * @type {Course}
     * @memberof CourseInstance
     */
    course?: Course;
    /**
     * 
     * @type {string}
     * @memberof CourseInstance
     */
    courseId?: string;
    /**
     * 
     * @type {Date}
     * @memberof CourseInstance
     */
    courseInstanceDate?: Date;
    /**
     * 
     * @type {Array<User>}
     * @memberof CourseInstance
     */
    students?: Array<User> | null;
}

/**
 * Check if a given object implements the CourseInstance interface.
 */
export function instanceOfCourseInstance(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CourseInstanceFromJSON(json: any): CourseInstance {
    return CourseInstanceFromJSONTyped(json, false);
}

export function CourseInstanceFromJSONTyped(json: any, ignoreDiscriminator: boolean): CourseInstance {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'course': !exists(json, 'course') ? undefined : CourseFromJSON(json['course']),
        'courseId': !exists(json, 'courseId') ? undefined : json['courseId'],
        'courseInstanceDate': !exists(json, 'courseInstanceDate') ? undefined : (new Date(json['courseInstanceDate'])),
        'students': !exists(json, 'students') ? undefined : (json['students'] === null ? null : (json['students'] as Array<any>).map(UserFromJSON)),
    };
}

export function CourseInstanceToJSON(value?: CourseInstance | null): any {
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
        'course': CourseToJSON(value.course),
        'courseId': value.courseId,
        'courseInstanceDate': value.courseInstanceDate === undefined ? undefined : (value.courseInstanceDate.toISOString()),
        'students': value.students === undefined ? undefined : (value.students === null ? null : (value.students as Array<any>).map(UserToJSON)),
    };
}

