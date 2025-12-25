import { createRouter } from './lib/index.js';
import {
  LoginPage,
  DashboardPage,
  ProfilePage,
  TestResultViewPage
} from './pages/index.js';
import { globalStore } from './stores/index.js';
import { router } from './router.js';
import { render } from './render.js';

const AuthGuard = (validation, errorMessage, Component) => {
  return () => {
    const { loggedIn } = globalStore.getState();
    if (validation(loggedIn)) {
      throw new Error(errorMessage);
    }
    return Component();
  };
};

// 라우트 맵 정의
router.set(
  createRouter({
    '/': DashboardPage,
    '/login': AuthGuard(Boolean, 'error', LoginPage),
    '/profile': AuthGuard(value => !value, 'login error', ProfilePage),
    '/testResultView': AuthGuard(
      value => !value,
      'login error',
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
