import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function Router({ isPrivate, children, ...rest }) {
  const ongId = localStorage.getItem('ongId');

  if (!isPrivate && ongId) {
    return <Redirect to="/profile" />
  }

  if (isPrivate && !ongId) {
    return <Redirect to="/" />
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
}
