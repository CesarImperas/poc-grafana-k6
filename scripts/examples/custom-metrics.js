import { Trend } from 'k6/metrics';
import { get } from '../../utils/http.js';

// Existem outras classes, como Counter, Gauge e Rate.

const responseTime = new Trend('custom_response_time');

export default function () {
  const response = get('/');

  responseTime.add(response.timings.duration);
};
