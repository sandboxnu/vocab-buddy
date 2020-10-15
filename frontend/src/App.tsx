import React, {ReactElement} from "react";
import Login from "./pages/Login";
import Assessments from "./pages/Assessments/Assessments";
import Interventions from "./pages/Interventions";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Assessments/Quiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () : ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/assessments" component={Assessments} />
        <Route path="/interventions" component={Interventions} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/assessments/:id" component={Quiz} />
      </Switch>
    </Router>
  );
};

export default App;
