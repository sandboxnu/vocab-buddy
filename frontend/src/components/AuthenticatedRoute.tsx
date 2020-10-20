import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface AuthorizedRouteProps extends RouteProps {
    signedIn: boolean,
}

class AuthorizedRoute extends Route<AuthorizedRouteProps> {
    render() {
        let { location, signedIn } = this.props;
        if (signedIn) {
            return (<Route {... this.props} />)
        }
        return (
            <Redirect from={location?.pathname || ""} to={{
                pathname: '/login',
                state: {
                    redirect: location?.pathname || ""
                }
            }}/>
        )
    }
}

export default AuthorizedRoute