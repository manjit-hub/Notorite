import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeStatus: "dark"
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeStatus: (state, action) => {
            state.themeStatus = action.payload;
        }
    }
});

export const { setThemeStatus } = themeSlice.actions;
export default themeSlice.reducer;