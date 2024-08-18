import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";

const rootReducer = combineReducers({
    user: userReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});