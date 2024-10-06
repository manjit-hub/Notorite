import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import themeReducer from "./slices/theme-slice"
import loadingReducer from "./slices/loading-slice";

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
    theme: themeReducer
});

export const store = configureStore({
    reducer: rootReducer,
});