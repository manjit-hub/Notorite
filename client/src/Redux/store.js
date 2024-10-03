import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import loadingReducer from "./slices/loading-slice";

const rootReducer = combineReducers({
    user: userReducer,
    loading: loadingReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});