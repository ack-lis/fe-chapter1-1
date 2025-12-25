import { createRouter } from './lib/index.js';
import {
  LoginPage,
  DashboardPage,
  ProfilePage,
  TestResultViewPage
} from './pages/index.js';
import { globalStore } from './stores/index.js';
import { ForbiddenError, UnauthorizedError } from './errors/index.js';
import { router } from './router.js';
import { render } from './render.js';

/**
 * AuthGuard: 인증 보호 래퍼
 * @param {Function} validation - 로그인 상태를 검증하는 함수
 * @param {Error} CustomError - validation 실패 시 던질 에러 클래스
 * @param {Function} Component - 렌더링할 페이지 컴포넌트
 * @returns {Function} 보호된 페이지 컴포넌트
 */
const AuthGuard = (validation, CustomError, Component) => {
  return () => {
    const { loggedIn } = globalStore.getState();
    if (validation(loggedIn)) {
      throw new CustomError();
    }
    return Component();
  };
};

// 라우트 맵 정의
router.set(
  createRouter({
    '/': DashboardPage,
    '/login': AuthGuard(Boolean, ForbiddenError, LoginPage),
    '/profile': AuthGuard(value => !value, UnauthorizedError, ProfilePage),
    '/testResultView': AuthGuard(
      value => !value,
      UnauthorizedError,
      TestResultViewPage
    )
  })
);

function main() {
  // 라우터와 스토어의 변경사항을 구독하여 자동 렌더링
  router.get().subscribe(render);
  globalStore.subscribe(render);

  // 초기 렌더링
  render();
}

// DOM이 준비된 후 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    main();
  });
} else {
  main();
}
