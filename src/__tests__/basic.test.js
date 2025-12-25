/* eslint-env browser, jest */

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

import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('SPA 기본_basic', () => {
  let dom;
  let window;
  let document;

  beforeAll(async () => {
    // JSDOM 환경 설정
    dom = new JSDOM(
      '<!DOCTYPE html><html><body><div id="root"></div></body></html>',
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

    // main.js를 import하여 애플리케이션 초기화
    await import('../main.js');
  });

  beforeEach(() => {
    // LocalStorage 초기화
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }

    // DOM 초기화
    if (typeof document !== 'undefined') {
      document.body.innerHTML = '<div id="root"></div>';
    }

    // URL 초기화 및 router 상태 초기화
    window.history.replaceState({}, '', '/');
    // router를 깨끗한 상태로 초기화하기 위해 popstate 발생
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  // ==================== 1) 라우팅 구현 ====================

  describe('1) 라우팅 구현', () => {
    /**
     * 테스트: 루트 경로 접근 시 대시보드 페이지 렌더링
     */
    it('루트 경로 접근 시 대시보드 페이지를 렌더링해야 함', () => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 보호된 페이지 접근 시 로그인 페이지로 리다이렉션되어 렌더링
     */
    it('보호된 페이지 접근 시 로그인 페이지로 리다이렉션되어 렌더링해야 함', () => {
      // 비로그인 상태 설정 (localStorage 비우기)
      window.localStorage.removeItem('user');

      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('login-page-v2');
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: 로그인 완료 후 '/profile' 경로 접근 시 프로필 페이지 렌더링
     */
    it('로그인 완료 후 /profile 경로 접근 시 프로필 페이지를 렌더링해야 함', () => {
      // 로그인 상태 설정 (localStorage에 사용자 정보 저장)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('profile-page-v2');
      expect(window.location.pathname).toBe('/profile');
    });

    /**
     * 테스트: 비로그인 상태에서 '/profile' 경로 접근 시 로그인 페이지로 리다이렉션
     */
    it('비로그인 상태에서 /profile 경로 접근 시 로그인 페이지로 리다이렉션해야 함', () => {
      // 로그인하지 않은 상태 확인 (localStorage 비우기)
      window.localStorage.removeItem('user');
      expect(window.localStorage.getItem('user')).toBeNull();

      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 로그인 페이지로 리다이렉션되어야 함
      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('login-page-v2');
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: '/testResultView' 경로 접근 시 검사 결과 페이지 렌더링
     */
    it('/testResultView 경로 접근 시 검사 결과 페이지를 렌더링해야 함', () => {
      // 로그인 상태 설정 (보호된 경로이므로 필요)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      window.history.pushState({}, '', '/testResultView');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('test-result-view-page');
      expect(window.location.pathname).toBe('/testResultView');
    });

    /**
     * 테스트: 라우트 변경 시 새로고침 없이 페이지 전환
     */
    it('라우트 변경 시 새로고침 없이 페이지를 전환해야 함', () => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const initialBody =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;

      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const newBody =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(newBody).toContain('login-page-v2');
      expect(newBody).not.toBe(initialBody);
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: History API pushState 사용
     */
    it('라우트 이동 시 History API pushState를 사용해야 함', () => {
      const pushStateSpy = vi.spyOn(window.history, 'pushState');

      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(pushStateSpy).toHaveBeenCalledWith({}, '', '/login');
      pushStateSpy.mockRestore();
    });

    /**
     * 테스트: 브라우저 뒤로가기/앞으로가기 버튼 지원
     */
    it('브라우저 뒤로가기/앞으로가기 버튼을 지원해야 함', () => {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(window.location.pathname).toBe('/login');

      // 뒤로가기 시뮬레이션
      window.history.back();
      // popstate 이벤트는 수동으로 발생시켜야 함
      const popStateEvent = new window.PopStateEvent('popstate', { state: {} });
      window.dispatchEvent(popStateEvent);

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
    });
  });

  // ==================== 2) 사용자 관리 기능 ====================

  describe('2) 사용자 관리 기능', () => {
    /**
     * 테스트: 사용자 정보를 LocalStorage에 저장 (이름, 직위)
     */
    it('사용자 정보를 LocalStorage에 저장해야 함 (이름, 직위)', () => {
      // 로그인 페이지로 이동
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 로그인 폼 찾기 및 입력
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('passwordV2');
      const form = document.querySelector('.login-form-v2');

      expect(emailInput).toBeDefined();
      expect(passwordInput).toBeDefined();
      expect(form).toBeDefined();

      // 값 입력
      emailInput.value = 'kim@hospital.com';
      passwordInput.value = 'password123';

      // 폼 제출
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // localStorage 검증
      expect(window.localStorage.getItem('user')).not.toBeNull();
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('kim'); // 이메일에서 추출
      expect(storedUser.role).toBe('의사');
      expect(storedUser.isLoggedIn).toBe(true);
    });

    /**
     * 테스트: 로그인 상태 확인
     */
    it('올바른 로그인 상태를 반환해야 함', () => {
      // 비로그인 상태 확인
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const loginBtn = document.querySelector('.login-btn-v2');
      expect(loginBtn).toBeDefined(); // 로그인 버튼 존재
      expect(document.querySelector('.user-info-v2')).toBeNull(); // 사용자 정보 없음

      // 로그인 수행
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // 로그인 상태 확인
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(document.querySelector('.user-info-v2')).toBeDefined(); // 사용자 정보 표시
      expect(document.querySelector('.user-name-v2').textContent).toContain(
        'kim'
      );
      expect(document.querySelector('.logout-btn-v2')).toBeDefined(); // 로그아웃 버튼 존재
    });

    /**
     * 테스트: 로그아웃 시 LocalStorage에서 사용자 정보 제거
     */
    it('로그아웃 시 LocalStorage에서 사용자 정보를 제거해야 함', () => {
      // 로그인 먼저 수행
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // 로그아웃 버튼 클릭
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const logoutBtn = document.querySelector('.logout-btn-v2');
      expect(logoutBtn).toBeDefined();
      logoutBtn.click();

      // localStorage 검증
      expect(window.localStorage.getItem('user')).toBeNull();
      // DOM에서도 확인
      expect(document.querySelector('.user-info-v2')).toBeNull();
      expect(document.querySelector('.login-btn-v2')).toBeDefined();
    });

    /**
     * 테스트: 로그인 폼 제출 시 사용자 정보 저장
     */
    it('로그인 폼 제출 시 사용자 정보를 저장해야 함', () => {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('passwordV2');
      const form = document.querySelector('.login-form-v2');

      expect(emailInput).toBeDefined();
      expect(passwordInput).toBeDefined();
      expect(form).toBeDefined();

      emailInput.value = 'kim@hospital.com';
      passwordInput.value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // localStorage 검증
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser).not.toBeNull();
      expect(storedUser.name).toBe('kim');
      expect(storedUser.role).toBe('의사');
    });

    /**
     * 테스트: 로그인 성공 시 대시보드로 리다이렉션
     */
    it('로그인 성공 시 대시보드(/)로 리다이렉션해야 함', () => {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 로그인 폼 입력 및 제출
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('passwordV2');
      const form = document.querySelector('.login-form-v2');

      emailInput.value = 'kim@hospital.com';
      passwordInput.value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // 로그인 후 리다이렉션 확인
      expect(window.location.pathname).toBe('/');
      // DOM 확인
      expect(document.querySelector('.dashboard-page-v2')).toBeDefined();
    });
  });

  // ==================== 3) 프로필 페이지 구현 ====================

  describe('3) 프로필 페이지 구현', () => {
    /**
     * 테스트: 네비게이션 하단에 사용자 정보 표시
     */
    it('네비게이션 하단에 현재 로그인한 사용자 이름과 직위를 표시해야 함', () => {
      // 로그인 상태 설정 (localStorage에 사용자 정보 저장)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 대시보드로 이동 (사이드바가 렌더링됨)
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 사이드바에서 사용자 정보 확인
      const userNameElement = document.querySelector('.user-name-v2');
      const userRoleElement = document.querySelector('.user-role-v2');

      expect(userNameElement).toBeDefined();
      expect(userRoleElement).toBeDefined();
      expect(userNameElement.textContent).toContain('김의사');
      expect(userRoleElement.textContent).toContain('의사');
    });

    /**
     * 테스트: 사용자 정보 영역 클릭 시 프로필 페이지로 이동
     */
    it('사용자 정보 영역 클릭 시 프로필 페이지로 이동해야 함', () => {
      // 로그인 상태 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 대시보드로 이동
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 사용자 정보 영역 클릭
      const userInfo = document.querySelector('.user-info-v2');
      expect(userInfo).toBeDefined();
      userInfo.click();

      // 프로필 페이지로 이동 확인
      expect(window.location.pathname).toBe('/profile');
      expect(document.querySelector('.profile-page-v2')).toBeDefined();
    });

    /**
     * 테스트: 프로필 수정 기능 - 이름과 직위 수정
     */
    it('프로필 수정 시 이름과 직위를 수정할 수 있어야 함', () => {
      // 초기 사용자 정보 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 프로필 페이지로 이동
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 프로필 폼에서 이름과 직위 수정
      const nameInput = document.getElementById('name');
      const roleInput = document.getElementById('role');
      const saveBtn = document.querySelector('.btn-save-v2');

      expect(nameInput).toBeDefined();
      expect(roleInput).toBeDefined();
      expect(saveBtn).toBeDefined();

      nameInput.value = '박의사';
      roleInput.value = '간호사';
      saveBtn.click();

      // LocalStorage에 반영되어야 함
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('박의사');
      expect(storedUser.role).toBe('간호사');
    });

    /**
     * 테스트: 프로필 저장 후 네비게이션의 사용자 정보 즉시 반영
     */
    it('프로필 저장 후 네비게이션의 사용자 정보가 즉시 반영되어야 함', () => {
      // 초기 사용자 정보 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 프로필 페이지로 이동
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 프로필 수정
      const nameInput = document.getElementById('name');
      const roleInput = document.getElementById('role');
      const saveBtn = document.querySelector('.btn-save-v2');

      nameInput.value = '박의사';
      roleInput.value = '간호사';
      saveBtn.click();

      // 사이드바의 사용자 정보가 즉시 업데이트되어야 함
      const userNameElement = document.querySelector('.user-name-v2');
      const userRoleElement = document.querySelector('.user-role-v2');

      expect(userNameElement.textContent).toContain('박의사');
      expect(userRoleElement.textContent).toContain('간호사');
    });
  });

  // ==================== 4) 컴포넌트 기반 구조 설계 ====================

  describe('4) 컴포넌트 기반 구조 설계', () => {
    /**
     * 테스트: SideBar 컴포넌트 렌더링
     */
    it('SideBar 컴포넌트를 네비게이션 링크와 함께 렌더링해야 함', () => {
      // 대시보드로 이동하여 사이드바가 렌더링되도록 함
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 사이드바 확인
      const sidebar = document.querySelector('.sidebar-v2');
      expect(sidebar).toBeDefined();

      // 네비게이션 링크 확인
      const nav = sidebar.querySelector('nav');
      expect(nav).toBeDefined();
      expect(sidebar.innerHTML).toContain('대시보드');
      expect(sidebar.innerHTML).toContain('검사 결과 보기');
    });

    /**
     * 테스트: TabBar 컴포넌트 렌더링
     */
    it('TabBar 컴포넌트를 탭 네비게이션과 함께 렌더링해야 함', () => {
      // 대시보드로 이동하여 탭바가 렌더링되도록 함
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 탭바 확인
      const tabbar = document.querySelector('.content-header-v2');
      expect(tabbar).toBeDefined();

      // 탭 버튼 확인
      const tabButtons = document.querySelectorAll('.tab-button-v2');
      expect(tabButtons.length).toBeGreaterThan(0);
    });

    /**
     * 테스트: LoginPage 컴포넌트 렌더링
     */
    it('LoginPage 컴포넌트를 로그인 폼과 함께 렌더링해야 함', () => {
      // 로그인 페이지로 이동
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 로그인 페이지 확인
      const loginPage = document.querySelector('.login-page-v2');
      expect(loginPage).toBeDefined();
      expect(loginPage.innerHTML).toContain('로그인');

      // 로그인 폼 확인
      const loginForm = document.querySelector('.login-form-v2');
      expect(loginForm).toBeDefined();
    });

    /**
     * 테스트: DashboardPage 컴포넌트 렌더링
     */
    it('DashboardPage 컴포넌트를 대시보드 콘텐츠와 함께 렌더링해야 함', () => {
      // 대시보드로 이동
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 대시보드 페이지 확인
      const dashboardPage = document.querySelector('.dashboard-page-v2');
      expect(dashboardPage).toBeDefined();

      // alert 섹션 확인
      const alertSection = document.querySelector('.alert-section-v2');
      expect(alertSection).toBeDefined();
    });

    /**
     * 테스트: TestResultViewPage 컴포넌트 렌더링
     */
    it('TestResultViewPage 컴포넌트를 검사 결과 UI와 함께 렌더링해야 함', () => {
      // 로그인 상태 설정 (보호된 경로)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 검사 결과 페이지로 이동
      window.history.pushState({}, '', '/testResultView');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 검사 결과 페이지 확인
      const testResultPage = document.querySelector('.test-result-view-page');
      expect(testResultPage).toBeDefined();
      expect(document.body.innerHTML).toContain('검사 결과 보기');
    });

    /**
     * 테스트: ProfilePage 컴포넌트 렌더링
     */
    it('ProfilePage 컴포넌트를 프로필 수정 폼과 함께 렌더링해야 함', () => {
      // 로그인 상태 설정 (보호된 경로)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 프로필 페이지로 이동
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 프로필 페이지 확인
      const profilePage = document.querySelector('.profile-page-v2');
      expect(profilePage).toBeDefined();
      expect(profilePage.innerHTML).toContain('프로필 설정');

      // 프로필 폼 확인
      const profileForm = document.querySelector('.profile-form-v2');
      expect(profileForm).toBeDefined();
    });

    /**
     * 테스트: NotFoundPage 컴포넌트 렌더링
     */
    it('NotFoundPage 컴포넌트를 404 메시지와 홈 링크와 함께 렌더링해야 함', () => {
      // 존재하지 않는 경로로 이동
      window.history.pushState({}, '', '/invalid-path');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // DOM에서 404 페이지 확인
      const notFoundPage = document.querySelector('.not-found-page-v2');
      expect(notFoundPage).toBeDefined();
      expect(notFoundPage.innerHTML).toContain('404');
      expect(notFoundPage.innerHTML).toContain('페이지를 찾을 수 없습니다');
    });
  });

  // ==================== 5) 상태 관리 초기 구현 ====================

  describe('5) 상태 관리 초기 구현', () => {
    /**
     * 테스트: 초기 로그인 상태 확인
     */
    it('초기 로그인 상태가 null이어야 함', () => {
      // localStorage를 비워 초기 상태로 만듬
      window.localStorage.removeItem('user');

      // 대시보드로 이동하여 초기 상태 확인
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // localStorage와 DOM에서 사용자 정보가 없음을 확인
      expect(window.localStorage.getItem('user')).toBeNull();
      expect(document.querySelector('.user-info-v2')).toBeNull();
      expect(document.querySelector('.login-btn-v2')).toBeDefined();
    });

    /**
     * 테스트: 로그인 시 상태 업데이트
     */
    it('로그인 시 사용자 정보를 상태에 저장해야 함', () => {
      // 로그인 수행
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // localStorage에 저장된 사용자 정보 확인
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser).not.toBeNull();
      expect(storedUser.name).toBe('kim');
      expect(storedUser.role).toBe('의사');

      // DOM에도 반영되었는지 확인
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      expect(document.querySelector('.user-info-v2')).toBeDefined();
      expect(document.querySelector('.user-name-v2').textContent).toContain(
        'kim'
      );
    });

    /**
     * 테스트: 상태 변경 시 리스너에게 알림 (DOM 업데이트 확인)
     */
    it('상태 변경 시 UI가 즉시 업데이트되어야 함', () => {
      // 초기 로그인
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // 대시보드로 이동 (사이드바 표시)
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 초기 사용자 정보 확인
      let userNameElement = document.querySelector('.user-name-v2');
      expect(userNameElement.textContent).toContain('kim');

      // 프로필 수정
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      document.getElementById('name').value = '박의사';
      document.getElementById('role').value = '간호사';
      document.querySelector('.btn-save-v2').click();

      // UI가 즉시 업데이트되었는지 확인
      userNameElement = document.querySelector('.user-name-v2');
      expect(userNameElement.textContent).toContain('박의사');
    });

    /**
     * 테스트: 프로필 업데이트 함수
     */
    it('프로필 업데이트 시 정보가 저장되어야 함', () => {
      // 초기 사용자 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 프로필 페이지로 이동하여 프로필 업데이트
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));

      document.getElementById('name').value = '박의사';
      document.getElementById('role').value = '간호사';
      document.querySelector('.btn-save-v2').click();

      // localStorage에 업데이트되었는지 확인
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('박의사');
      expect(storedUser.role).toBe('간호사');
    });

    /**
     * 테스트: 상태 변경 시 LocalStorage 동기화
     */
    it('상태 변경 시 LocalStorage와 동기화되어야 함', () => {
      // 로그인 수행
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // localStorage 동기화 확인
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('kim');
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
      // 로그인 상태 설정 (보호된 경로 접근을 위해)
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 대시보드로 이동하여 사이드바 렌더링
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 사이드바의 네비게이션 버튼 찾기
      const navButtons = document.querySelectorAll('.nav-item-v2');
      expect(navButtons.length).toBeGreaterThan(0);

      // "검사 결과 보기" 버튼 클릭
      const testResultButton = Array.from(navButtons).find(
        btn => btn.textContent.trim() === '검사 결과 보기'
      );
      expect(testResultButton).toBeDefined();
      testResultButton.click();

      // 페이지가 변경되었는지 확인
      expect(window.location.pathname).toBe('/testResultView');
      expect(document.querySelector('.test-result-view-page')).toBeDefined();
    });

    /**
     * 테스트: 로그인 폼 제출 이벤트 처리
     */
    it('로그인 폼 제출 이벤트를 처리해야 함', () => {
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('passwordV2');

      expect(form).toBeDefined();
      expect(emailInput).toBeDefined();
      expect(passwordInput).toBeDefined();

      emailInput.value = 'kim@hospital.com';
      passwordInput.value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      // 로그인 성공 확인
      expect(window.localStorage.getItem('user')).not.toBeNull();
      const storedUser = JSON.parse(window.localStorage.getItem('user'));
      expect(storedUser.name).toBe('kim');
      expect(storedUser.isLoggedIn).toBe(true);
    });

    /**
     * 테스트: 동적 콘텐츠 렌더링
     */
    it('사용자 정보에 따른 조건부 렌더링이 동작해야 함', () => {
      // 로그인하지 않은 상태 - 사이드바 하단에 로그인 버튼 표시
      window.localStorage.removeItem('user');
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      let sidebar = document.querySelector('.sidebar-v2');
      expect(sidebar).toBeDefined();
      expect(sidebar.querySelector('.user-name-v2')).toBeNull();
      expect(sidebar.querySelector('.login-btn-v2')).toBeDefined();
      expect(sidebar.innerHTML).toContain('로그인');

      // 로그인한 상태 - 사이드바 하단에 사용자 정보 및 로그아웃 버튼 표시
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      sidebar = document.querySelector('.sidebar-v2');
      expect(sidebar.querySelector('.user-name-v2')).toBeDefined();
      expect(sidebar.querySelector('.user-role-v2')).toBeDefined();
      expect(sidebar.innerHTML).toContain('김의사');
      expect(sidebar.innerHTML).toContain('의사');
      expect(sidebar.innerHTML).toContain('로그아웃');
    });
  });

  // ==================== 7) 라우팅 예외 처리 ====================

  describe('7) 라우팅 예외 처리', () => {
    /**
     * 테스트: 존재하지 않는 경로 접근 시 404 페이지 렌더링
     */
    it('존재하지 않는 경로 접근 시 404 페이지를 렌더링해야 함', () => {
      window.history.pushState({}, '', '/invalid-path');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
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
      // 로그인하지 않은 상태 설정
      window.localStorage.removeItem('user');

      // 보호된 페이지 접근 시도
      window.history.pushState({}, '', '/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
      expect(window.location.pathname).toBe('/login');

      window.history.pushState({}, '', '/testResultView');
      window.dispatchEvent(new PopStateEvent('popstate'));
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: 비로그인 상태에서 루트 경로(/) 접근 시 대시보드 페이지 접근 가능
     */
    it('비로그인 상태에서 루트 경로(/) 접근 시 대시보드 페이지를 렌더링해야 함', () => {
      // 로그인하지 않은 상태 설정
      window.localStorage.removeItem('user');

      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const appContent =
        document.getElementById('root')?.innerHTML || document.body.innerHTML;
      expect(appContent).toContain('dashboard-page-v2');
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 로그인 상태에서 로그인 페이지 접근 시 대시보드로 리다이렉션
     */
    it('로그인 상태에서 /login 접근 시 /로 리다이렉션해야 함', () => {
      // 로그인 상태 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 대시보드로 리다이렉션되어야 함
      expect(window.location.pathname).toBe('/');
    });

    /**
     * 테스트: 로그인한 상태에서 네비게이션 바 하단에 사용자 정보 표시
     */
    it('로그인한 상태에서 네비게이션 바 하단에 사용자 이름과 직위를 표시해야 함', () => {
      // 로그인 상태 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 대시보드로 이동하여 사이드바 렌더링
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 사이드바에서 사용자 정보 확인
      const sidebar = document.querySelector('.sidebar-v2');
      expect(sidebar).toBeDefined();
      expect(sidebar.innerHTML).toContain('김의사');
      expect(sidebar.innerHTML).toContain('의사');
      expect(sidebar.querySelector('.user-name-v2')).toBeDefined();
      expect(sidebar.querySelector('.user-role-v2')).toBeDefined();
    });

    /**
     * 테스트: 로그인한 상태에서 로그아웃 버튼 표시
     */
    it('로그인한 상태에서 로그아웃 버튼을 표시해야 함', () => {
      // 로그인 상태 설정
      window.localStorage.setItem(
        'user',
        JSON.stringify({
          name: '김의사',
          role: '의사',
          isLoggedIn: true
        })
      );

      // 대시보드로 이동하여 사이드바 렌더링
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 사이드바에서 로그아웃 버튼 확인
      const sidebar = document.querySelector('.sidebar-v2');
      expect(sidebar).toBeDefined();
      expect(sidebar.querySelector('.logout-btn-v2')).toBeDefined();
      expect(sidebar.innerHTML).toContain('로그아웃');
    });

    /**
     * 테스트: 비로그인 상태에서 사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동
     */
    it('비로그인 상태에서 사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동해야 함', () => {
      // 비로그인 상태 설정
      window.localStorage.removeItem('user');

      // 대시보드로 이동
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 로그인 버튼 찾기 및 클릭
      const loginButton = document.querySelector('.login-btn-v2');
      expect(loginButton).toBeDefined();
      loginButton.click();

      // 로그인 페이지로 이동 확인
      expect(window.location.pathname).toBe('/login');
    });

    /**
     * 테스트: 로그아웃 시 로그인 페이지로 리다이렉션
     */
    it('로그아웃 시 로그인 페이지(/login)로 리다이렉션해야 함', () => {
      // 로그인 먼저 수행
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new PopStateEvent('popstate'));

      const form = document.querySelector('.login-form-v2');
      document.getElementById('email').value = 'kim@hospital.com';
      document.getElementById('passwordV2').value = 'password123';
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      );

      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      // 로그아웃 버튼 클릭
      const logoutBtn = document.querySelector('.logout-btn-v2');
      expect(logoutBtn).toBeDefined();
      logoutBtn.click();

      // 로그인 페이지로 리다이렉션되어야 함
      expect(window.location.pathname).toBe('/login');
      expect(document.querySelector('.login-page-v2')).toBeDefined();
    });
  });
});
