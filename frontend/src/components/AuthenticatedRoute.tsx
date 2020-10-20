import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { getSignedIn } from '../data/reducer';

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

const connector = connect((state) => ({
    ...state,
    signedIn: getSignedIn(state)
  }), {});

export default connector(AuthorizedRoute)