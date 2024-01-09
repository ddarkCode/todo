import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import AuthButton from '../components/AuthButton';
import { login } from '../redux/auth/authReducer';
import verifyAuth from '../hoc/verifyAuth';

import '../css/auth.css';

function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
    history.push('/');
    setUser({ username: '', password: '' });
  };
  return (
    <div className="auth-container">
      <div className="auth">
        <Form onSubmit={handleSubmit}>
          <Input
            type={'text'}
            name={'username'}
            value={user.username}
            onChange={handleChange}
          />
          <Input
            type={'password'}
            name={'password'}
            value={user.password}
            onChange={handleChange}
          />
          <AuthButton text={'Login'} />
        </Form>
      </div>
      <Link to="/signup">Don't Have An Account? Signup</Link>
    </div>
  );
}

export default verifyAuth(Login);
