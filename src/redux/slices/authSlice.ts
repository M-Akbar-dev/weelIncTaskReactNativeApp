import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../services/api";

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const authUser = createAsyncThunk(
  'auth/authUser',
  async (
    payload: { email: string; password: string; mode: 'login' | 'register' },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = payload.mode === 'login' ? '/auth/login' : '/auth/register';
      const { mode, ...data } = payload;
      const response = await post(endpoint, data);

      if (response.success) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Authentication failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Authentication failed');
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload?.token) {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = action.payload.user || action.payload;
        }
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string || 'Authentication failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
