import { addEvent } from '../utils/index.js';
import { globalStore } from '../stores/index.js';
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
        <form class="login-form-v2" id="login-form" novalidate>
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
  const name = email.split('@')[0] || '김의사';
  const role = '의사';

  const user = { name, role, isLoggedIn: true };
  globalStore.setState({
    currentUser: user
  });
}

addEvent('submit', '#login-form', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();

  if (!email) {
    window.alert('이메일을 입력해주세요.');
    return;
  }

  login(email);
  router.get().push('/');
});
