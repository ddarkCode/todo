import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';

import Header from './common/Header';
import { getProfile } from './redux/auth/authReducer';

const App = ({ route }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div>
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default App;
