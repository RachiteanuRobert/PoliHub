import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Course, CourseState } from "./courseSlice.types";

const initialState: CourseState = {
    courseToUpdate: {
        id: "",
        professorName: "",
        startTime: "",
        duration: 0,
        location: "",
        series: "",
        dayOfWeek: 0,
        subjectId: ""
    }
}

export const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        setCourseToUpdate: (state, action: PayloadAction<Course>) => {
            state.courseToUpdate = action.payload
        },
    }
});

export const {
    setCourseToUpdate,
} = courseSlice.actions;

export const courseReducer = courseSlice.reducer; // Export the reducer.
