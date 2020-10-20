import React, { ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

interface AuthorizedRouteProps {
    signedIn: boolean,
    children: JSX.Element
}

const AuthorizedRoute = ({ signedIn, children } : AuthorizedRouteProps) : ReactElement => {
    let location = useLocation();
    console.log(signedIn);
    console.log(children);
    if (signedIn) {
        return children;
    }
    return (
        <Redirect from={location.pathname} to={{
            pathname: '/',
            state: {
                redirect: location.pathname
            }
        }}/>
    )
}

export default AuthorizedRoute