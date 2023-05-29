import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LaboratoryInstance, LaboratoryInstanceState } from "./laboratoryInstanceSlice.types";

const initialState: LaboratoryInstanceState = {
    laboratoryInstanceToUpdate: {
        id: "",
        name: "",
        description: "",
        laboratoryInstanceDate: new Date(),
        laboratoryId: ""
    }
}

export const laboratoryInstanceSlice = createSlice({
    name: "laboratoryInstance",
    initialState: initialState,
    reducers: {
        setLaboratoryInstanceToUpdate: (state, action: PayloadAction<LaboratoryInstance>) => {
            state.laboratoryInstanceToUpdate = action.payload
        },
    }
});

export const {
    setLaboratoryInstanceToUpdate,
} = laboratoryInstanceSlice.actions;

export const laboratoryInstanceReducer = laboratoryInstanceSlice.reducer; // Export the reducer.
