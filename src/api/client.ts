import axios from 'axios';

const API_BASE_URL = 'https://api.codex00.dpdns.org/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mocking API calls for demo if the real API isn't reachable or for development
// In a real production app, we'd handle errors and retries here.
export const serverApi = {
  getStatus: () => apiClient.get('/status'),
  start: () => apiClient.post('/start'),
  stop: () => apiClient.post('/stop'),
  restart: () => apiClient.post('/restart'),
};
