import React from 'react';
import { useStore, connect } from 'react-redux';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { State } from '../models/types';

function AuthorizedRoute(props: RouteProps) {
  const { signedIn } = useStore().getState() as State;
  if (signedIn) {
    return <Route {...props} />;
  }
  return <Navigate to="/login" />;
}

export default AuthorizedRoute;
