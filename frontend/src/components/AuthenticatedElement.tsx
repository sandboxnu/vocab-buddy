import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectors } from '../pages/index';

function AuthorizedElement(props: {
  element: React.ReactElement;
}): React.ReactElement {
  const signedIn = useSelector(selectors.login.getSignedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!signedIn) {
      navigate('/login');
    }
  }, [signedIn]);
  return props.element;
}

export default AuthorizedElement;
