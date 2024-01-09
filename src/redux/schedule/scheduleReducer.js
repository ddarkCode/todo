import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { baseUrl } from '..';

const initialState = {
  schedules: [],
};

export const getSchedules = createAsyncThunk(
  'schedules/get_schedules',
  async (undefined, thunkAPI) => {
    const { data } = await axios.get(`${baseUrl}/schedules`);
    return data;
  }
);
export const addSchedule = createAsyncThunk(
  'schedules/add_schedule',
  async (schedule, thunkAPI) => {
    const { data } = await axios.post(`${baseUrl}/schedules`, schedule);
    return data;
  }
);

export const removeSchedule = createAsyncThunk(
  'schedules/remove_schedules',
  async (scheduleId, thunkAPI) => {
    const { data } = await axios.delete(`${baseUrl}/schedules/${scheduleId}`);
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload;
    });
    builder.addCase(addSchedule.fulfilled, (state, action) => {
      state.schedules = state.schedules.concat(action.payload);
    });
    builder.addCase(removeSchedule.fulfilled, (state, action) => {
      state.schedules = state.schedules.filter(
        (sch) => sch._id !== action.payload.scheduleId
      );
    });
  },
});

const { reducer, actions } = authSlice;
export default reducer;
