import { createSlice } from "@reduxjs/toolkit";

// 1 hour in milliseconds
const TOKEN_EXPIRY_TIME = 60 * 60 * 1000;

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  isAuthenticated: checkTokenValidity(),
};

function checkTokenValidity() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    const { timestamp } = storedData;
    // Check if token is older than 1 hour
    if (new Date().getTime() - timestamp > TOKEN_EXPIRY_TIME) {
      // Token has expired, remove it
      localStorage.removeItem("userData");
      return false;
    }
    return true;
  }
  return false;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const userDataWithTimestamp = {
        ...action.payload,
        timestamp: new Date().getTime(), // Store the current time
      };
      state.userData = userDataWithTimestamp;
      state.isAuthenticated = true;
      // Store user data with timestamp in localStorage
      localStorage.setItem("userData", JSON.stringify(userDataWithTimestamp));

      // Remove the token automatically after 1 hour
      setTimeout(() => {
        localStorage.removeItem("userData");
        state.userData = null;
        state.isAuthenticated = false;
      }, TOKEN_EXPIRY_TIME);
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
