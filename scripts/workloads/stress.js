import { check } from 'k6';
import { get } from '../utils/http.js';

export const options = {
  scenarios: {
    stress_test: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 150 },
        { duration: '30s', target: 0 },
      ],
    },
  },
};

export default function() {
  check(get('/'), {
    'status is 200': (r) => r.status === 200,
  });
}