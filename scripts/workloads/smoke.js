import { check } from 'k6';
import { get } from '../utils/http.js';

export const options = {
  vus: 1,
  duration: '10s',
};

export default function() {
  const response = get('/');

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}