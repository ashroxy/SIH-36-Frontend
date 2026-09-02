import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Instruments from './pages/Instruments';
import ApplicationDetails from './pages/ApplicationDetails';
import FieldInspection from './pages/FieldInspection';
import CertificateView from './pages/CertificateView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="instruments" element={<Instruments />} />
          <Route path="applications/:id" element={<ApplicationDetails />} />
          <Route path="inspections/:id" element={<FieldInspection />} />
          <Route path="certificates/:id" element={<CertificateView />} />
          {/* Fallbacks */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
