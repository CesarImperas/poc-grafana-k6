import { get } from '../../utils/http.js';

export const options = {
  vus: 5,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate>0.01'], // Forçar erro
  },
};

export default function() {
  get('/');
};
