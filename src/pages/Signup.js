import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import AuthButton from '../components/AuthButton';
import { signup } from '../redux/auth/authReducer';
import verifyAuth from '../hoc/verifyAuth';

import '../css/auth.css';

function Signup() {
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
    console.log('hello Signup');
    dispatch(signup(user));
    setUser({ username: '', password: '' });
    history.push('/');
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
          <AuthButton text={'Signup'} />
        </Form>
      </div>
      <Link to="/login">Already Have An Account? Login</Link>
    </div>
  );
}

export default verifyAuth(Signup);
