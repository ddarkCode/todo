import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '..';

const initialState = {
  user: null,
  error: {
    signupError: '',
    loginError: '',
  },
};

export const signup = createAsyncThunk(
  'auth/sign_up',
  async (user, thunkAPI) => {
    const { data } = await axios.post(`${baseUrl}/auth/signup`, user);
    return data;
  }
);
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  const { data } = await axios.post(`${baseUrl}/auth/login`, user);
  return data;
});
export const logout = createAsyncThunk(
  'auth/logout',
  async (user, thunkAPI) => {
    const { data } = await axios.get(`${baseUrl}/auth/logout`);
    return data;
  }
);

export const getProfile = createAsyncThunk(
  'auth/get_profile',
  async (user, thunkAPI) => {
    const { data } = await axios.get(`${baseUrl}/auth/profile`);
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.error.signupError =
        action.meta.arg.username + ' ' + action.meta.requestStatus;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

const { reducer, actions } = authSlice;
export default reducer;
