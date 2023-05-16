import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Laboratory, LaboratoryState } from "./laboratorySlice.types";

const initialState: LaboratoryState = {
    laboratoryToUpdate: {
        id: "",
        assistantName: "",
        startTime: "",
        duration: 0,
        location: "",
        dayOfWeek: 0,
        courseId: ""
    }
}

export const laboratorySlice = createSlice({
    name: "laboratory",
    initialState: initialState,
    reducers: {
        setLaboratoryToUpdate: (state, action: PayloadAction<Laboratory>) => {
            state.laboratoryToUpdate = action.payload
        },
    }
});

export const {
    setLaboratoryToUpdate,
} = laboratorySlice.actions;

export const laboratoryReducer = laboratorySlice.reducer; // Export the reducer.
