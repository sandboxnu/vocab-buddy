import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { getSignedIn } from "./data/reducer";
import Assessments from "./pages/Assessments/Assessments";
import Quiz from "./pages/Assessments/Quiz";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Interventions from "./pages/Interventions";
import Login from "./pages/Login";

interface AppProps {
  signedIn: boolean
}

const App = ({signedIn} : AppProps) : ReactElement => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to='/login' />
        <Route exact path="/login" component={Login} />
        <Route path="/sign_up" component={CreateUser} />
        <AuthenticatedRoute signedIn={signedIn} path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute signedIn={signedIn} path="/interventions" component={Interventions} />
        <AuthenticatedRoute signedIn={signedIn} exact path="/assessments/:id" component={Quiz} />
        <AuthenticatedRoute signedIn={signedIn} path="/assessments" component={Assessments} />
      </Switch>
    </Router>
  );
};

const connector = connect((state) => ({
  signedIn: getSignedIn(state)
}), {});

export default connector(App);
