import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Routes from './Routes';
import createStore from './redux';
const INITIAL_STATE = window.INITIAL_STATE;
const store = createStore(INITIAL_STATE);

hydrateRoot(
  document.getElementById('root'),
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(Routes)}</BrowserRouter>
  </Provider>
);
