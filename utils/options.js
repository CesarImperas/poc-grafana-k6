export const defaultOptions = {
  vus: 1,
  duration: '10s',
};

export const defaultThresholds = {
  http_req_duration: ['p(95)<500'],
  http_req_failed: ['rate<0.01'],
};
