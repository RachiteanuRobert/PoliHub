import { useAppSelector } from "@application/store";
import { ApiLaboratoryInstanceGetPageGetRequest, LaboratoryInstanceAddDTO, LaboratoryInstanceApi, LaboratoryInstanceUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getLaboratoryInstancesQueryKey = "getLaboratoryInstancesQuery";
const getLaboratoryInstanceQueryKey = "getLaboratoryInstanceQuery";
const addLaboratoryInstanceMutationKey = "addLaboratoryInstanceMutation";
const deleteLaboratoryInstanceMutationKey = "deleteLaboratoryInstanceMutation";
const updateLaboratoryInstanceMutationKey = "updateLaboratoryInstanceMutation";

/**
 * Returns an object with the callbacks that can be used for the React Query API, in this case to manage the LaboratoryInstance API.
 */
export const useLaboratoryInstanceApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getLaboratoryInstances = (page: ApiLaboratoryInstanceGetPageGetRequest) => new LaboratoryInstanceApi(config).apiLaboratoryInstanceGetPageGet(page); // Use the generated client code and adapt it.
    const getLaboratoryInstance = (id: string) => new LaboratoryInstanceApi(config).apiLaboratoryInstanceGetByIdIdGet({ id });
    const addLaboratoryInstance = (laboratoryInstance: LaboratoryInstanceAddDTO) => new LaboratoryInstanceApi(config).apiLaboratoryInstanceAddPost({ laboratoryInstanceAddDTO: laboratoryInstance });
    const updateLaboratoryInstance = (laboratoryInstance: LaboratoryInstanceUpdateDTO) => new LaboratoryInstanceApi(config).apiLaboratoryInstanceUpdatePut({ laboratoryInstanceUpdateDTO: laboratoryInstance });

    const deleteLaboratoryInstance = (id: string) => new LaboratoryInstanceApi(config).apiLaboratoryInstanceDeleteIdDelete({ id });

    return {
        getLaboratoryInstances: { // Return the query object.
            key: getLaboratoryInstancesQueryKey, // Add the key to identify the query.
            query: getLaboratoryInstances // Add the query callback.
        },
        getLaboratoryInstance: {
            key: getLaboratoryInstanceQueryKey,
            query: getLaboratoryInstance
        },
        addLaboratoryInstance: { // Return the mutation object.
            key: addLaboratoryInstanceMutationKey, // Add the key to identify the mutation.
            mutation: addLaboratoryInstance // Add the mutation callback.
        },
        deleteLaboratoryInstance: {
            key: deleteLaboratoryInstanceMutationKey,
            mutation: deleteLaboratoryInstance
        },
        updateLaboratoryInstance: {
            key: updateLaboratoryInstanceMutationKey,
            mutation: updateLaboratoryInstance
        }
    }
}