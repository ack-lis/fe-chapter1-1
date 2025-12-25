import { router } from './router.js';
import { NotFoundPage } from './pages/index.js';
import { ForbiddenError, UnauthorizedError } from './errors/index.js';
import { addEvent, registerGlobalEvents } from './utils/index.js';

// data-link 속성을 가진 링크 클릭 시 라우터로 네비게이션
addEvent('click', '[data-link]', e => {
  e.preventDefault();
  router.get().push(e.target.href.replace(window.location.origin, ''));
});

export function render() {
  const $root = document.querySelector('#root');

  try {
    const Page = router.get().getTarget() ?? NotFoundPage;

    $root.innerHTML = Page();
  } catch (error) {
    if (error instanceof ForbiddenError) {
      // 로그인한 사용자가 로그인 페이지 접근 시 메인으로 리다이렉션
      router.get().push('/');
      return;
    }
    if (error instanceof UnauthorizedError) {
      // 인증되지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리다이렉션
      router.get().push('/login');
      return;
    }
    console.error(error);
  }

  registerGlobalEvents();
}
