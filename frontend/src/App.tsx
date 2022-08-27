import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import AuthenticatedElement from './components/AuthenticatedElement';
import Assessments from './pages/Assessments/Assessments';
import Quiz from './pages/Assessments/Quiz';
import Dashboard from './pages/Dashboard/Dashboard';
import Interventions from './pages/Interventions/Interventions';
import Activities from './pages/Interventions/Activities';
import CreateUser from './pages/Login/CreateUser';
import Login from './pages/Login/Login';
import AssessmentRewardPage from './pages/Reward/AssessmentsReward/AssessmentRewardPage';
import Reward from './pages/Reward/InterventionsReward/Reward';
import ErrorScreen from './pages/Errors/ErrorScreen';

function App(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<CreateUser />} />
        <Route
          path="/dashboard"
          element={<AuthenticatedElement element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/student/:id"
          element={<AuthenticatedElement element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/:userId/session/:sessionId"
          element={<AuthenticatedElement element={<Dashboard />} />}
        />
        <Route
          path="/interventions"
          element={
            <AuthenticatedElement element={<Interventions />} />
          }
        />
        <Route
          path="/interventions/reward"
          element={<AuthenticatedElement element={<Reward />} />}
        />
        <Route
          path="/assessments/reward"
          element={(
            <AuthenticatedElement
              element={<AssessmentRewardPage />}
            />
          )}
        />
        <Route
          path="/interventions/:id"
          element={<AuthenticatedElement element={<Activities />} />}
        />
        <Route
          path="/assessments/:id"
          element={<AuthenticatedElement element={<Quiz />} />}
        />
        <Route
          path="/assessments"
          element={<AuthenticatedElement element={<Assessments />} />}
        />
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="/*" element={<ErrorScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
