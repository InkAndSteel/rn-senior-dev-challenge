import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { databaseService, User } from "src/database";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const isAuthenticated = await databaseService.authenticate(email, password);
      if (!isAuthenticated) {
        return rejectWithValue("Invalid email or password");
      }

      const user = await databaseService.getUserByEmail(email);
      return user;
    } catch {
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const existingUser = await databaseService.getUserByEmail(email);
      if (existingUser) {
        return rejectWithValue("Email already exists");
      }

      await databaseService.createUser(email, password);
      const user = await databaseService.getUserByEmail(email);
      return user;
    } catch {
      return rejectWithValue("Registration failed. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
