import React, { ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

interface AuthorizedRouteProps {
    signedIn: boolean,
    children: JSX.Element
}

const AuthorizedRoute = ({ signedIn, children } : AuthorizedRouteProps) : ReactElement => {
    let location = useLocation();
    if (signedIn) {
        return children;
    }
    return (<Redirect to={{
        pathname: '/',
        state: {
            redirect: location.pathname
        }
    }}/>)
}

export default AuthorizedRoute