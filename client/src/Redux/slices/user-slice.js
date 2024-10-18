import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: !!localStorage.getItem("userData"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    removeUserData: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      // Remove user data from localStorage
      localStorage.removeItem("userData");
    },
  },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
