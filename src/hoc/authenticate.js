import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function authenticate(Component) {
  const ReturnedComponent = (ownProps) => {
    const user = useSelector((state) => state.auth.user);
    switch (user) {
      case null:
        return <Redirect to="/login" />;
      default:
        return <Component {...ownProps} />;
    }
  };
  return ReturnedComponent;
}
