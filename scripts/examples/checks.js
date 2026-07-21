import { check } from 'k6';
import { get } from '../../utils/http.js';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {
  const response = get('/');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
};