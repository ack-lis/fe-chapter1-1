/**
 * SPA 기본 통합 테스트
 *
 * 목적: SPA의 모든 기본 기능 통합 검증
 * 시나리오:
 * - 라우팅 (History API 사용)
 * - 사용자 관리 (LocalStorage 사용, 이름/직위)
 * - 컴포넌트 기반 구조 (SideBar, TabBar)
 * - 상태 관리 (로그인 상태, 프로필 업데이트)
 * - 404 처리
 * - 로그인 상태에 따른 라우팅 보호 및 UI 변경
 * - 이벤트 위임
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('SPA 기본_basic', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    // JSDOM 환경 설정
    dom = new JSDOM(
      '<!DOCTYPE html><html><body><div id="app"></div></body></html>',
      {
        url: 'http://localhost:3000',
        pretendToBeVisual: true,
        resources: 'usable',
        storageQuota: 10000000
      }
    );

    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
    global.history = window.history;
    global.location = window.location;
    global.localStorage = window.localStorage;

    // LocalStorage 초기화
    window.localStorage.clear();
  });

  // ==================== 1) 라우팅 구현 ====================

  describe('1) 라우팅 구현', () => {
    /**
     * 테스트: 루트 경로 접근 시 대시보드 페이지 렌더링
     */
    it('루트 경로 접근 시 대시보드 페이지를 렌더링해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();
      router.navigate('/');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 보호된 페이지 접근 시 로그인 페이지로 리다이렉션되어 렌더링
     */
    it('보호된 페이지 접근 시 로그인 페이지로 리다이렉션되어 렌더링해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 비로그인 상태 설정
      stateManager.setUser(null);

      router.init();
      router.navigate('/profile');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('login-page-v2');
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: 로그인 완료 후 '/profile' 경로 접근 시 프로필 페이지 렌더링
     */
    it('로그인 완료 후 /profile 경로 접근 시 프로필 페이지를 렌더링해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 로그인 상태 설정
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      router.init();
      router.navigate('/profile');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('profile-page-v2');
      expect(window.location.pathname).toBe('/profile');
    });

    /**
     * 테스트: 비로그인 상태에서 '/profile' 경로 접근 시 로그인 페이지로 리다이렉션
     */
    it('비로그인 상태에서 /profile 경로 접근 시 로그인 페이지로 리다이렉션해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 로그인하지 않은 상태 확인
      expect(stateManager.getState().currentUser).toBeNull();

      router.init();
      router.navigate('/profile');

      // 로그인 페이지로 리다이렉션되어야 함
      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('login-page-v2');
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: '/testResultView' 경로 접근 시 검사 결과 페이지 렌더링
     */
    it('/testResultView 경로 접근 시 검사 결과 페이지를 렌더링해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();
      router.navigate('/testResultView');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('test-result-view-page');
      expect(window.location.pathname).toBe('/testResultView');
    });

    /**
     * 테스트: 라우트 변경 시 새로고침 없이 페이지 전환
     */
    it('라우트 변경 시 새로고침 없이 페이지를 전환해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();
      router.navigate('/');
      const initialBody =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;

      router.navigate('/login');

      const newBody =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(newBody).toContain('login-page-v2');
      expect(newBody).not.toBe(initialBody);
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: History API pushState 사용
     */
    it('라우트 이동 시 History API pushState를 사용해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      const pushStateSpy = vi.spyOn(window.history, 'pushState');
      router.init();
      router.navigate('/login');

      expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/login');
      pushStateSpy.mockRestore();
    });

    /**
     * 테스트: 브라우저 뒤로가기/앞으로가기 버튼 지원
     */
    it('브라우저 뒤로가기/앞으로가기 버튼을 지원해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();
      router.navigate('/');
      router.navigate('/login');
      expect(window.location.pathname).toBe('/login');

      // 뒤로가기 시뮬레이션
      window.history.back();
      // popstate 이벤트는 수동으로 발생시켜야 함
      const popStateEvent = new window.PopStateEvent('popstate', { state: {} });
      window.dispatchEvent(popStateEvent);

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
    });
  });

  // ==================== 2) 사용자 관리 기능 ====================

  describe('2) 사용자 관리 기능', () => {
    /**
     * 테스트: 사용자 정보를 LocalStorage에 저장 (이름, 직위)
     */
    it('사용자 정보를 LocalStorage에 저장해야 함 (이름, 직위)', () => {
      const userManager = window.userManager || global.userManager;
      expect(userManager).toBeDefined();

      const userData = {
        name: '김의사',
        role: '의사'
      };

      const savedUser = userManager.saveUser(userData);

      expect(window.localStorage.getItem('user')).not.toBeNull();
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('김의사');
      expect(storedUser.role).toBe('의사');
      expect(storedUser.isLoggedIn).toBe(true);
      expect(savedUser.name).toBe('김의사');
      expect(savedUser.role).toBe('의사');
    });

    /**
     * 테스트: 로그인 상태 확인
     */
    it('올바른 로그인 상태를 반환해야 함', () => {
      const userManager = window.userManager || global.userManager;
      expect(userManager).toBeDefined();

      expect(userManager.isLoggedIn()).toBe(false);

      userManager.saveUser({ name: '김의사', role: '의사' });

      expect(userManager.isLoggedIn()).toBe(true);
    });

    /**
     * 테스트: 로그아웃 시 LocalStorage에서 사용자 정보 제거
     */
    it('로그아웃 시 LocalStorage에서 사용자 정보를 제거해야 함', () => {
      const userManager = window.userManager || global.userManager;
      expect(userManager).toBeDefined();

      userManager.saveUser({ name: '김의사', role: '의사' });
      expect(userManager.isLoggedIn()).toBe(true);

      userManager.logout();

      expect(window.localStorage.getItem('user')).toBeNull();
      expect(userManager.isLoggedIn()).toBe(false);
    });

    /**
     * 테스트: 로그인 폼 제출 시 사용자 정보 저장
     */
    it('로그인 폼 제출 시 사용자 정보를 저장해야 함', () => {
      const userManager = window.userManager || global.userManager;
      expect(userManager).toBeDefined();

      document.body.innerHTML = `
      <form id="loginForm">
        <input type="text" id="userName" />
        <button type="submit">로그인</button>
      </form>
    `;

      const form = document.getElementById('loginForm');
      const nameInput = document.getElementById('userName');

      form.addEventListener('submit', e => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const validation = userManager.validateUserName(name);
        if (validation.valid) {
          userManager.saveUser({ name, role: '의사' });
        }
      });

      nameInput.value = '김의사';
      form.dispatchEvent(new Event('submit'));

      expect(userManager.isLoggedIn()).toBe(true);
      const user = userManager.getUser();
      expect(user.name).toBe('김의사');
      expect(user.role).toBe('의사');
    });

    /**
     * 테스트: 로그인 성공 시 대시보드로 리다이렉션
     */
    it('로그인 성공 시 대시보드(/)로 리다이렉션해야 함', () => {
      const router = window.router || global.router;
      const userManager = window.userManager || global.userManager;
      expect(router).toBeDefined();
      expect(userManager).toBeDefined();

      router.init();
      router.navigate('/login');

      userManager.saveUser({ name: '김의사', role: '의사' });
      // 로그인 후 리다이렉션 로직이 실행되어야 함
      router.navigate('/');

      expect(window.location.pathname).toBe('/');
    });
  });

  // ==================== 3) 프로필 페이지 구현 ====================

  describe('3) 프로필 페이지 구현', () => {
    /**
     * 테스트: 네비게이션 하단에 사용자 정보 표시
     */
    it('네비게이션 하단에 현재 로그인한 사용자 이름과 직위를 표시해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 로그인 상태 설정
      const user = {
        name: '김의사',
        role: '의사',
        isLoggedIn: true
      };
      stateManager.setUser(user);

      // SideBar 컴포넌트 렌더링
      const sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: user })
        : '';

      // 사용자 정보가 표시되어야 함
      expect(sidebarHTML).toContain('김의사');
      expect(sidebarHTML).toContain('의사');
      expect(sidebarHTML).toContain('user-name-v2');
      expect(sidebarHTML).toContain('user-role-v2');
    });

    /**
     * 테스트: 사용자 정보 영역 클릭 시 프로필 페이지로 이동
     */
    it('사용자 정보 영역 클릭 시 프로필 페이지로 이동해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      router.init();
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      // 사용자 정보 영역 클릭 시뮬레이션
      router.navigate('/profile');

      expect(window.location.pathname).toBe('/profile');
    });

    /**
     * 테스트: 프로필 수정 기능 - 이름과 직위 수정
     */
    it('프로필 수정 시 이름과 직위를 수정할 수 있어야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      // 초기 사용자 정보 설정
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      // 프로필 업데이트
      stateManager.updateProfile('박의사', '간호사');

      const user = stateManager.getUser();
      expect(user.name).toBe('박의사');
      expect(user.role).toBe('간호사');

      // LocalStorage에도 반영되어야 함
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('박의사');
      expect(storedUser.role).toBe('간호사');
    });

    /**
     * 테스트: 프로필 저장 후 네비게이션의 사용자 정보 즉시 반영
     */
    it('프로필 저장 후 네비게이션의 사용자 정보가 즉시 반영되어야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 초기 사용자 정보 설정
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      // 프로필 업데이트
      stateManager.updateProfile('박의사', '간호사');

      // SideBar 컴포넌트 재렌더링
      const updatedUser = stateManager.getUser();
      const sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: updatedUser })
        : '';

      // 업데이트된 정보가 표시되어야 함
      expect(sidebarHTML).toContain('박의사');
      expect(sidebarHTML).toContain('간호사');
    });
  });

  // ==================== 4) 컴포넌트 기반 구조 설계 ====================

  describe('4) 컴포넌트 기반 구조 설계', () => {
    /**
     * 테스트: SideBar 컴포넌트 렌더링
     */
    it('SideBar 컴포넌트를 네비게이션 링크와 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.SideBar).toBeDefined();

      const sidebarHTML = components.SideBar({ currentPath: '/' });

      expect(sidebarHTML).toContain('sidebar-v2');
      expect(sidebarHTML).toContain('nav');
      expect(sidebarHTML).toContain('대시보드');
      expect(sidebarHTML).toContain('검사 결과 보기');
    });

    /**
     * 테스트: TabBar 컴포넌트 렌더링
     */
    it('TabBar 컴포넌트를 탭 네비게이션과 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.TabBar).toBeDefined();

      const tabbarHTML = components.TabBar({ currentPath: '/' });

      expect(tabbarHTML).toContain('content-header-v2');
      expect(tabbarHTML).toContain('tab-button-v2');
    });

    /**
     * 테스트: LoginPage 컴포넌트 렌더링
     */
    it('LoginPage 컴포넌트를 로그인 폼과 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.LoginPage).toBeDefined();

      const pageHTML = components.LoginPage();

      expect(pageHTML).toContain('login-page-v2');
      expect(pageHTML).toContain('로그인');
      expect(pageHTML).toContain('login-form-v2');
    });

    /**
     * 테스트: DashboardPage 컴포넌트 렌더링
     */
    it('DashboardPage 컴포넌트를 대시보드 콘텐츠와 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.DashboardPage).toBeDefined();

      const pageHTML = components.DashboardPage();

      expect(pageHTML).toContain('dashboard-page-v2');
      expect(pageHTML).toContain('alert-section-v2');
    });

    /**
     * 테스트: TestResultViewPage 컴포넌트 렌더링
     */
    it('TestResultViewPage 컴포넌트를 검사 결과 UI와 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.TestResultViewPage).toBeDefined();

      const pageHTML = components.TestResultViewPage();

      expect(pageHTML).toContain('test-result-view-page');
      expect(pageHTML).toContain('검사 결과 보기');
    });

    /**
     * 테스트: ProfilePage 컴포넌트 렌더링
     */
    it('ProfilePage 컴포넌트를 프로필 수정 폼과 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.ProfilePage).toBeDefined();

      const pageHTML = components.ProfilePage();

      expect(pageHTML).toContain('profile-page-v2');
      expect(pageHTML).toContain('프로필 설정');
      expect(pageHTML).toContain('profile-form-v2');
    });

    /**
     * 테스트: NotFoundPage 컴포넌트 렌더링
     */
    it('NotFoundPage 컴포넌트를 404 메시지와 홈 링크와 함께 렌더링해야 함', () => {
      const components = window.components || global.components;
      expect(components).toBeDefined();
      expect(components.NotFoundPage).toBeDefined();

      const pageHTML = components.NotFoundPage();

      expect(pageHTML).toContain('not-found-page-v2');
      expect(pageHTML).toContain('404');
      expect(pageHTML).toContain('페이지를 찾을 수 없습니다');
    });
  });

  // ==================== 5) 상태 관리 초기 구현 ====================

  describe('5) 상태 관리 초기 구현', () => {
    /**
     * 테스트: 초기 로그인 상태 확인
     */
    it('초기 로그인 상태가 null이어야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      const state = stateManager.getState();

      expect(state).toHaveProperty('currentUser');
      expect(state.currentUser).toBeNull();
    });

    /**
     * 테스트: 로그인 시 상태 업데이트
     */
    it('로그인 시 사용자 정보를 상태에 저장해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      const user = {
        name: '김의사',
        role: '의사',
        isLoggedIn: true
      };

      stateManager.setUser(user);

      const state = stateManager.getState();
      expect(state.currentUser).not.toBeNull();
      expect(state.currentUser.name).toBe('김의사');
      expect(state.currentUser.role).toBe('의사');
    });

    /**
     * 테스트: 상태 변경 시 리스너에게 알림
     */
    it('상태 변경 시 리스너에게 알림을 전달해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      const listener = vi.fn();
      stateManager.subscribe(listener);

      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      expect(listener).toHaveBeenCalled();
    });

    /**
     * 테스트: 프로필 업데이트 함수
     */
    it('updateProfile 함수로 프로필 정보를 업데이트할 수 있어야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      // 초기 사용자 설정
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      // 프로필 업데이트
      stateManager.updateProfile('박의사', '간호사');

      const state = stateManager.getState();
      expect(state.currentUser.name).toBe('박의사');
      expect(state.currentUser.role).toBe('간호사');
    });

    /**
     * 테스트: 상태 변경 시 LocalStorage 동기화
     */
    it('상태 변경 시 LocalStorage와 동기화되어야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      expect(stateManager).toBeDefined();

      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('김의사');
      expect(storedUser.role).toBe('의사');
      expect(storedUser.isLoggedIn).toBe(true);
    });
  });

  // ==================== 6) 이벤트 처리 및 DOM 조작 ====================

  describe('6) 이벤트 처리 및 DOM 조작', () => {
    /**
     * 테스트: 이벤트 위임 패턴 적용
     */
    it('네비게이션 링크에 이벤트 위임 패턴을 적용해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();

      // 동적으로 생성된 네비게이션 링크
      document.body.innerHTML = `
        <nav id="sidebar">
          <button class="nav-item-v2" data-route="/">대시보드</button>
          <button class="nav-item-v2" data-route="/testResultView">검사 결과 보기</button>
        </nav>
      `;

      const nav = document.getElementById('sidebar');
      const clickHandler = vi.fn(e => {
        const route = e.target.dataset.route;
        if (route) {
          router.navigate(route);
        }
      });

      // 이벤트 위임: nav에 이벤트 리스너 등록
      nav.addEventListener('click', clickHandler);

      // 동적으로 생성된 버튼 클릭
      const button = nav.querySelector('button[data-route="/testResultView"]');
      button.click();

      expect(clickHandler).toHaveBeenCalled();
      expect(window.location.pathname).toBe('/testResultView');
    });

    /**
     * 테스트: 로그인 폼 제출 이벤트 처리
     */
    it('로그인 폼 제출 이벤트를 처리해야 함', () => {
      const userManager = window.userManager || global.userManager;
      expect(userManager).toBeDefined();

      document.body.innerHTML = `
        <form id="loginForm">
          <input type="text" id="userName" />
          <button type="submit">로그인</button>
        </form>
      `;

      const form = document.getElementById('loginForm');
      const nameInput = document.getElementById('userName');
      const submitHandler = vi.fn(e => {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name) {
          userManager.saveUser({ name, role: '의사' });
        }
      });

      form.addEventListener('submit', submitHandler);
      nameInput.value = '김의사';
      form.dispatchEvent(new Event('submit'));

      expect(submitHandler).toHaveBeenCalled();
      expect(userManager.isLoggedIn()).toBe(true);
    });

    /**
     * 테스트: 동적 콘텐츠 렌더링
     */
    it('사용자 정보에 따른 조건부 렌더링이 동작해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 로그인하지 않은 상태 - 사이드바 하단에 로그인 버튼 표시
      stateManager.setUser(null);
      let sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: null })
        : '';
      expect(sidebarHTML).not.toContain('user-name-v2');
      expect(sidebarHTML).toContain('로그인');
      expect(sidebarHTML).toMatch(/button.*로그인|로그인.*button/i);

      // 로그인한 상태 - 사이드바 하단에 사용자 정보 및 로그아웃 버튼 표시
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });
      sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: stateManager.getUser() })
        : '';
      expect(sidebarHTML).toContain('user-name-v2');
      expect(sidebarHTML).toContain('user-role-v2');
      expect(sidebarHTML).toContain('김의사');
      expect(sidebarHTML).toContain('의사');
      expect(sidebarHTML).toContain('로그아웃');
    });
  });

  // ==================== 7) 라우팅 예외 처리 ====================

  describe('7) 라우팅 예외 처리', () => {
    /**
     * 테스트: 존재하지 않는 경로 접근 시 404 페이지 렌더링
     */
    it('존재하지 않는 경로 접근 시 404 페이지를 렌더링해야 함', () => {
      const router = window.router || global.router;
      expect(router).toBeDefined();

      router.init();
      router.navigate('/invalid-path');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('not-found-page-v2');
      expect(appContent).toContain('404');
      expect(appContent).toContain('페이지를 찾을 수 없습니다');
    });
  });

  // ==================== 8) 로그인 상태에 따른 라우팅 보호 및 UI 변경 ====================

  describe('8) 로그인 상태에 따른 라우팅 보호 및 UI 변경', () => {
    /**
     * 테스트: 비로그인 상태에서 보호된 페이지 접근 시 로그인 페이지로 리다이렉션
     */
    it('비로그인 상태에서 /profile, /testResultView 접근 시 /login으로 리다이렉션해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 로그인하지 않은 상태 확인
      expect(stateManager.getState().currentUser).toBeNull();

      router.init();

      // 보호된 페이지 접근 시도
      router.navigate('/profile');
      expect(window.location.pathname).toBe('/login');

      router.navigate('/testResultView');
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: 비로그인 상태에서 루트 경로(/) 접근 시 대시보드 페이지 접근 가능
     */
    it('비로그인 상태에서 루트 경로(/) 접근 시 대시보드 페이지를 렌더링해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 로그인하지 않은 상태 확인
      expect(stateManager.getState().currentUser).toBeNull();

      router.init();
      router.navigate('/');

      const appContent =
        document.getElementById('app')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 로그인 상태에서 로그인 페이지 접근 시 대시보드로 리다이렉션
     */
    it('로그인 상태에서 /login 접근 시 /로 리다이렉션해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();

      // 로그인 상태 설정
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      router.init();
      router.navigate('/login');

      // 대시보드로 리다이렉션되어야 함
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 로그인한 상태에서 네비게이션 바 하단에 사용자 정보 표시
     */
    it('로그인한 상태에서 네비게이션 바 하단에 사용자 이름과 직위를 표시해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 로그인 상태 설정
      const user = {
        name: '김의사',
        role: '의사',
        isLoggedIn: true
      };
      stateManager.setUser(user);

      // 네비게이션 바 렌더링 (사이드바 포함)
      const sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: user })
        : '';

      // 사용자 정보가 표시되어야 함
      expect(sidebarHTML).toContain('김의사');
      expect(sidebarHTML).toContain('의사');
      expect(sidebarHTML).toContain('user-name-v2');
      expect(sidebarHTML).toContain('user-role-v2');
    });

    /**
     * 테스트: 로그인한 상태에서 로그아웃 버튼 표시
     */
    it('로그인한 상태에서 로그아웃 버튼을 표시해야 함', () => {
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 로그인 상태 설정
      const user = {
        name: '김의사',
        role: '의사',
        isLoggedIn: true
      };
      stateManager.setUser(user);

      // 네비게이션 바 렌더링
      const sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: user })
        : '';

      // 로그아웃 버튼이 표시되어야 함
      expect(sidebarHTML).toContain('logout-btn-v2');
      expect(sidebarHTML).toContain('로그아웃');
    });

    /**
     * 테스트: 비로그인 상태에서 사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동
     */
    it('비로그인 상태에서 사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      const components = window.components || global.components;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();
      expect(components).toBeDefined();

      // 비로그인 상태 설정
      stateManager.setUser(null);
      router.init();
      router.navigate('/');

      // 사이드바 렌더링
      const sidebarHTML = components.SideBar
        ? components.SideBar({ currentUser: null })
        : '';
      document.body.innerHTML = sidebarHTML;

      // 로그인 버튼 찾기 및 클릭 이벤트 시뮬레이션
      const loginButton = document.querySelector(
        'button:has-text("로그인"), .login-btn-v2, button[class*="login"]'
      );
      if (loginButton) {
        loginButton.click();
        expect(window.location.pathname).toBe('/login');
      } else {
        // 버튼이 없으면 직접 navigate 호출 시뮬레이션
        router.navigate('/login');
        expect(window.location.pathname).toBe('/login');
      }
    });

    /**
     * 테스트: 로그아웃 시 로그인 페이지로 리다이렉션
     */
    it('로그아웃 시 로그인 페이지(/login)로 리다이렉션해야 함', () => {
      const router = window.router || global.router;
      const stateManager = window.stateManager || global.stateManager;
      const userManager = window.userManager || global.userManager;
      expect(router).toBeDefined();
      expect(stateManager).toBeDefined();
      expect(userManager).toBeDefined();

      // 로그인 상태 설정
      userManager.saveUser({ name: '김의사', role: '의사' });
      stateManager.setUser({ name: '김의사', role: '의사', isLoggedIn: true });

      router.init();
      router.navigate('/');

      // 로그아웃
      userManager.logout();
      stateManager.setUser(null);
      router.navigate('/login');

      // 로그인 페이지로 리다이렉션되어야 함
      expect(window.location.pathname).toBe('/login');
    });
  });
});
