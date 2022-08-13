import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';
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
        <Navigate to="/login" />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<CreateUser />} />
        <AuthenticatedRoute
          path="/dashboard"
          element={<Dashboard />}
        />
        <AuthenticatedRoute
          path="/dashboard/student/:id"
          element={<Dashboard />}
        />
        <AuthenticatedRoute
          path="/dashboard/:userId/session/:sessionId"
          element={<Dashboard />}
        />
        <AuthenticatedRoute
          path="/interventions"
          element={<Interventions />}
        />
        <AuthenticatedRoute
          path="/interventions/reward"
          element={<Reward />}
        />
        <AuthenticatedRoute
          path="/interventions/:id"
          element={<Activities />}
        />
        <AuthenticatedRoute
          path="/assessments/reward"
          element={<AssessmentRewardPage />}
        />
        <AuthenticatedRoute
          path="/interventions/:id"
          element={<Activities />}
        />
        <AuthenticatedRoute
          path="/assessments/:id"
          element={<Quiz />}
        />
        <AuthenticatedRoute
          path="/assessments"
          element={<Assessments />}
        />
        <Route path="/error" element={<ErrorScreen />} />
        <Navigate to="/error" />
      </Routes>
    </Router>
  );
}

export default App;
