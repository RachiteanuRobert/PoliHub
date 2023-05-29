import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CourseInstance, CourseInstanceState } from "./courseInstanceSlice.types";

const initialState: CourseInstanceState = {
    courseInstanceToUpdate: {
        id: "",
        name: "",
        description: "",
        courseInstanceDate: new Date(),
        courseId: ""
    }
}

export const courseInstanceSlice = createSlice({
    name: "courseInstance",
    initialState: initialState,
    reducers: {
        setCourseInstanceToUpdate: (state, action: PayloadAction<CourseInstance>) => {
            state.courseInstanceToUpdate = action.payload
        },
    }
});

export const {
    setCourseInstanceToUpdate,
} = courseInstanceSlice.actions;

export const courseInstanceReducer = courseInstanceSlice.reducer; // Export the reducer.
