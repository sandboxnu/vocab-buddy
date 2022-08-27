import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSignedIn } from '../pages/Login/data/reducer';

function AuthorizedElement(props: {
  element: React.ReactElement;
}): React.ReactElement {
  const signedIn = useSelector(getSignedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!signedIn) {
      navigate('/login');
    }
  }, [signedIn]);
  return props.element;
}

export default AuthorizedElement;
