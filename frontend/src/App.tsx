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
        <AuthenticatedRoute signedIn={signedIn}>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/interventions" component={Interventions} />
          <Route exact path="/assessments/:id" component={Quiz} />
          <Route path="/assessments" component={Assessments} />
        </AuthenticatedRoute>
        
      </Switch>
    </Router>
  );
};

const connector = connect((state) => ({
  signedIn: getSignedIn(state)
}), {});

export default connector(App);
