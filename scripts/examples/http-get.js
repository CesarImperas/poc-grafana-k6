import http from 'k6/http';
import { config } from '../../utils/config.js';

export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {
  let path = '/';
  http.get(`${config.baseURL}${path}`);
};
