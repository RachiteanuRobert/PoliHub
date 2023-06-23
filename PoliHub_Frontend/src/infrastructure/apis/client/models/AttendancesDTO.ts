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
import type { CourseInstanceAttendanceDTO } from './CourseInstanceAttendanceDTO';
import {
    CourseInstanceAttendanceDTOFromJSON,
    CourseInstanceAttendanceDTOFromJSONTyped,
    CourseInstanceAttendanceDTOToJSON,
} from './CourseInstanceAttendanceDTO';
import type { LaboratoryInstanceAttendanceDTO } from './LaboratoryInstanceAttendanceDTO';
import {
    LaboratoryInstanceAttendanceDTOFromJSON,
    LaboratoryInstanceAttendanceDTOFromJSONTyped,
    LaboratoryInstanceAttendanceDTOToJSON,
} from './LaboratoryInstanceAttendanceDTO';

/**
 * 
 * @export
 * @interface AttendancesDTO
 */
export interface AttendancesDTO {
    /**
     * 
     * @type {string}
     * @memberof AttendancesDTO
     */
    id?: string;
    /**
     * 
     * @type {Array<CourseInstanceAttendanceDTO>}
     * @memberof AttendancesDTO
     */
    courseInstances?: Array<CourseInstanceAttendanceDTO> | null;
    /**
     * 
     * @type {Array<LaboratoryInstanceAttendanceDTO>}
     * @memberof AttendancesDTO
     */
    laboratoryInstances?: Array<LaboratoryInstanceAttendanceDTO> | null;
}

/**
 * Check if a given object implements the AttendancesDTO interface.
 */
export function instanceOfAttendancesDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AttendancesDTOFromJSON(json: any): AttendancesDTO {
    return AttendancesDTOFromJSONTyped(json, false);
}

export function AttendancesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AttendancesDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'courseInstances': !exists(json, 'courseInstances') ? undefined : (json['courseInstances'] === null ? null : (json['courseInstances'] as Array<any>).map(CourseInstanceAttendanceDTOFromJSON)),
        'laboratoryInstances': !exists(json, 'laboratoryInstances') ? undefined : (json['laboratoryInstances'] === null ? null : (json['laboratoryInstances'] as Array<any>).map(LaboratoryInstanceAttendanceDTOFromJSON)),
    };
}

export function AttendancesDTOToJSON(value?: AttendancesDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'courseInstances': value.courseInstances === undefined ? undefined : (value.courseInstances === null ? null : (value.courseInstances as Array<any>).map(CourseInstanceAttendanceDTOToJSON)),
        'laboratoryInstances': value.laboratoryInstances === undefined ? undefined : (value.laboratoryInstances === null ? null : (value.laboratoryInstances as Array<any>).map(LaboratoryInstanceAttendanceDTOToJSON)),
    };
}

