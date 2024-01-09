import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function verifyAuth(Component) {
  const ReturnedComponent = (ownProps) => {
    const user = useSelector((state) => state.auth.user);
    switch (user) {
      case null:
        return <Component />;
      default:
        return <Redirect to="/" />;
    }
  };
  return ReturnedComponent;
}
