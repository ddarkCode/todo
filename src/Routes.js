import App from './App';
import Schedules from './pages/Schedules';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default [
  {
    component: App,
    routes: [
      {
        ...Schedules,
        path: '/',
        exact: true,
      },
      {
        component: Login,
        path: '/login',
      },
      {
        component: Signup,
        path: '/signup',
      },
    ],
  },
];
