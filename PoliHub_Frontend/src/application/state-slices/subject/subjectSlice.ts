import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Subject, SubjectState } from "./subjectSlice.types";

const initialState: SubjectState = {
    subjectToUpdate: {
        id: "",
        name: "",
        year: "",
        semester: "",
        department: "",
        creditsNo: "",
        description: "",
    }
}

export const subjectSlice = createSlice({
    name: "subject",
    initialState: initialState,
    reducers: {
        setSubjectToUpdate: (state, action: PayloadAction<Subject>) => {
            state.subjectToUpdate = action.payload
        },
    }
});

export const {
    setSubjectToUpdate,
} = subjectSlice.actions;

export const subjectReducer = subjectSlice.reducer; // Export the reducer.
