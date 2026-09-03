import axios from 'axios';

// The base URL can be injected via environment variables in production
// E.g., inside .env file: VITE_API_BASE_URL=https://api.yourdomain.com/v1
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor to inject JWT authentication token
api.interceptors.request.use((config) => {
  const session = localStorage.getItem('lm_session');
  if (session) {
    try {
      const parsedSession = JSON.parse(session);
      // If your backend returns an actual JWT token, adjust this payload structure
      if (parsedSession.token) {
        config.headers.Authorization = `Bearer ${parsedSession.token}`;
      }
    } catch (error) {
      console.error("Error parsing session token", error);
    }
  }
  return config;
});

// Interceptor to handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (e.g., trigger a logout or token refresh)
      console.error('Unauthorized! Token may be expired.');
    }
    return Promise.reject(error);
  }
);

/* =========================================
   API Resource Methods
   ========================================= */

// Instruments
export const fetchInstruments = async () => {
  const response = await api.get('/instruments');
  return response.data;
};

// Verification Applications
export const fetchApplications = async () => {
  const response = await api.get('/verification');
  return response.data;
};

export const fetchApplicationDetails = async (id: string) => {
  const response = await api.get(`/verification/${id}`);
  return response.data;
};

// Dashboard
export const fetchDashboardMetrics = async () => {
  const response = await api.get('/dashboard/metrics');
  return response.data;
};

// Inspections
export const fetchInspections = async () => {
  const response = await api.get('/inspections');
  return response.data;
};

export const submitInspectionFindings = async (appId: string, data: any) => {
  const response = await api.post(`/verification/${appId}/inspect`, data);
  return response.data;
};

// Certificates
export const fetchCertificates = async () => {
  const response = await api.get('/certificates');
  return response.data;
};

export const fetchCertificateDetails = async (id: string) => {
  const response = await api.get(`/certificates/${id}`);
  return response.data;
};

// Audit & Administration
export const fetchAuditLogs = async () => {
  const response = await api.get('/audit-logs');
  return response.data;
};

export const fetchBusinessProfile = async () => {
  const response = await api.get('/business/profile');
  return response.data;
};

export const fetchSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

// Authentication (To be wired up in AuthContext)
export const loginApi = async (credentials: any) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signupApi = async (userData: any) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

export default api;
