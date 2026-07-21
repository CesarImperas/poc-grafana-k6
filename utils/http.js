import http from 'k6/http';
import { config } from './config.js';

export function get(path, params = {}) {
  return http.get(`${config.baseURL}${path}`, params);
};

export function post(path, body, params = {}) {
  return http.post(`${config.baseURL}${path}`, body, params);
};
