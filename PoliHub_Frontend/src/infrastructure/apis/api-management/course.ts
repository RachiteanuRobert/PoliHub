import { useAppSelector } from "@application/store";
import { ApiCourseGetPageGetRequest, CourseAddDTO, CourseApi, CourseUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getCoursesQueryKey = "getCoursesQuery";
const getCourseQueryKey = "getCourseQuery";
const addCourseMutationKey = "addCourseMutation";
const deleteCourseMutationKey = "deleteCourseMutation";
const updateCourseMutationKey = "updateCourseMutation";

/**
 * Returns an object with the callbacks that can be used for the React Query API, in this case to manage the Course API.
 */
export const useCourseApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getCourses = (page: ApiCourseGetPageGetRequest) => new CourseApi(config).apiCourseGetPageGet(page); // Use the generated client code and adapt it.
    const getCourse = (id: string) => new CourseApi(config).apiCourseGetByIdIdGet({ id });
    const addCourse = (course: CourseAddDTO) => new CourseApi(config).apiCourseAddPost({ courseAddDTO: course });
    const updateCourse = (course: CourseUpdateDTO) => new CourseApi(config).apiCourseUpdatePut({ courseUpdateDTO: course });

    const deleteCourse = (id: string) => new CourseApi(config).apiCourseDeleteIdDelete({ id });

    return {
        getCourses: { // Return the query object.
            key: getCoursesQueryKey, // Add the key to identify the query.
            query: getCourses // Add the query callback.
        },
        getCourse: {
            key: getCourseQueryKey,
            query: getCourse
        },
        addCourse: { // Return the mutation object.
            key: addCourseMutationKey, // Add the key to identify the mutation.
            mutation: addCourse // Add the mutation callback.
        },
        deleteCourse: {
            key: deleteCourseMutationKey,
            mutation: deleteCourse
        },
        updateCourse: {
            key: updateCourseMutationKey,
            mutation: updateCourse
        }
    }
}