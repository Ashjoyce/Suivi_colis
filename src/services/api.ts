import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion des erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTIFICATION ============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// ============ RÉSERVATIONS ============
export const reservationAPI = {
  getAll: () => api.get('/reservations'),
  getById: (id) => api.get(`/reservations/${id}`),
  create: (data) => api.post('/reservations', data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.patch(`/reservations/${id}/cancel`),
  delete: (id) => api.delete(`/reservations/${id}`),
};

// ============ SUIVI ============
export const trackingAPI = {
  searchPublic: (trackingNumber) => api.get(`/tracking/search/${trackingNumber}`),
  getByNumber: (trackingNumber) => api.get(`/tracking/search/${trackingNumber}`),
  getAll: () => api.get('/tracking'),
  getById: (id) => api.get(`/tracking/${id}`),
  update: (id, data) => api.put(`/tracking/${id}`, data),
  confirmDelivery: (id, data) => api.patch(`/tracking/${id}/deliver`, data),
};

// ============ FACTURES ============
export const invoiceAPI = {
  getAll: () => api.get('/invoices'),
  getById: (id) => api.get(`/invoices/${id}`),
  createFromReservation: (reservationId) => api.post(`/invoices/reservation/${reservationId}`),
  updateStatus: (id, status) => api.patch(`/invoices/${id}/status`, { status }),
  markAsPaid: (id) => api.patch(`/invoices/${id}/pay`),
  download: (id) => api.get(`/invoices/${id}/download`),
  delete: (id) => api.delete(`/invoices/${id}`),
};

// ============ DOCUMENTS ============
export const documentAPI = {
  getAll: () => api.get('/documents'),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (formData) => api.post('/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  sign: (id, signatureUrl) => api.patch(`/documents/${id}/sign`, { signatureUrl }),
  download: (id) => api.get(`/documents/${id}/download`),
  delete: (id) => api.delete(`/documents/${id}`),
};

// ============ MESSAGES ============
export const messageAPI = {
  getAll: () => api.get('/messages'),
  getById: (id) => api.get(`/messages/${id}`),
  send: (data) => api.post('/messages', data),
  markAsRead: (id) => api.patch(`/messages/${id}/read`),
  updateStatus: (id, status) => api.patch(`/messages/${id}/status`, { status }),
  delete: (id) => api.delete(`/messages/${id}`),
};

export default api;
