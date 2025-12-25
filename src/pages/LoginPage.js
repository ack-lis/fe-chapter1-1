import { addEvent } from '../utils/index.js';
import { globalStore } from '../stores/index.js';
import { userStorage } from '../storages/index.js';
import { router } from '../router.js';

export const LoginPage = () => `
  <div class="page login-page-v2">
    <div class="login-container-v2">
      <div class="login-header">
        <div class="login-header-content">
          <div class="login-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="8" fill="#155DFC"/>
              <path d="M24 12L32 20H28V28H20V20H16L24 12Z" fill="white"/>
              <path d="M12 32V36H36V32H12Z" fill="white"/>
            </svg>
          </div>
          <h1 class="login-title">LIS</h1>
            </div>
          </div>

      <div class="login-card-v2">
        <div class="card-title">로그인</div>
        <form class="login-form-v2" id="login-form">
          <div class="input-group-v2">
            <label for="email">이메일</label>
            <input type="email" id="email" name="email" autocomplete="email" placeholder="doctor@hospital.com" required />
          </div>

          <div class="input-group-v2">
            <label for="passwordV2">비밀번호</label>
            <input type="password" id="passwordV2" name="password" autocomplete="current-password" placeholder="password123" required />
          </div>

          <button type="submit" class="btn-primary-v2">로그인</button>
        </form>
      </div>
    </div>
  </div>
`;

function login(email) {
  // 이메일에서 이름 추출 (이메일 앞부분)
  const name = email.split('@')[0] || '김의사';
  const role = '의사'; // 기본값

  const user = { name, role, isLoggedIn: true };
  globalStore.setState({
    currentUser: user
  });
  userStorage.set(user);
}

addEvent('submit', '#login-form', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('passwordV2').value.trim();

  if (!email) {
    window.alert('이메일을 입력해주세요.');
    return;
  }

  if (!password) {
    window.alert('비밀번호를 입력해주세요.');
    return;
  }

  login(email);
  // 로그인 성공 후 대시보드로 리다이렉션
  router.get().push('/');
});
