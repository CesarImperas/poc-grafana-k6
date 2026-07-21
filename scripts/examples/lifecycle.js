import { get } from '../../utils/http.js';

export function setup() {
  console.log('Setup executado');
}

export default function() {
  get('/');
}

export function teardown() {
  console.log('Teardown executado');
}

/*
Esse exemplo evidencia claramente o ciclo de vida Init -> Setup -> Default -> Teardown, um dos conceitos centrais do k6.
*/