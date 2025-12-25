export default function NotFoundPage() {
  return `
  <div class="page not-found-page-v2">
    <div class="not-found-container-v2">
      <div class="not-found-content-v2">
        <div class="not-found-icon-wrapper-v2">
          <div class="not-found-icon-circle-v2">
            <img src="/404-icon.svg" alt="404 아이콘" width="96" height="96" />
          </div>
        </div>

        <div class="not-found-text-v2">
          <h1 class="not-found-title-v2">404</h1>
          <h2 class="not-found-subtitle-v2">페이지를 찾을 수 없습니다</h2>
          <p class="not-found-description-v2">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>

        <div class="not-found-info-box-v2">
          <p>페이지 주소를 다시 확인해주시거나, 메인 대시보드로 돌아가주세요.</p>
        </div>

        <div class="not-found-buttons-v2">
          <button class="btn-back-v2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 5L7.5 10L12.5 15" stroke="#364153" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>이전 페이지</span>
          </button>
          <button class="btn-home-v2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 10L10 2.5L17.5 10" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.33 10V17.5C3.33 18.0523 3.77772 18.5 4.33 18.5H7.5V14.17C7.5 13.6177 7.94772 13.17 8.5 13.17H11.5C12.0523 13.17 12.5 13.6177 12.5 14.17V18.5H15.67C16.2223 18.5 16.67 18.0523 16.67 17.5V10" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>홈으로 가기</span>
          </button>
        </div>

        <div class="not-found-footer-v2">
          <p>문제가 계속되면 시스템 관리자에게 문의해주세요.</p>
        </div>
      </div>
    </div>
  </div>
`;
}
