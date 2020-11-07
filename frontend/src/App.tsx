import React, { ReactElement } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Assessments from "./pages/Assessments/Assessments";
import Quiz from "./pages/Assessments/Quiz";
import CreateUser from "./pages/Login/CreateUser";
import Dashboard from "./pages/Dashboard";
import Interventions from "./pages/Interventions/Interventions";
import Login from "./pages/Login/Login";

const App = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={Login} />
        <Route path="/sign_up" component={CreateUser} />
        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
        <AuthenticatedRoute path="/interventions" component={Interventions} />
        <AuthenticatedRoute exact path="/assessments/:id" component={Quiz} />
        <AuthenticatedRoute path="/assessments" component={Assessments} />
      </Switch>
    </Router>
  );
};

const connector = connect((state) => state, {});

export default connector(App);
