/**
 * Vitest 테스트 설정 파일
 *
 * 목적: 테스트 환경 초기화 및 전역 설정
 */

import { beforeEach, afterEach } from 'vitest';

// 각 테스트 전에 LocalStorage와 History API 초기화
beforeEach(() => {
  // LocalStorage 초기화
  localStorage.clear();

  // History API 초기화
  window.history.replaceState(null, '', '/');

  // DOM 초기화
  document.body.innerHTML = '';
});

afterEach(() => {
  // 테스트 후 정리
  localStorage.clear();
  document.body.innerHTML = '';
});



