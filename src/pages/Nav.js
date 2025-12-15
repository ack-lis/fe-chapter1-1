export default function Nav() {
  return `
    <div class='sidebar-v2'>
      <div class='sidebar-header-v2'>
        <h2 class='sidebar-title-v2'>MediGuard LIS</h2>
        <p class='sidebar-subtitle-v2'>차세대 환자 안전 플랫폼</p>
      </div>

      <nav class='sidebar-nav-v2'>
        <button class='nav-item-v2' href="/" data-link>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <rect x='3' y='3' width='7' height='7'></rect>
            <rect x='14' y='3' width='7' height='7'></rect>
            <rect x='14' y='14' width='7' height='7'></rect>
            <rect x='3' y='14' width='7' height='7'></rect>
          </svg>
          <span>대시보드</span>
        </button>
        <button class='nav-item-v2' href="/testResultView" data-link>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M14 2H6a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V8z'></path>
            <path d='M14 2v6h6'></path>
            <path d='M16 13H8'></path>
            <path d='M16 17H8'></path>
            <path d='M10 9H8'></path>
          </svg>
          <span>검사 결과 보기</span>
        </button>
        <button class='nav-item-v2'href="/profile" data-link>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'></path>
          </svg>
          <span>프로필 설정 </span>
        </button>
      </nav>

      <div class='sidebar-footer-v2'>
        <button type='submit' class='btn-primary-v2'>
          로그인
        </button>
        <!--
        <button class='user-info-v2'>
          <div class='user-name-v2'>김의사</div>
          <div class='user-role-v2'>의사</div>
        </button>
        <button class='logout-btn-v2'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path
              d='M10.67 4.67L13.33 8L10.67 11.33'
              stroke='#364153'
              stroke-width='1.33'
            />
            <path d='M6 8H13.33' stroke='#364153' stroke-width='1.33' />
            <path d='M2 2V14' stroke='#364153' stroke-width='1.33' />
          </svg>
          <span>로그아웃</span>
        </button>
        -->
      </div>
    </div>
  `;
}
