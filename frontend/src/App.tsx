import React, {ReactElement} from "react";
import Login from "./pages/Login";
import Assessments from "./pages/Assessments";
import Interventions from "./pages/Interventions";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () : ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/assessments" component={Assessments} />
        <Route path="/interventions" component={Interventions} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
