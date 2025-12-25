const LoginPage = () => `
<div class='page login-page-v2' id='login'>
  <div class='login-container-v2'>
    <div class='login-header'>
      <div class='login-header-content'>
        <div class='login-icon'>
          <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='48' height='48' rx='8' fill='#155DFC' />
            <path d='M24 12L32 20H28V28H20V20H16L24 12Z' fill='white' />
            <path d='M12 32V36H36V32H12Z' fill='white' />
          </svg>
        </div>
        <h1 class='login-title'>LIS</h1>
      </div>
    </div>
    <div class='login-card-v2'>
      <div class='card-title'>로그인</div>
      <form class='login-form-v2'>
        <div class='input-group-v2'>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            placeholder='doctor@hospital.com'
            required
          />
        </div>
        <div class='input-group-v2'>
          <label htmlFor='passwordV2'>비밀번호</label>
          <input
            type='password'
            id='passwordV2'
            placeholder='password'
            required
          />
        </div>
        <button type='submit' class='btn-primary-v2' id='Submit'>
          로그인
        </button>
      </form>
    </div>
  </div>
</div>
`;

export { LoginPage };
