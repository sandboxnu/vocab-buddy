import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Assessments from "./pages/Assessments";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Interventions from "./pages/Interventions";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign_up" component={CreateUser} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/interventions" component={Interventions} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
