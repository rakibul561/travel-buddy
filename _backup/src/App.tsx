import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  ScrollRestoration } from
'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { TravelPlansPage } from './pages/TravelPlansPage';
import { TravelPlanDetailPage } from './pages/TravelPlanDetailPage';
// Wrapper to handle scroll restoration
function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/travel-plans" element={<TravelPlansPage />} />
        <Route path="/travel-plans/:id" element={<TravelPlanDetailPage />} />
      </Routes>
    </>);

}
export function App() {
  return (
    <Router>
      <AppContent />
    </Router>);

}