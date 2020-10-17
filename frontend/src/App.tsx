import React, {ReactElement} from "react";
import Login from "./pages/Login";
import Assessments from "./pages/Assessments/Assessments";
import Interventions from "./pages/Interventions";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Assessments/Quiz";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";

const App = () : ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/sign_up" component={CreateUser} />
        <Route exact path="/assessments" component={Assessments} />
        <Route exact path="/assessments/:id" component={Quiz} />
        <Route exact path="/interventions" component={Interventions} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
