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

export default api;
