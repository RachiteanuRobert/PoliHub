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


/**
 * 
 * @export
 */
export const UserRoleEnum = {
    Admin: 'Admin',
    Personnel: 'Personnel',
    Client: 'Client',
    Student: 'Student'
} as const;
export type UserRoleEnum = typeof UserRoleEnum[keyof typeof UserRoleEnum];


export function UserRoleEnumFromJSON(json: any): UserRoleEnum {
    return UserRoleEnumFromJSONTyped(json, false);
}

export function UserRoleEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRoleEnum {
    return json as UserRoleEnum;
}

export function UserRoleEnumToJSON(value?: UserRoleEnum | null): any {
    return value as any;
}

