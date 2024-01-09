import { configureStore } from '@reduxjs/toolkit';

import auth from '../src/redux/auth/authReducer';
import schedules from '../src/redux/schedule/scheduleReducer';

export default () => {
  return configureStore({
    reducer: { auth, schedules },
  });
};
