import { getProfile } from "@/lib/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (data, thunkAPI) => {
    const response = await getProfile();

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.user = null;
      state.loading = false;
    },
    [getUserProfile.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
