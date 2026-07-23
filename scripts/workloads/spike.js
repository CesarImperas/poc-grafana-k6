import { check } from 'k6';
import { get } from '../../utils/http.js';

export const options = {
  scenarios: {
    spike_test: {
      executor: 'ramping-vus',
      startVUs: 5,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '10s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 5 },
      ],
    },
  },
};

export default function() {
  check(get('/'), {
    'status is 200': (r) => r.status === 200,
  });
}