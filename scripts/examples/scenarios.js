import { get } from '../../utils/http.js';

export const options = {
  scenarios: {
    listCrocodiles: {
      executor: 'constant-arrival-rate',
      exec: 'listCrocodiles',
      duration: '30s',
      rate: 20,
      timeUnit: '1s',
      preAllocatedVUs: 20,
      gracefulStop: '5s',
      tags: { test_type: 'listagem_crocodilos' },
    },
    getCrocodile: {
      executor: 'per-vu-iterations',
      exec: 'getCrocodile',
      vus: 5,
      iterations: 20,
      maxDuration: '1m',
      tags: { test_type: 'busca_crocodilos' },
      gracefulStop: '5s',
    },
  },
  discardResponseBodies: true,
};

export function listCrocodiles() {
  get('/crocodiles');
};

export function getCrocodile() {
  if (__VU % 2 === 0) {
    get('/crocodiles/2');
  } else {
    get('/crocodiles/1');
  }
};
