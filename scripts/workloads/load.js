import { check } from 'k6';
import { get } from '../../utils/http.js';

export const options = {
  scenarios: {
    load_test: {
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
    },
  },
};

export default function() {
  const response = get('/');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}