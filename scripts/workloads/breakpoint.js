import { check } from 'k6';
import { get } from '../../utils/http.js';

export const options = {
  scenarios: {
    breakpoint_test: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 200,
      stages: [
        { target: 50, duration: '30s' },
        { target: 100, duration: '30s' },
        { target: 150, duration: '30s' },
      ],
    },
  },
};

export default function () {
  check(get('/'), {
    'status is 200': (r) => r.status === 200,
  });
}
