import React from 'react';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import auth from './auth/authReducer';
import schedules from './schedule/scheduleReducer';

export const baseUrl = 'http://localhost:3000/api';

const createStore = (preloadedState) => {
  return configureStore(
    { reducer: { auth, schedules } },
    [logger],
    preloadedState
  );
};

export default createStore;
