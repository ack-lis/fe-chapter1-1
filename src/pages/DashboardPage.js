export default function DashboardPage() {
  return `
<div class='page dashboard-page-v2'>
  <div class='dashboard-container-v2'>

    <div class='main-content-v2'>
      <div class='content-header-v2'>
        <button class='tab-button-v2 active'>대시보드</button>
      </div>

      <div class='content-body-v2'>
        <div class='alert-section-v2'>
          <div class='alert-header-v2'>
            <div class='alert-title-group-v2'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <circle
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='#FB2C36'
                  stroke-width='2'
                />
                <path
                  d='M12 8V12'
                  stroke='#FB2C36'
                  stroke-width='2'
                  stroke-linecap='round'
                />
                <path
                  d='M12 16H12.01'
                  stroke='#FB2C36'
                  stroke-width='2'
                  stroke-linecap='round'
                />
              </svg>
              <div>
                <h3 class='alert-title-v2'>긴급 감염 알림</h3>
                <p class='alert-subtitle-v2'>
                  실시간 감염균 감지 및 격리 조치 필요
                </p>
              </div>
            </div>
            <div class='alert-badge-v2'>3건 대응 필요</div>
          </div>

          <div class='alert-cards-v2'>
            <div class='alert-card-v2 urgent'>
              <div class='alert-card-header-v2'>
                <div class='patient-info-v2'>
                  <div class='patient-indicator-v2'></div>
                  <div>
                    <div class='patient-name-v2'>김철수</div>
                    <div class='patient-id-v2'>20241122H100001</div>
                    <div class='patient-location-v2'>3병동 302호</div>
                    <div class='patient-time-v2'>2분 전</div>
                  </div>
                </div>
                <div class='infection-info-v2'>
                  <div class='infection-label-v2'>감염균</div>
                  <div class='infection-name-v2'>
                    VRE (Vancomycin-resistant Enterococcus)
                  </div>
                  <div class='test-type-label-v2'>검사 종류</div>
                  <div class='test-type-v2'>미생물 배양 검사</div>
                </div>
                <div class='action-info-v2'>
                  <div class='action-label-v2'>권장 조치사항</div>
                  <div class='action-badges-v2'>
                    <span class='badge-v2 red'>격리 필요</span>
                    <span class='badge-v2 red'>접촉주의</span>
                  </div>
                  <div class='action-buttons-v2'>
                    <button class='btn-action-v2 primary'>조치 완료</button>
                    <button class='btn-action-v2 secondary'>
                      상세 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class='alert-card-v2 urgent'>
              <div class='alert-card-header-v2'>
                <div class='patient-info-v2'>
                  <div class='patient-indicator-v2'></div>
                  <div>
                    <div class='patient-name-v2'>이영희</div>
                    <div class='patient-id-v2'>20241122G100001</div>
                    <div class='patient-location-v2'>5병동 501호</div>
                    <div class='patient-time-v2'>15분 전</div>
                  </div>
                </div>
                <div class='infection-info-v2'>
                  <div class='infection-label-v2'>감염균</div>
                  <div class='infection-name-v2'>
                    MRSA (Methicillin-resistant Staphylococcus aureus)
                  </div>
                  <div class='test-type-label-v2'>검사 종류</div>
                  <div class='test-type-v2'>PCR 검사</div>
                </div>
                <div class='action-info-v2'>
                  <div class='action-label-v2'>권장 조치사항</div>
                  <div class='action-badges-v2'>
                    <span class='badge-v2 red'>격리 필요</span>
                    <span class='badge-v2 red'>비말주의</span>
                  </div>
                  <div class='action-buttons-v2'>
                    <button class='btn-action-v2 primary'>조치 완료</button>
                    <button class='btn-action-v2 secondary'>
                      상세 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class='alert-card-v2 completed'>
              <div class='alert-card-header-v2'>
                <div class='patient-info-v2'>
                  <div class='patient-indicator-v2 green'></div>
                  <div>
                    <div class='patient-name-v2'>박민수</div>
                    <div class='patient-id-v2'>20241122A100001</div>
                    <div class='patient-location-v2'>7병동 705호</div>
                    <div class='patient-time-v2'>32분 전</div>
                  </div>
                </div>
                <div class='infection-info-v2'>
                  <div class='infection-label-v2'>감염균</div>
                  <div class='infection-name-v2'>COVID-19 Positive</div>
                  <div class='test-type-label-v2'>검사 종류</div>
                  <div class='test-type-v2'>PCR 검사</div>
                </div>
                <div class='action-info-v2'>
                  <div class='action-label-v2'>권장 조치사항</div>
                  <div class='action-badges-v2'>
                    <span class='badge-v2 gray'>격리 완료</span>
                    <span class='badge-v2 gray'>공기주의</span>
                  </div>
                  <div class='action-badge-completed-v2'>조치 완료됨</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='stats-section-v2'>
          <div class='stat-card-v2'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>금일 총 검사</div>
              <div class='stat-value-v2'>247</div>
            </div>
            <div class='stat-footer-v2'>
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none'>
                <path
                  d='M5 2.5L7.5 5L5 7.5'
                  stroke='#00C950'
                  stroke-width='0.8'
                />
                <path d='M2.5 5H7.5' stroke='#00C950' stroke-width='0.8' />
              </svg>
              <span>전일 대비 +12%</span>
            </div>
          </div>

          <div class='stat-card-v2'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>완료</div>
              <div class='stat-value-v2 green'>189</div>
            </div>
            <div class='stat-progress-v2'>
              <div class='progress-bar-v2' style='width: 76%'></div>
            </div>
            <div class='stat-footer-v2'>진행률 76%</div>
          </div>

          <div class='stat-card-v2'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>대기중</div>
              <div class='stat-value-v2 orange'>42</div>
            </div>
            <div class='stat-footer-v2'>
              <div>평균 대기 시간</div>
              <div class='stat-time-v2'>8분</div>
            </div>
          </div>

          <div class='stat-card-v2 urgent-stat'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>긴급 알림</div>
              <div class='stat-value-v2 red'>3</div>
            </div>
            <div class='stat-footer-v2'>
              <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
                <circle
                  cx='5.5'
                  cy='5.5'
                  r='4.5'
                  stroke='#FB2C36'
                  stroke-width='0.9'
                />
                <path
                  d='M5.5 3V5.5'
                  stroke='#FB2C36'
                  stroke-width='0.9'
                  stroke-linecap='round'
                />
                <path
                  d='M5.5 7H5.5'
                  stroke='#FB2C36'
                  stroke-width='0.9'
                  stroke-linecap='round'
                />
              </svg>
              <span>즉시 대응 필요</span>
            </div>
          </div>

          <div class='stat-card-v2'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>감염 발생률</div>
              <div class='stat-value-v2 purple'>1.2%</div>
            </div>
            <div class='stat-footer-v2'>
              <svg width='9' height='9' viewBox='0 0 9 9' fill='none'>
                <path
                  d='M4.5 2.73L6.23 4.46L4.5 6.19'
                  stroke='#00C950'
                  stroke-width='0.78'
                />
                <path d='M0.78 4.5H6.23' stroke='#00C950' stroke-width='0.78' />
              </svg>
              <span>전월 대비 -0.3%</span>
            </div>
          </div>

          <div class='stat-card-v2'>
            <div class='stat-header-v2'>
              <div class='stat-label-v2'>평균 응답시간</div>
              <div class='stat-value-v2 blue'>4.3분</div>
            </div>
            <div class='stat-footer-v2'>
              <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
                <path
                  d='M5.5 2.7L6.8 4.5L5.5 6.3'
                  stroke='#2B7FFF'
                  stroke-width='0.9'
                />
                <path d='M0.9 5.5H8.99' stroke='#2B7FFF' stroke-width='0.9' />
              </svg>
              <span>목표: 5분 이내</span>
            </div>
          </div>
        </div>

        <div class='activity-section-v2'>
          <div class='activity-card-v2'>
            <div class='activity-header-v2'>
              <div class='activity-title-group-v2'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M1.67 1.67H8.33V8.33H1.67V1.67Z'
                    stroke='#2B7FFF'
                    stroke-width='1.67'
                  />
                  <path
                    d='M11.67 1.67H18.33V8.33H11.67V1.67Z'
                    stroke='#2B7FFF'
                    stroke-width='1.67'
                  />
                  <path
                    d='M1.67 11.67H8.33V18.33H1.67V11.67Z'
                    stroke='#2B7FFF'
                    stroke-width='1.67'
                  />
                  <path
                    d='M11.67 11.67H18.33V18.33H11.67V11.67Z'
                    stroke='#2B7FFF'
                    stroke-width='1.67'
                  />
                </svg>
                <h3 class='activity-title-v2'>최근 검사 활동</h3>
              </div>
              <button class='btn-view-all-v2'>전체 보기</button>
            </div>

            <div class='activity-list-v2'>
              <div class='activity-item-v2'>
                <div class='activity-item-content-v2'>
                  <div class='activity-patient-v2'>
                    <div class='activity-patient-name-v2'>정수진</div>
                    <div class='activity-patient-id-v2'>
                      20241122H100002
                    </div>
                  </div>
                  <div class='activity-test-v2'>일반혈액검사</div>
                </div>
                <div class='activity-status-v2'>
                  <span class='badge-v2 completed'>완료</span>
                  <span class='activity-time-v2'>5분 전</span>
                </div>
              </div>

              <div class='activity-item-v2'>
                <div class='activity-item-content-v2'>
                  <div class='activity-patient-v2'>
                    <div class='activity-patient-name-v2'>최민호</div>
                    <div class='activity-patient-id-v2'>
                      20241122G100002
                    </div>
                  </div>
                  <div class='activity-test-v2'>생화학검사</div>
                </div>
                <div class='activity-status-v2'>
                  <span class='badge-v2 in-progress'>진행중</span>
                  <span class='activity-time-v2'>12분 전</span>
                </div>
              </div>

              <div class='activity-item-v2'>
                <div class='activity-item-content-v2'>
                  <div class='activity-patient-v2'>
                    <div class='activity-patient-name-v2'>한지영</div>
                    <div class='activity-patient-id-v2'>
                      20241122A100002
                    </div>
                  </div>
                  <div class='activity-test-v2'>요검사</div>
                </div>
                <div class='activity-status-v2'>
                  <span class='badge-v2 completed'>완료</span>
                  <span class='activity-time-v2'>18분 전</span>
                </div>
              </div>

              <div class='activity-item-v2'>
                <div class='activity-item-content-v2'>
                  <div class='activity-patient-v2'>
                    <div class='activity-patient-name-v2'>강태희</div>
                    <div class='activity-patient-id-v2'>
                      20241122H100003
                    </div>
                  </div>
                  <div class='activity-test-v2'>간기능검사</div>
                </div>
                <div class='activity-status-v2'>
                  <span class='badge-v2 waiting'>대기중</span>
                  <span class='activity-time-v2'>25분 전</span>
                </div>
              </div>

              <div class='activity-item-v2'>
                <div class='activity-item-content-v2'>
                  <div class='activity-patient-v2'>
                    <div class='activity-patient-name-v2'>임수정</div>
                    <div class='activity-patient-id-v2'>
                      20241122G100003
                    </div>
                  </div>
                  <div class='activity-test-v2'>신장기능검사</div>
                </div>
                <div class='activity-status-v2'>
                  <span class='badge-v2 completed'>완료</span>
                  <span class='activity-time-v2'>35분 전</span>
                </div>
              </div>
            </div>
          </div>

          <div class='quick-actions-card-v2'>
            <div class='quick-actions-header-v2'>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <path
                  d='M1.67 1.67H8.33V8.33H1.67V1.67Z'
                  stroke='#2B7FFF'
                  stroke-width='1.67'
                />
                <path
                  d='M11.67 1.67H18.33V8.33H11.67V1.67Z'
                  stroke='#2B7FFF'
                  stroke-width='1.67'
                />
                <path
                  d='M1.67 11.67H8.33V18.33H1.67V11.67Z'
                  stroke='#2B7FFF'
                  stroke-width='1.67'
                />
                <path
                  d='M11.67 11.67H18.33V18.33H11.67V11.67Z'
                  stroke='#2B7FFF'
                  stroke-width='1.67'
                />
              </svg>
              <h3 class='quick-actions-title-v2'>빠른 작업</h3>
            </div>

            <div class='quick-actions-list-v2'>
              <button class='quick-action-btn-v2'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M1.33 1.33H10.67V10.67H1.33V1.33Z'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                  <path
                    d='M10.67 2.09L14.67 6.09L10.67 10.09'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                  <path
                    d='M2.09 10.67H14.67'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                </svg>
                <span>고위험군 환자 조회</span>
              </button>

              <button class='quick-action-btn-v2'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M1.33 1.33H13.33V13.33H1.33V1.33Z'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                  <path
                    d='M8 5.33V10.67'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                  <path
                    d='M5.33 8H10.67'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                </svg>
                <span>검체 접수 현황</span>
              </button>

              <button class='quick-action-btn-v2'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <circle
                    cx='8'
                    cy='8'
                    r='6.67'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                  />
                  <path
                    d='M8 4.67V8'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                    stroke-linecap='round'
                  />
                  <path
                    d='M8 11.33H8.01'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                    stroke-linecap='round'
                  />
                </svg>
                <span>Panic Value 알림</span>
              </button>

              <button class='quick-action-btn-v2'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path
                    d='M2 8L6 4L14 12'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                    stroke-linecap='round'
                  />
                  <path
                    d='M8 4L14 10'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                    stroke-linecap='round'
                  />
                </svg>
                <span>Delta Check 분석</span>
              </button>

              <button class='quick-action-btn-v2'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
                  <path d='M2 2V14H14' stroke='#0A0A0A' stroke-width='1.33' />
                  <path
                    d='M4 10L6 6L8 8L12 4'
                    stroke='#0A0A0A'
                    stroke-width='1.33'
                    stroke-linecap='round'
                  />
                </svg>
                <span>TAT 통계 보기</span>
              </button>
            </div>
          </div>

          <div class='system-status-card-v2'>
            <h3 class='system-status-title-v2'>시스템 상태</h3>
            <div class='system-status-list-v2'>
              <div class='system-status-item-v2'>
                <div class='system-status-label-v2'>EMR 연동 상태</div>
                <div class='system-status-value-v2'>
                  <div class='status-indicator-v2 green'></div>
                  <span>정상</span>
                </div>
              </div>

              <div class='system-status-item-v2'>
                <div class='system-status-label-v2'>알림 시스템</div>
                <div class='system-status-value-v2'>
                  <div class='status-indicator-v2 green'></div>
                  <span>정상</span>
                </div>
              </div>

              <div class='system-status-item-v2'>
                <div class='system-status-label-v2'>데이터베이스</div>
                <div class='system-status-value-v2'>
                  <div class='status-indicator-v2 green'></div>
                  <span>정상</span>
                </div>
              </div>

              <div class='system-status-item-v2'>
                <div class='system-status-label-v2'>백업 상태</div>
                <div class='system-status-value-v2'>
                  <div class='status-indicator-v2 green'></div>
                  <span>최근: 2시간 전</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}
