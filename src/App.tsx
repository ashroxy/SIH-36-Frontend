import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy load the pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Instruments = lazy(() => import('./pages/Instruments'));
const Applications = lazy(() => import('./pages/Applications'));
const ApplicationDetails = lazy(() => import('./pages/ApplicationDetails'));
const FieldInspection = lazy(() => import('./pages/FieldInspection'));
const CertificateView = lazy(() => import('./pages/CertificateView'));
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center p-8 min-h-[50vh]">
    <div className="flex flex-col items-center gap-4 text-primary opacity-70">
      <span className="material-symbols-outlined text-4xl animate-spin" style={{ fontVariationSettings: "'FILL' 0" }}>sync</span>
      <span className="font-label-lg text-label-lg font-bold">Loading module...</span>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="business" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="My Business" description="Manage your business profile, branches, and authorized representatives here. This module is currently under construction." />
            </Suspense>
          } />
          <Route path="instruments" element={
            <Suspense fallback={<PageLoader />}>
              <Instruments />
            </Suspense>
          } />
          <Route path="applications" element={
            <Suspense fallback={<PageLoader />}>
              <Applications />
            </Suspense>
          } />
          <Route path="applications/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ApplicationDetails />
            </Suspense>
          } />
          <Route path="inspections" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="Inspections" description="View and manage pending and completed field inspections." />
            </Suspense>
          } />
          <Route path="inspections/:id" element={
            <Suspense fallback={<PageLoader />}>
              <FieldInspection />
            </Suspense>
          } />
          <Route path="certificates" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="Certificates" description="Browse all issued verification certificates." />
            </Suspense>
          } />
          <Route path="certificates/:id" element={
            <Suspense fallback={<PageLoader />}>
              <CertificateView />
            </Suspense>
          } />
          <Route path="logs" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="Audit Logs" description="Review detailed system activity and audit logs." />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="Settings" description="Configure your system preferences." />
            </Suspense>
          } />
          <Route path="help" element={
            <Suspense fallback={<PageLoader />}>
              <PlaceholderPage title="Help & Support" description="Access user manuals and contact support." />
            </Suspense>
          } />
          {/* Fallbacks */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
