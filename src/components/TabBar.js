/* eslint-env browser */
/**
 * TabBar 컴포넌트
 * @param {Object} options - 탭바 옵션
 * @param {string} options.activeTab - 활성화된 탭 ('dashboard' | 'testResultView' | 'profile')
 * @returns {string} 탭바 HTML 문자열
 */
export const TabBar = ({ activeTab = 'dashboard' }) => {
  const isDashboardActive = activeTab === 'dashboard';
  const isTestResultViewActive = activeTab === 'testResultView';
  const isProfileActive = activeTab === 'profile';

  // 단일 탭인 경우
  let tabLabel;
  if (isProfileActive) {
    tabLabel = '프로필 설정';
  } else if (isTestResultViewActive) {
    tabLabel = '검사 결과 보기';
  } else {
    tabLabel = '대시보드';
  }

  return `
    <div class="content-header-v2">
      <button class="tab-button-v2 ${isDashboardActive || isTestResultViewActive || isProfileActive ? 'active' : ''}">${tabLabel}</button>
    </div>
  `;
};
