/* eslint-env browser */
import { addEvent } from '../utils/index.js';
import { router } from '../router.js';
import { globalStore } from '../stores/index.js';
import { userStorage } from '../storages/index.js';

/**
 * SideBar 컴포넌트
 * @param {Object} options - 사이드바 옵션
 * @param {string} options.activeRoute - 활성화된 라우트 ('dashboard' | 'testResultView' | 'profile')
 * @param {Object|null} options.currentUser - 현재 사용자 정보 (null이면 비로그인 상태)
 * @param {string} options.currentUser.name - 사용자 이름
 * @param {string} options.currentUser.role - 사용자 직위
 * @param {boolean} options.showCollapseButton - 접기 버튼 표시 여부 (기본값: false)
 * @returns {string} 사이드바 HTML 문자열
 */
export const SideBar = ({
  activeRoute = 'dashboard',
  currentUser = null,
  showCollapseButton = false
}) => {
  const isDashboardActive = activeRoute === 'dashboard';
  const isTestResultViewActive = activeRoute === 'testResultView';
  const isProfileActive = activeRoute === 'profile';

  // 로그인 상태 확인
  const isLoggedIn = currentUser !== null && currentUser !== undefined;

  // user-info가 button인지 div인지 결정 (DashboardPage와 ProfilePage는 button, TestResultViewPage는 div)
  const userInfoTag = activeRoute === 'testResultView' ? 'div' : 'button';

  console.log('isLoggedIn', isLoggedIn);

  return `
    <div class="sidebar-v2">
      <div class="sidebar-header-v2">
        <h2 class="sidebar-title-v2">MediGuard LIS</h2>
        <p class="sidebar-subtitle-v2">차세대 환자 안전 플랫폼</p>
      </div>

      <nav class="sidebar-nav-v2">
        <button class="nav-item-v2 ${isDashboardActive ? 'active' : ''}" data-route="/">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>대시보드</span>
        </button>
        <button class="nav-item-v2 ${isTestResultViewActive ? 'active' : ''}" data-route="/testResultView">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M16 13H8"></path>
            <path d="M16 17H8"></path>
            <path d="M10 9H8"></path>
          </svg>
          <span>검사 결과 보기</span>
        </button>
        ${
  isLoggedIn
    ? `
        <button class="nav-item-v2 ${isProfileActive ? 'active' : ''}" data-route="/profile">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
          <span>프로필 설정</span>
        </button>
        `
    : ''
}
      </nav>

      <div class="sidebar-footer-v2">
        ${
  isLoggedIn
    ? `
        <${userInfoTag} class="user-info-v2">
          <div class="user-name-v2">${currentUser.name || '김의사'}</div>
          <div class="user-role-v2">${currentUser.role || '의사'}</div>
        </${userInfoTag}>
        <button class="logout-btn-v2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.67 4.67L13.33 8L10.67 11.33" stroke="#364153" stroke-width="1.33"/>
            <path d="M6 8H13.33" stroke="#364153" stroke-width="1.33"/>
            ${activeRoute === 'testResultView' ? '' : '<path d="M2 2V14" stroke="#364153" stroke-width="1.33"/>'}
          </svg>
          <span>로그아웃</span>
        </button>
        `
    : `
        <button class="login-btn-v2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 4L12 8L8 12" stroke="white" stroke-width="1.33"/>
            <path d="M4 8H12" stroke="white" stroke-width="1.33"/>
          </svg>
          <span>로그인</span>
        </button>
        `
}
      </div>
      ${
  showCollapseButton
    ? `
      <button class="sidebar-collapse-btn-v2">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="#4A5565" stroke-width="1.33" stroke-linecap="round"/>
        </svg>
      </button>
      `
    : ''
}
    </div>
  `;
};

// 네비게이션 아이템 클릭 핸들러
addEvent('click', '.nav-item-v2', e => {
  e.preventDefault();
  const route = e.target.closest('.nav-item-v2').getAttribute('data-route');
  if (route) {
    router.get().push(route);
  }
});

// 로그인 버튼 클릭 핸들러
addEvent('click', '.login-btn-v2', e => {
  e.preventDefault();
  router.get().push('/login');
});

// 로그아웃 버튼 클릭 핸들러
addEvent('click', '.logout-btn-v2', e => {
  e.preventDefault();
  globalStore.setState({ currentUser: null });
  userStorage.reset();
  router.get().push('/login');
});

// 사용자 정보 영역 클릭 핸들러 (프로필 페이지로 이동)
addEvent('click', '.user-info-v2', e => {
  e.preventDefault();
  const { currentUser } = globalStore.getState();
  if (currentUser) {
    router.get().push('/profile');
  }
});
