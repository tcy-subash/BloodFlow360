import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";
import ProtectedRoute from "../auth/ProtectedRoute";

import MainLayout from "../components/layout/MainLayout";

import LoginPage from "../pages/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import DonorsPage from "../pages/Donors/DonorsPage";
import HospitalsPage from "../pages/Hospitals/HospitalsPage";
import InventoryPage from "../pages/Inventory/InventoryPage";
import BloodUnitsPage from "../pages/BloodUnits/BloodUnitsPage";
import RequestsPage from "../pages/Requests/RequestsPage";
import BloodIssuePage from "../pages/BloodIssue/BloodIssuePage";
import ReportsPage from "../pages/Reports/ReportsPage";
import UsersPage from "../pages/Users/UsersPage";
import PatientsPage from "../pages/Patients/PatientsPage";
import SettingsPage from "../pages/Settings/SettingsPage";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/bloodunits" element={<BloodUnitsPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/bloodissue" element={<BloodIssuePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}