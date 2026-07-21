export const config = {
  baseURL: __ENV.BASE_URL || 'https://test.k6.io',

  defaultHeaders: {
    "Content-Type": 'application/json',
    Accept: 'application/json',
  },
};
