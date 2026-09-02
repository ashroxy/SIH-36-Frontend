import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';

// Lazy load the pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Instruments = lazy(() => import('./pages/Instruments'));
const ApplicationDetails = lazy(() => import('./pages/ApplicationDetails'));
const FieldInspection = lazy(() => import('./pages/FieldInspection'));
const CertificateView = lazy(() => import('./pages/CertificateView'));

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
          <Route path="instruments" element={
            <Suspense fallback={<PageLoader />}>
              <Instruments />
            </Suspense>
          } />
          <Route path="applications/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ApplicationDetails />
            </Suspense>
          } />
          <Route path="inspections/:id" element={
            <Suspense fallback={<PageLoader />}>
              <FieldInspection />
            </Suspense>
          } />
          <Route path="certificates/:id" element={
            <Suspense fallback={<PageLoader />}>
              <CertificateView />
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
