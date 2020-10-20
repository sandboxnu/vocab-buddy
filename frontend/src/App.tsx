import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <Route exact path="/" component={Login} />
        <Route path="/sign_up" component={CreateUser} />
        <AuthenticatedRoute path="/dashboard" signedIn={signedIn} component={Dashboard} />
        <AuthenticatedRoute path="/interventions" signedIn={signedIn} component={Interventions} />
        <AuthenticatedRoute exact path="/assessments/:id" signedIn={signedIn} component={Quiz} />
        <AuthenticatedRoute path="/assessments" signedIn={signedIn} component={Assessments} />
      </Switch>
    </Router>
  );
};

const connector = connect((state) => ({
  signedIn: getSignedIn(state)
}), {});

export default connector(App);
