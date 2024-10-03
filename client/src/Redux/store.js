import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import themeReducer from "./slices/theme-slice"

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer
});

export const store = configureStore({
    reducer: rootReducer,
});