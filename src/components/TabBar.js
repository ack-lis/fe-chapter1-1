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
