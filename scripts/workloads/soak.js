import { check } from 'k6';
import { get } from '../../utils/http.js';

export const options = {
  scenarios: {
    soak_test: {
      executor: 'constant-vus',
      vus: 20,
      duration: '5m', // Afins didáticos, o tempo é menor do que seria na prática (horas ou dias)
    },
  },
};

export default function() {
  check(get('/'), {
    'status is 200': (r) => r.status === 200,
  });
}