import { useAppSelector } from "@application/store";
import { ApiLaboratoryGetPageGetRequest, LaboratoryAddDTO, LaboratoryApi, LaboratoryUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";

/**
 * Use constants to identify mutations and queries.
 */
const getLaboratoriesQueryKey = "getLaboratoriesQuery";
const getLaboratoryQueryKey = "getLaboratoryQuery";
const addLaboratoryMutationKey = "addLaboratoryMutation";
const deleteLaboratoryMutationKey = "deleteLaboratoryMutation";
const updateLaboratoryMutationKey = "updateLaboratoryMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the Laboratory API.
 */
export const useLaboratoryApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage.
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getLaboratories = (page: ApiLaboratoryGetPageGetRequest) => new LaboratoryApi(config).apiLaboratoryGetPageGet(page); // Use the generated client code and adapt it.
    const getLaboratory = (id: string) => new LaboratoryApi(config).apiLaboratoryGetByIdIdGet({ id });
    const addLaboratory = (laboratory: LaboratoryAddDTO) => new LaboratoryApi(config).apiLaboratoryAddPost({ laboratoryAddDTO: laboratory });
    const updateLaboratory = (laboratory: LaboratoryUpdateDTO) => new LaboratoryApi(config).apiLaboratoryUpdatePut({ laboratoryUpdateDTO: laboratory });

    const deleteLaboratory = (id: string) => new LaboratoryApi(config).apiLaboratoryDeleteIdDelete({ id });

    return {
        getLaboratories: { // Return the query object.
            key: getLaboratoriesQueryKey, // Add the key to identify the query.
            query: getLaboratories // Add the query callback.
        },
        getLaboratory: {
            key: getLaboratoryQueryKey,
            query: getLaboratory
        },
        addLaboratory: { // Return the mutation object.
            key: addLaboratoryMutationKey, // Add the key to identify the mutation.
            mutation: addLaboratory // Add the mutation callback.
        },
        deleteLaboratory: {
            key: deleteLaboratoryMutationKey,
            mutation: deleteLaboratory
        },
        updateLaboratory: {
            key: updateLaboratoryMutationKey,
            mutation: updateLaboratory
        }
    }
}