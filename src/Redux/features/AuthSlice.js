import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticateUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        { email, password }
      );
      if (response.status === 200) {
        return response.data; // Accessing response data directly
      } else {
        console.log("login failed");
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("login failed:", error.message);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action ? action.payload : localStorage.getItem("token");
    },
    setUser: (state, action) => {
      state.user = action ? action.payload : JSON.parse(localStorage.getItem("user"));;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload.data.user;
        console.log(JSON.stringify(action.payload.data.user));
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("token", action.payload.data.accessToken);
        console.log(action);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { signOut, setToken,setUser } = authSlice.actions;
export default authSlice.reducer;
