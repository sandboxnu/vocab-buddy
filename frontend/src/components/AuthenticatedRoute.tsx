import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface AuthorizedRouteProps extends RouteProps {
    signedIn: boolean,
}

class AuthorizedRoute extends Route<AuthorizedRouteProps> {
    get location() {
        return this.props.location;
    }
    render() {
        if (this.props.signedIn) {
            return (<Route component={this.props.component} />)
        }
        return (
            <Redirect from={this.location?.pathname || ""} to={{
                pathname: '/',
                state: {
                    redirect: this.location?.pathname || ""
                }
            }}/>
        )
    }
}

// const AuthorizedRoute = ({ signedIn, children } : AuthorizedRouteProps) : ReactElement => {
//     let location = useLocation();
//     console.log(signedIn);
//     console.log(children);
//     if (signedIn) {
//         return children;
//     }
//     return (
//         <Redirect from={location.pathname} to={{
//             pathname: '/',
//             state: {
//                 redirect: location.pathname
//             }
//         }}/>
//     )
// }

export default AuthorizedRoute