import { router } from './router.js';
import { NotFoundPage } from './pages/index.js';
import { registerGlobalEvents } from './utils/index.js';
import { globalStore } from './stores/index.js';
import { Layout } from './components/index.js';

export function render() {
  const $root = document.querySelector('#root');
  if (!$root) {
    return;
  }

  try {
    const Page = router.get().getTarget() ?? NotFoundPage;
    const { currentUser } = globalStore.getState();
    const currentPath = window.location.pathname;

    // 라우트 정보 매핑
    const routeConfig = {
      '/': {
        routeName: 'dashboard',
        pageClass: 'dashboard-page-v2',
        showCollapseButton: false
      },
      '/profile': {
        routeName: 'profile',
        pageClass: 'profile-page-v2',
        showCollapseButton: false
      },
      '/testResultView': {
        routeName: 'testResultView',
        pageClass: 'test-result-view-page',
        showCollapseButton: true
      }
    };

    const config = routeConfig[currentPath];

    // Page 실행 (에러가 발생할 수 있음)
    const contentBody = Page();

    // 로그인 페이지와 404 페이지는 사이드바가 없으므로 전체 렌더링
    const isLoginPage = currentPath === '/login';
    const isNotFoundPage = !config && currentPath !== '/login';

    if (isLoginPage || isNotFoundPage) {
      $root.innerHTML = contentBody;
      registerGlobalEvents();
      return;
    }

    // 사이드바가 있는 페이지 - 레이아웃 적용
    const pageHTML = Layout({
      routeName: config.routeName,
      pageClass: config.pageClass,
      contentBody,
      showCollapseButton: config.showCollapseButton
    });

    // 사이드바가 있는 페이지 - 부분 업데이트 최적화
    const existingSidebar = $root.querySelector('.sidebar-v2');
    const existingContainer = $root.querySelector('.dashboard-container-v2');

    if (existingSidebar && existingContainer) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pageHTML;

      // 페이지 래퍼의 클래스 업데이트 (dashboard-page-v2 -> profile-page-v2 등)
      const newPageWrapper = tempDiv.querySelector('.page');
      const currentPageWrapper = $root.querySelector('.page');
      if (newPageWrapper) {
        if (currentPageWrapper) {
          // 기존 페이지 래퍼가 있으면 클래스만 업데이트
          currentPageWrapper.className = newPageWrapper.className;
        } else {
          // 페이지 래퍼가 없으면 새로 추가
          const firstChild = $root.firstElementChild;
          if (firstChild) {
            firstChild.className = newPageWrapper.className;
          }
        }
      }

      // 메인 콘텐츠 영역 업데이트
      const newMainContent = tempDiv.querySelector('.main-content-v2');
      const currentMainContent =
        existingContainer.querySelector('.main-content-v2');

      if (newMainContent && currentMainContent) {
        currentMainContent.replaceWith(newMainContent);
      } else if (newMainContent && !currentMainContent) {
        // 메인 콘텐츠가 없으면 추가
        existingContainer.appendChild(newMainContent);
      }

      // 사이드바의 active 상태 업데이트
      updateSidebarActiveState(existingSidebar, currentUser);
    } else {
      // 사이드바가 없으면 전체 렌더링 (처음 로드 시)
      $root.innerHTML = pageHTML;
    }
  } catch (error) {
    if (error.message === 'error') {
      // 로그인한 사용자가 로그인 페이지 접근 시 메인으로 리다이렉션
      router.get().push('/');
      return;
    }
    if (error.message === 'login error') {
      // 인증되지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리다이렉션
      router.get().push('/login');
      return;
    }
    console.error(error);
  }

  registerGlobalEvents();
}

/**
 * 사이드바의 활성 상태만 업데이트 (전체 재렌더링 방지)
 */
function updateSidebarActiveState(sidebar, currentUser) {
  const currentPath = window.location.pathname;

  // 활성 라우트에 따라 nav-item의 active 클래스 업데이트
  const navItems = sidebar.querySelectorAll('.nav-item-v2');
  navItems.forEach(item => {
    const route = item.getAttribute('data-route');
    item.classList.remove('active');

    if (route === currentPath) {
      item.classList.add('active');
    }
  });

  // 사용자 정보가 변경된 경우에만 사이드바 하단 업데이트
  const currentUserInfo = sidebar.querySelector('.user-info-v2, .user-info');
  const currentUserName = currentUserInfo
    ?.querySelector('.user-name-v2, .user-name')
    ?.textContent.trim();
  const currentUserRole = currentUserInfo
    ?.querySelector('.user-role-v2, .user-role')
    ?.textContent.trim();

  // 로그인/로그아웃 상태 변경 확인
  const wasLoggedIn = currentUserInfo !== null;
  const isNowLoggedIn = currentUser !== null;

  if (wasLoggedIn !== isNowLoggedIn) {
    // 로그인/로그아웃 상태가 변경되었으므로 전체 페이지 재렌더링
    // (사이드바 구조가 완전히 바뀌므로)
    const Page = router.get().getTarget() ?? NotFoundPage;
    const $root = document.querySelector('#root');
    if ($root) {
      $root.innerHTML = Page();
    }
  } else if (
    currentUser &&
    (currentUserName !== currentUser.name ||
      currentUserRole !== currentUser.role)
  ) {
    // 사용자 정보만 변경된 경우 사이드바 footer의 텍스트만 업데이트
    const userNameEl = sidebar.querySelector('.user-name-v2');
    const userRoleEl = sidebar.querySelector('.user-role-v2');
    if (userNameEl) {
      userNameEl.textContent = currentUser.name;
    }
    if (userRoleEl) {
      userRoleEl.textContent = currentUser.role;
    }
  }
}
