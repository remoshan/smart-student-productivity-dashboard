import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PlannerPage } from './pages/PlannerPage';
import { TimerPage } from './pages/TimerPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import './styles/index.css';

/**
 * Main App component with React Router
 */
function App() {
  return (
    <Routes>
      {/* Dashboard Layout with persistent Sidebar */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        {/* Dashboard routes */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
