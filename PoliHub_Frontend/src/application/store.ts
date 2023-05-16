import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./state-slices";
import { subjectReducer } from "./state-slices";
import { laboratoryReducer } from "./state-slices";
import { courseReducer } from "./state-slices";

/** 
 *  This is the store to register each reduces with its own slice.
 */
export const store = configureStore({
  reducer: {
    profileReducer,
    subjectReducer,
    laboratoryReducer,
    courseReducer
  }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
