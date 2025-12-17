export default function ProfilePage() {
  return `
<div class='page profile-page-v2'>
  <div class='dashboard-container-v2'>


    <div class='main-content-v2'>
      <div class='content-header-v2'>
        <button class='tab-button-v2 active'>
          <span>프로필 설정</span>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <path d='M8 4L12 8L8 12' stroke='#155DFC' stroke-width='1.33' />
          </svg>
        </button>
      </div>

      <div class='content-body-v2'>
        <div class='page-header-v2'>
          <div>
            <h2 class='page-title-v2'>프로필 설정</h2>
            <p class='page-subtitle-v2'>
              사용자 정보를 설정할 수 있습니다.
            </p>
          </div>
        </div>

        <div class='profile-settings-card-v2'>
          <div class='profile-header-section-v2'>
            <div class='profile-avatar-wrapper-v2'>
              <div class='profile-avatar-v2'>
                <svg width='64' height='64' viewBox='0 0 64 64' fill='none'>
                  <circle cx='32' cy='32' r='32' fill='#dbeafe' />
                  <path
                    d='M32 20C36.4183 20 40 23.5817 40 28C40 32.4183 36.4183 36 32 36C27.5817 36 24 32.4183 24 28C24 23.5817 27.5817 20 32 20Z'
                    fill='#155dfc'
                  />
                  <path
                    d='M20 44C20 37.3726 25.3726 32 32 32C38.6274 32 44 37.3726 44 44V48H20V44Z'
                    fill='#155dfc'
                  />
                </svg>
              </div>
              <button class='profile-avatar-edit-v2'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M14.1667 2.5C14.4417 2.225 14.8083 2.08333 15.1917 2.08333C15.575 2.08333 15.9417 2.225 16.2167 2.5L17.5 3.78333C17.775 4.05833 17.9167 4.425 17.9167 4.80833C17.9167 5.19167 17.775 5.55833 17.5 5.83333L9.16667 14.1667L5.83333 15L6.66667 11.6667L14.1667 4.16667L14.1667 2.5Z'
                    stroke='white'
                    stroke-width='1.67'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </button>
            </div>
            <div class='profile-header-text-v2'>
              <h3 class='profile-header-title-v2'>프로필 설정</h3>
              <p class='profile-header-subtitle-v2'>
                계정 정보를 관리하고 업데이트하세요
              </p>
            </div>
          </div>

          <div class='profile-form-v2'>
            <div class='form-section-v2'>
              <h4 class='form-section-title-v2'>기본 정보</h4>
              <div class='form-group-v2'>
                <label class='form-label-v2'>
                  이름
                  <span class='required-mark-v2'>*</span>
                </label>
                <input
                  type='text'
                  class='search-input-v2'
                  id='profile_main_name'
                  value='김의사'
                  placeholder='이름을 입력하세요'
                />
              </div>

              <div class='form-group-v2'>
                <label class='form-label-v2'>
                  직책
                  <span class='required-mark-v2'>*</span>
                </label>
                <input
                  type='text'
                  class='search-input-v2'
                  id='profile_main_rule'
                  value='의사'
                  placeholder='직책을 입력하세요'
                />
              </div>
            </div>

            <div class='info-box-v2'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <circle
                  cx='10'
                  cy='10'
                  r='8.33'
                  stroke='#155dfc'
                  stroke-width='1.67'
                />
                <path
                  d='M10 6.67V10'
                  stroke='#155dfc'
                  stroke-width='1.67'
                  stroke-linecap='round'
                />
                <path
                  d='M10 13.33H10.01'
                  stroke='#155dfc'
                  stroke-width='1.67'
                  stroke-linecap='round'
                />
              </svg>
              <span>
                입력한 정보는 시스템 내에서 사용자를 식별하는 데 사용됩니다.
              </span>
            </div>

            <div class='profile-actions-v2'>
              <button class='btn-cancel-v2'>취소</button>
              <button class='btn-save-v2' id='profile_main_save'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M16.67 2.5H3.33C2.6 2.5 2 3.1 2 3.83V16.17C2 16.9 2.6 17.5 3.33 17.5H16.67C17.4 17.5 18 16.9 18 16.17V3.83C18 3.1 17.4 2.5 16.67 2.5Z'
                    stroke='white'
                    stroke-width='1.67'
                  />
                  <path
                    d='M5.83 10L8.33 12.5L14.17 6.67'
                    stroke='white'
                    stroke-width='1.67'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
                <span>저장</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
