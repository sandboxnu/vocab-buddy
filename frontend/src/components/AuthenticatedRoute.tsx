import React from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, useNavigate } from 'react-router-dom';
import { getSignedIn } from '../pages/Login/data/reducer';

function AuthorizedRoute(props: RouteProps) {
  const signedIn = useSelector(getSignedIn);
  const navigate = useNavigate();
  if (!signedIn) {
    navigate('/login');
  }
  return <Route {...props} />;
}

export default AuthorizedRoute;
