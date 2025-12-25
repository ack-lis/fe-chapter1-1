/**
 * SPA 기본 E2E 테스트
 *
 * 목적: SPA의 핵심 기능 검증 (E2E)
 * 시나리오:
 * - 기본 라우팅 동작 (/, /profile, /testResultView)
 * - 사이드바 로그인 버튼을 통한 로그인 페이지 접근
 * - 로그인/로그아웃 동작 (이름, 직위)
 * - 비로그인 상태에서 보호된 페이지 접근 제한
 * - 로그인된 사용자의 로그인 페이지 접근 시 메인 페이지 리다이렉트
 * - 프로필 수정 기능
 * - 이벤트 위임 동작
 * - 브라우저 뒤로가기/앞으로가기
 */

/* eslint-disable no-undef */
import { test, expect } from '@playwright/test';

test.describe('SPA 기본', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/');
    // eslint-disable-next-line no-undef
    await page.evaluate(() => localStorage.clear());
  });

  /**
   * 테스트: 기본 라우팅이 동작하는지
   * 시나리오: 각 라우트에 접근 시 해당 페이지가 렌더링되어야 함
   */
  test('기본 라우팅이 동작해야 함', async ({ page }) => {
    // 비로그인 상태에서 루트 경로 접근 시 대시보드 페이지 표시
    await page.goto('/');
    await expect(
      page.locator('.dashboard-page-v2, .dashboard-container-v2').first()
    ).toBeVisible();
    //await expect(page.locator('text=대시보드')).toBeVisible();

    // 사이드바 로그인 버튼 클릭하여 로그인 페이지로 이동
    const sidebarLoginButton = page
      .locator('button:has-text("로그인"), .login-btn-v2')
      .first();
    await sidebarLoginButton.click();
    await expect(
      page.locator('.login-page-v2, .login-container-v2').first()
    ).toBeVisible({ timeout: 5000 });

    // 로그인 수행
    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');
    const loginFormButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginFormButton.click();

    // 로그인 후 대시보드로 리다이렉션 확인
    await expect(
      page.locator('.dashboard-page-v2, .dashboard-container-v2').first()
    ).toBeVisible({ timeout: 5000 });

    // '/profile' 경로 접근 시 프로필 페이지 표시
    await page.goto('/profile');
    await expect(page.locator('.profile-page-v2')).toBeVisible();
    await expect(
      page
        .locator('div.main-content-v2')
        .getByRole('button', { name: '프로필 설정' })
    ).toBeVisible();

    // '/testResultView' 경로 접근 시 검사결과보기 페이지 표시
    await page.goto('/testResultView');
    await expect(page.locator('.test-result-view-page')).toBeVisible();
    await expect(
      page
        .locator('div.main-content-v2')
        .getByRole('button', { name: '검사 결과 보기' })
    ).toBeVisible();
  });

  /**
   * 테스트: 비로그인 상태에서 사이드바에 로그인 버튼이 표시되는지
   * 시나리오: 비로그인 상태에서 사이드바 하단에 로그인 버튼이 표시되어야 함
   */
  test('비로그인 상태에서 사이드바에 로그인 버튼이 표시되어야 함', async ({
    page
  }) => {
    // 비로그인 상태에서 루트 경로 접근
    await page.goto('/');

    // 사이드바에 로그인 버튼이 표시되어야 함
    await expect(
      page.locator('button:has-text("로그인"), .login-btn-v2')
    ).toBeVisible({ timeout: 5000 });
  });

  /**
   * 테스트: 사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동하는지
   * 시나리오: 사이드바의 로그인 버튼 클릭 시 로그인 페이지로 이동해야 함
   */
  test('사이드바 로그인 버튼 클릭 시 로그인 페이지로 이동해야 함', async ({
    page
  }) => {
    // 비로그인 상태에서 루트 경로 접근
    await page.goto('/');

    // 사이드바 로그인 버튼 클릭
    const sidebarLoginButton = page
      .locator('button:has-text("로그인"), .login-btn-v2')
      .first();
    await sidebarLoginButton.click();

    // 로그인 페이지로 이동했는지 확인
    await expect(
      page.locator('.login-page-v2, .login-container-v2')
    ).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/login');
  });

  /**
   * 테스트: 로그인, 로그아웃이 동작하는지
   * 시나리오: 로그인 폼 제출 시 사용자 정보 저장 (이름, 직위), 로그아웃 시 제거
   */
  test('로그인과 로그아웃이 동작해야 함', async ({ page }) => {
    // 비로그인 상태에서 루트 경로 접근
    await page.goto('/');

    // 사이드바 로그인 버튼 클릭하여 로그인 페이지로 이동
    const sidebarLoginButton = page
      .locator('button:has-text("로그인"), .login-btn-v2')
      .first();
    await sidebarLoginButton.click();

    // 로그인

    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');

    const loginButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginButton.click();

    // 로그인 상태 확인
    // eslint-disable-next-line no-undef
    const userData = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    expect(userData).not.toBeNull();
    const user = JSON.parse(userData);
    expect(user.name).toBe('김의사');
    expect(user.role).toBeDefined();
    expect(user.isLoggedIn).toBe(true);

    // 로그아웃
    const logoutButton = page
      .locator('button:has-text("로그아웃"), .logout-btn-v2')
      .first();
    await logoutButton.click();

    // 로그아웃 상태 확인
    // eslint-disable-next-line no-undef
    const userDataAfterLogout = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    expect(userDataAfterLogout).toBeNull();
  });

  /**
   * 테스트: 비로그인 상태에서 보호된 페이지 접근이 제한되는지
   * 시나리오: 로그인하지 않은 상태에서 /profile, /testResultView 접근 시 로그인 페이지로 리다이렉션
   */
  test('비로그인 상태에서 보호된 페이지 접근이 제한되어야 함', async ({
    page
  }) => {
    // 비로그인 상태에서 보호된 페이지 접근 시도
    await page.goto('/profile');

    // 로그인 페이지로 리다이렉션되었는지 확인
    await expect(
      page.locator('.login-page-v2, .login-container-v2').first()
    ).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/login');

    // 다른 보호된 페이지도 동일하게 제한되는지 확인
    await page.goto('/testResultView');
    await expect(
      page.locator('.login-page-v2, .login-container-v2').first()
    ).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/login');
  });

  /**
   * 테스트: 비로그인 상태에서 루트 경로(/) 접근 가능
   * 시나리오: 로그인하지 않은 상태에서도 루트 경로(/) 접근 시 대시보드 페이지를 볼 수 있어야 함
   */
  test('비로그인 상태에서 루트 경로(/) 접근 시 대시보드 페이지를 볼 수 있어야 함', async ({
    page
  }) => {
    // 비로그인 상태에서 루트 경로 접근
    await page.goto('/');

    // 대시보드 페이지가 표시되어야 함
    await expect(
      page.locator('.dashboard-page-v2, .dashboard-container-v2').first()
    ).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/');
  });

  /**
   * 테스트: 로그인된 사용자가 로그인 페이지에 접근 시 메인 페이지로 리다이렉트되는지
   * 시나리오: 이미 로그인된 상태에서 '/login' 경로 접근 시 대시보드로 리다이렉션
   */
  test('로그인된 사용자가 로그인 페이지 접근 시 메인 페이지로 리다이렉트되어야 함', async ({
    page
  }) => {
    // 먼저 로그인 (사이드바 로그인 버튼을 통해)
    await page.goto('/');
    const sidebarLoginButton = page
      .locator('button:has-text("로그인"), .login-btn-v2')
      .first();
    await sidebarLoginButton.click();

    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');
    const loginFormButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginFormButton.click();

    // 로그인 상태 확인
    // eslint-disable-next-line no-undef
    const userData = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    expect(userData).not.toBeNull();

    // 로그인된 상태에서 로그인 페이지 접근 시도
    await page.goto('/login');

    // 대시보드 페이지로 리다이렉션되었는지 확인
    await expect(
      page.locator('.dashboard-page-v2, .dashboard-container-v2').first()
    ).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/');
  });

  /**
   * 테스트: 프로필 수정 기능이 동작하는지
   * 시나리오: 프로필 페이지에서 이름과 직위를 수정하고 저장하면 LocalStorage에 반영되어야 함
   */
  test('프로필 수정 기능이 동작해야 함', async ({ page }) => {
    // 먼저 로그인
    await page.goto('/login');
    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');
    const loginButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginButton.click();

    // 프로필 페이지로 이동
    await page.goto('/profile');

    // 이름 입력 필드 찾기 및 수정
    const nameFields = page.locator('input[type="text"]');
    const nameField = nameFields.first();
    await nameField.clear();
    await nameField.fill('박의사');

    // 직위 입력 필드 찾기 및 수정
    const roleField = nameFields.nth(1);
    await roleField.clear();
    await roleField.fill('간호사');

    // 저장 버튼 클릭
    const saveButton = page.locator('button:has-text("저장"), .btn-save-v2');
    await saveButton.click();

    // LocalStorage에 반영되었는지 확인
    // eslint-disable-next-line no-undef
    const userData = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    expect(userData).not.toBeNull();
    const user = JSON.parse(userData);
    expect(user.name).toBe('박의사');
    expect(user.role).toBe('간호사');

    // 네비게이션의 사용자 정보가 업데이트되었는지 확인
    await expect(page.locator('text=박의사')).toBeVisible();
    await expect(page.locator('text=간호사')).toBeVisible();
  });

  /**
   * 테스트: 네비게이션 하단에 사용자 정보 표시
   * 시나리오: 로그인 후 네비게이션 하단에 사용자 이름과 직위가 표시되어야 함
   */
  test('네비게이션 하단에 사용자 정보가 표시되어야 함', async ({ page }) => {
    // 먼저 로그인
    await page.goto('/login');
    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');
    const loginButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginButton.click();

    // 대시보드 페이지로 이동
    await page.goto('/');

    // 네비게이션 하단에 사용자 정보가 표시되는지 확인
    await expect(page.locator('.user-name-v2')).toBeVisible();
    await expect(page.locator('.user-role-v2')).toBeVisible();
    await expect(page.locator('text=김의사')).toBeVisible();
  });

  /**
   * 테스트: 사용자 정보 영역 클릭 시 프로필 페이지로 이동
   * 시나리오: 네비게이션 하단의 사용자 정보 영역 클릭 시 프로필 페이지로 이동해야 함
   */
  test('사용자 정보 영역 클릭 시 프로필 페이지로 이동해야 함', async ({
    page
  }) => {
    // 먼저 로그인
    await page.goto('/login');
    const nameInput = page
      .locator('input[type="text"], input[type="email"]')
      .first();
    await nameInput.fill('김의사');
    const loginButton = page
      .locator('button:has-text("로그인"), button[type="submit"]')
      .first();
    await loginButton.click();

    // 대시보드 페이지로 이동
    await page.goto('/');

    // 사용자 정보 영역 클릭
    const userInfo = page.locator('.user-info-v2');
    await userInfo.click();

    // 프로필 페이지로 이동했는지 확인
    await expect(page.locator('.profile-page-v2')).toBeVisible({
      timeout: 5000
    });
    expect(page.url()).toContain('/profile');
  });

  /**
   * 테스트: 이벤트 위임이 올바로 동작하는지
   * 시나리오: 동적으로 추가된 요소에 대한 이벤트가 올바르게 처리되어야 함
   */
  test('이벤트 위임이 올바로 동작해야 함', async ({ page }) => {
    // 로그인 상태로 설정
    await page.goto('/');
    // eslint-disable-next-line no-undef
    await page.evaluate(() => {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: '김의사', role: '의사', isLoggedIn: true })
      );
    });
    await page.reload();

    // 네비게이션 링크 클릭 (이벤트 위임으로 처리되어야 함)
    const dashboardLink = page
      .locator('button:has-text("대시보드"), .nav-item-v2:has-text("대시보드")')
      .first();
    await dashboardLink.click();

    // 페이지가 전환되었는지 확인
    await expect(
      page
        .locator('div.main-content-v2')
        .getByRole('button', { name: '대시보드' })
    ).toBeVisible();

    // 다른 링크도 테스트
    const resultViewLink = page
      .locator(
        'button:has-text("검사 결과 보기"), .nav-item-v2:has-text("검사 결과 보기")'
      )
      .first();
    await resultViewLink.click();

    // 페이지가 전환되었는지 확인
    await expect(
      page
        .locator('div.main-content-v2')
        .getByRole('button', { name: '검사 결과 보기' })
    ).toBeVisible();

    // 로그아웃 버튼 클릭 (이벤트 위임으로 처리되어야 함)
    const logoutButton = page
      .locator('button:has-text("로그아웃"), .logout-btn-v2')
      .first();
    await logoutButton.click();

    // 로그아웃이 처리되었는지 확인
    // eslint-disable-next-line no-undef
    const userDataAfterLogout = await page.evaluate(() => {
      return localStorage.getItem('user');
    });
    expect(userDataAfterLogout).toBeNull();
  });

  /**
   * 테스트: 브라우저 뒤로가기/앞으로가기 버튼 지원
   * 시나리오: 브라우저의 뒤로가기/앞으로가기 버튼으로 페이지 전환이 가능해야 함
   */
  test('브라우저 뒤로가기/앞으로가기 버튼을 지원해야 함', async ({ page }) => {
    // 로그인 상태로 설정
    await page.goto('/');
    // eslint-disable-next-line no-undef
    await page.evaluate(() => {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: '김의사', role: '의사', isLoggedIn: true })
      );
    });
    await page.reload();

    // 여러 페이지 이동
    await page.goto('/profile');
    await expect(page.locator('.profile-page-v2')).toBeVisible();

    await page.goto('/testResultView');
    await expect(page.locator('.test-result-view-page')).toBeVisible();

    // 뒤로가기
    await page.goBack();
    await expect(page.locator('.profile-page-v2')).toBeVisible({
      timeout: 5000
    });

    // 앞으로가기
    await page.goForward();
    await expect(page.locator('.test-result-view-page')).toBeVisible({
      timeout: 5000
    });
  });

  /**
   * 테스트: 404 페이지 표시
   * 시나리오: 존재하지 않는 경로 접근 시 404 페이지가 표시되어야 함
   */
  test('존재하지 않는 경로 접근 시 404 페이지가 표시되어야 함', async ({
    page
  }) => {
    // 로그인 상태로 설정
    await page.goto('/');
    // eslint-disable-next-line no-undef
    await page.evaluate(() => {
      localStorage.setItem(
        'user',
        JSON.stringify({ name: '김의사', role: '의사', isLoggedIn: true })
      );
    });
    await page.reload();

    // 존재하지 않는 경로 접근
    await page.goto('/invalid-path-12345');

    // 404 페이지가 표시되어야 함
    await expect(page.locator('.not-found-page-v2')).toBeVisible({
      timeout: 5000
    });
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=페이지를 찾을 수 없습니다')).toBeVisible();
  });
});
