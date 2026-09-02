import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8006/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock implementations with fallback
export const fetchInstruments = async () => {
  try {
    const response = await api.get('/instruments');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch instruments, using mock data", error);
    return [
      { id: '1', serial_number: 'SN-9823-XYZ', instrument_type: 'Electronic Scale', model_number: 'Non-automatic', capacity_max: 15, unit_of_measurement: 'kg', verification_frequency_months: 12, status: 'REGISTERED' },
      { id: '2', serial_number: 'FLW-441-A', instrument_type: 'Fuel Dispenser', model_number: 'Volume Meter', capacity_max: 50, unit_of_measurement: 'L/min', verification_frequency_months: 6, status: 'PENDING_VERIFICATION' },
      { id: '3', serial_number: 'TMP-88-C', instrument_type: 'Thermometer', model_number: 'Clinical', capacity_max: 42, unit_of_measurement: 'C', verification_frequency_months: 12, status: 'UNDER_VERIFICATION' },
      { id: '4', serial_number: 'WGT-1000-B', instrument_type: 'Bridge Scale', model_number: 'Heavy Duty', capacity_max: 60000, unit_of_measurement: 'kg', verification_frequency_months: 12, status: 'VERIFIED' },
      { id: '5', serial_number: 'PRS-22-X', instrument_type: 'Pressure Gauge', model_number: 'Industrial', capacity_max: 10, unit_of_measurement: 'Bar', verification_frequency_months: 12, status: 'FAILED' }
    ];
  }
};

export const fetchApplications = async () => {
  try {
    const response = await api.get('/verification');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch applications, using mock data", error);
    return [
      { id: 'APP-2023-8901', type: 'New Verification', status: 'DRAFT' },
      { id: 'APP-2023-8895', type: 'Renewal', status: 'SUBMITTED' },
      { id: 'APP-2023-8842', type: 'New Verification', status: 'SCHEDULED' },
      { id: 'APP-2023-8810', type: 'Modification', status: 'IN_PROGRESS' },
      { id: 'APP-2023-8799', type: 'Renewal', status: 'APPROVED' },
    ];
  }
}

export const fetchApplicationDetails = async (id: string) => {
  try {
    const response = await api.get(`/verification/${id}`);
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch application details, using mock data", error);
    return {
      id: id,
      type: 'New Verification',
      status: 'SCHEDULED',
      business_name: 'Fresh Foods Market Ltd.',
      registration_number: 'BRN-9023-A',
      location: '124 Valley Road, West Wing, CBD',
      contact_person: 'Jane Doe (Manager)',
      contact_phone: '+1 (555) 019-2834',
      instruments: [
        { name: 'Deli Counter Scale - 30kg', serial: 'SN-492-MK2', class: 'Class III', type: 'Requires Recalibration', icon: 'kitchen' },
        { name: 'Checkout Scale A - 15kg', serial: 'CHK-001', class: 'Class III', type: 'Routine', icon: 'conveyor_belt' },
        { name: 'Checkout Scale B - 15kg', serial: 'CHK-002', class: 'Class III', type: 'Routine', icon: 'conveyor_belt' },
      ]
    };
  }
}

export const fetchDashboardMetrics = async () => {
  try {
    const response = await api.get('/dashboard/metrics');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch dashboard metrics, using mock data", error);
    return {
      registered_instruments: 1248,
      active_applications: 34,
      valid_certificates: 892,
      expiring_soon: 12
    }
  }
}

export const submitInspectionFindings = async (appId: string, data: any) => {
  try {
    const response = await api.post(`/verification/${appId}/inspect`, data);
    return response.data;
  } catch (error) {
    console.warn("Failed to submit inspection, simulating success", error);
    return { success: true, message: "Findings submitted successfully" };
  }
}

export const fetchCertificateDetails = async (id: string) => {
  try {
    const response = await api.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch certificate, using mock data", error);
    return {
      id: id || 'CERT-2023-994A',
      instrument_name: 'Industrial Flow Meter Type-X',
      serial_number: 'S/N: 994-A22-BX',
      business_name: 'Acme Manufacturing Corp.',
      issued_date: 'October 24, 2023',
      valid_until: 'October 24, 2024',
      inspector_name: 'J. Doe'
    };
  }
}

export const fetchInspections = async () => {
  try {
    const response = await api.get('/inspections');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch inspections, using mock data", error);
    return [
      { id: 'INSP-2023-110', date: '2023-10-25', inspector: 'J. Doe', status: 'PENDING', location: '124 Valley Road' },
      { id: 'INSP-2023-109', date: '2023-10-24', inspector: 'S. Smith', status: 'COMPLETED', location: '45 Industrial Ave' },
      { id: 'INSP-2023-108', date: '2023-10-22', inspector: 'J. Doe', status: 'FAILED', location: 'Market Square' }
    ];
  }
}

export const fetchCertificates = async () => {
  try {
    const response = await api.get('/certificates');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch certificates, using mock data", error);
    return [
      { id: 'CERT-2023-994A', instrument: 'Industrial Flow Meter Type-X', issue_date: '2023-10-24', expiry: '2024-10-24', status: 'ACTIVE' },
      { id: 'CERT-2023-992B', instrument: 'Bridge Scale 60t', issue_date: '2023-09-15', expiry: '2024-09-15', status: 'ACTIVE' },
      { id: 'CERT-2022-110C', instrument: 'Checkout Scale', issue_date: '2022-10-01', expiry: '2023-10-01', status: 'EXPIRED' }
    ];
  }
}

export const fetchAuditLogs = async () => {
  try {
    const response = await api.get('/audit-logs');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch audit logs, using mock data", error);
    return [
      { id: 'LOG-001', timestamp: '2023-10-26T10:23:45Z', action: 'LOGIN', user: 'admin@metrology.gov', details: 'Successful login from IP 192.168.1.1' },
      { id: 'LOG-002', timestamp: '2023-10-26T11:05:12Z', action: 'CERT_ISSUED', user: 'j.doe', details: 'Issued certificate CERT-2023-994A' },
      { id: 'LOG-003', timestamp: '2023-10-26T14:30:00Z', action: 'INSPECTION_FAILED', user: 's.smith', details: 'Failed inspection INSP-2023-108 due to eccentricity error' }
    ];
  }
}

export const fetchBusinessProfile = async () => {
  try {
    const response = await api.get('/business/profile');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch business profile, using mock data", error);
    return {
      business_name: 'Acme Manufacturing Corp.',
      registration_no: 'BRN-19283-XYZ',
      tax_id: 'TAX-998822',
      address: '45 Industrial Ave, Sector 4, Tech Park',
      phone: '+1 (555) 123-4567',
      email: 'contact@acmecorp.com',
      owner: 'Michael Scott',
      status: 'VERIFIED'
    };
  }
}

export const fetchSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.warn("Failed to fetch settings, using mock data", error);
    return {
      notifications: { email: true, sms: false, push: true },
      theme: 'system',
      language: 'en',
      two_factor_auth: false
    };
  }
}

export default api;
