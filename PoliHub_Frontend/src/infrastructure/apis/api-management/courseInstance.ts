import { useAppSelector } from "@application/store";
import {
    ApiCourseInstanceGetPageGetRequest,
    CourseInstanceAddDTO,
    CourseInstanceApi,
    CourseInstanceUpdateDTO,
    UserToCourseInstanceAddDTO
} from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getCourseInstancesQueryKey = "getCourseInstancesQuery";
const getCourseInstanceQueryKey = "getCourseInstanceQuery";
const getIsUserInCourseInstanceQueryKey = "getIsUserInCourseInstanceQuery"
const addUserToCourseInstanceMutationKey = "addUserToCourseInstanceMutation";
const addCourseInstanceMutationKey = "addCourseInstanceMutation";
const deleteCourseInstanceMutationKey = "deleteCourseInstanceMutation";
const updateCourseInstanceMutationKey = "updateCourseInstanceMutation";

/**
 * Returns an object with the callbacks that can be used for the React Query API, in this case to manage the CourseInstance API.
 */
export const useCourseInstanceApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getCourseInstances = (page: ApiCourseInstanceGetPageGetRequest) => new CourseInstanceApi(config).apiCourseInstanceGetPageGet(page); // Use the generated client code and adapt it.
    const getCourseInstance = (id: string) => new CourseInstanceApi(config).apiCourseInstanceGetByIdIdGet({ id });
    const getIsUserInCourseInstance = (courseInstanceId: string) => new CourseInstanceApi(config).apiCourseInstanceGetIsUserInCourseInstanceCourseInstanceIdGet({courseInstanceId});
    const addUserToCourseInstance = (courseInstanceUserIds: UserToCourseInstanceAddDTO) => new  CourseInstanceApi(config).apiCourseInstanceAddUserToCourseInstancePost({userToCourseInstanceAddDTO: courseInstanceUserIds});

    const addCourseInstance = (courseInstance: CourseInstanceAddDTO) => new CourseInstanceApi(config).apiCourseInstanceAddPost({ courseInstanceAddDTO: courseInstance });
    const updateCourseInstance = (courseInstance: CourseInstanceUpdateDTO) => new CourseInstanceApi(config).apiCourseInstanceUpdatePut({ courseInstanceUpdateDTO: courseInstance });

    const deleteCourseInstance = (id: string) => new CourseInstanceApi(config).apiCourseInstanceDeleteIdDelete({ id });

    return {
        getCourseInstances: { // Return the query object.
            key: getCourseInstancesQueryKey, // Add the key to identify the query.
            query: getCourseInstances // Add the query callback.
        },
        getCourseInstance: {
            key: getCourseInstanceQueryKey,
            query: getCourseInstance
        },
        getIsUserInCourseInstance: {
            key: getIsUserInCourseInstanceQueryKey,
            query: getIsUserInCourseInstance
        },
        addUserToCourseInstance: { // Return the mutation object.
            key: addUserToCourseInstanceMutationKey, // Add the key to identify the mutation.
            mutation: addUserToCourseInstance // Add the mutation callback.
        },
        addCourseInstance: { // Return the mutation object.
            key: addCourseInstanceMutationKey, // Add the key to identify the mutation.
            mutation: addCourseInstance // Add the mutation callback.
        },
        deleteCourseInstance: {
            key: deleteCourseInstanceMutationKey,
            mutation: deleteCourseInstance
        },
        updateCourseInstance: {
            key: updateCourseInstanceMutationKey,
            mutation: updateCourseInstance
        }
    }
}