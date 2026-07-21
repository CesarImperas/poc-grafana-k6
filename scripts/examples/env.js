import http from 'k6/http';

// Executar: k6 run -e BASE_URL=https://test.k6.io env.js

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io';

export default function () {
  http.get(BASE_URL);
};
