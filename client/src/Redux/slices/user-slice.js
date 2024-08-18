import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        isAuthenticated: false,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        removeUserData: (state, action) => {
            state.userData = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;