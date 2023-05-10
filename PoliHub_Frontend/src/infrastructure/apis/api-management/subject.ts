import { useAppSelector } from "@application/store";
import { ApiSubjectGetPageGetRequest, SubjectAddDTO, SubjectApi, SubjectUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getSubjectsQueryKey = "getSubjectsQuery";
const getSubjectQueryKey = "getSubjectQuery";
const addSubjectMutationKey = "addSubjectMutation";
const deleteSubjectMutationKey = "deleteSubjectMutation";
const updateSubjectMutationKey = "updateSubjectMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the subject API.
 */
export const useSubjectApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getSubjects = (page: ApiSubjectGetPageGetRequest) => new SubjectApi(config).apiSubjectGetPageGet(page); // Use the generated client code and adapt it.
    const getSubject = (id: string) => new SubjectApi(config).apiSubjectGetByIdIdGet({ id });
    const addSubject = (subject: SubjectAddDTO) => new SubjectApi(config).apiSubjectAddPost({ subjectAddDTO: subject });
    const deleteSubject = (id: string) => new SubjectApi(config).apiSubjectDeleteIdDelete({ id });
    const updateSubject = (subject: SubjectUpdateDTO) => new SubjectApi(config).apiSubjectUpdatePut({ subjectUpdateDTO: subject });

    return {
        getSubjects: { // Return the query object.
            key: getSubjectsQueryKey, // Add the key to identify the query.
            query: getSubjects // Add the query callback.
        },
        getSubject: {
            key: getSubjectQueryKey,
            query: getSubject
        },
        addSubject: { // Return the mutation object.
            key: addSubjectMutationKey, // Add the key to identify the mutation.
            mutation: addSubject // Add the mutation callback.
        },
        deleteSubject: {
            key: deleteSubjectMutationKey,
            mutation: deleteSubject
        },
        updateSubject: {
            key: updateSubjectMutationKey,
            mutation: updateSubject
        }
    }
}