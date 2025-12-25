import { SideBar } from '../components/SideBar.js';
import { TabBar } from '../components/TabBar.js';
import { globalStore } from '../stores/index.js';

export const TestResultViewPage = () => {
  const { currentUser } = globalStore.getState();
  const routeName = 'testResultView';

  const sidebar = SideBar({
    activeRoute: routeName,
    currentUser,
    showCollapseButton: true
  });
  const tabbar = TabBar({
    activeTab: routeName,
    showProfileTab: false
  });

  return `
  <div class="page test-result-view-page">
    <div class="dashboard-container-v2">
      ${sidebar}
              
      <div class="main-content-v2">
        ${tabbar}
        
        <div class="content-body-v2">
          <div class="test-result-layout-v2">
            <div class="test-result-left-v2">
              <div class="search-conditions-card-v2">
                <h3 class="card-title-v2">검사 조회 조건</h3>
                
                <div class="search-form-v2">
                  <div class="form-group-v2">
                    <label>검사분야</label>
                    <button class="select-button-v2">
                      <span>[A0] 종합검증</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#717182" stroke-width="1.33"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div class="form-group-v2">
                    <label>검체번호</label>
                    <div class="input-with-button-v2">
                      <input type="text" class="search-input-v2" placeholder="검체번호 입력" />
                      <button class="icon-button-v2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2.67 2.67H5.33V5.33H2.67V2.67Z" stroke="#0A0A0A" stroke-width="1.33"/>
                          <path d="M2.67 11.33H5.33V14H2.67V11.33Z" stroke="#0A0A0A" stroke-width="1.33"/>
                          <path d="M10.67 2.67H13.33V5.33H10.67V2.67Z" stroke="#0A0A0A" stroke-width="1.33"/>
                          <path d="M10.67 11.33H13.33V14H10.67V11.33Z" stroke="#0A0A0A" stroke-width="1.33"/>
                        </svg>
                      </button>
                </div>
              </div>
              
                  <div class="form-group-v2">
                    <label>처리 상태</label>
                    <div class="checkbox-group-v2">
                      <label class="checkbox-label-v2">
                        <input type="checkbox" />
                        <span>전송완료</span>
                      </label>
                      <label class="checkbox-label-v2">
                        <input type="checkbox" />
                        <span>접수처리</span>
                      </label>
                      <label class="checkbox-label-v2">
                        <input type="checkbox" />
                        <span>정도관리</span>
                      </label>
                      <label class="checkbox-label-v2">
                        <input type="checkbox" />
                        <span>ID재입력</span>
                      </label>
                  </div>
                  </div>
                  
                  <div class="form-group-v2">
                    <label>접수일자</label>
                    <div class="date-inputs-v2">
                      <input type="date" class="date-input-v2" />
                      <input type="date" class="date-input-v2" />
                </div>
              </div>
                  
                  <div class="form-group-v2">
                    <label>검체 상태</label>
                    <button class="select-button-v2">
                      <span>[A] 전체</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="#717182" stroke-width="1.33"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div class="form-group-v2">
                    <label>자동조회</label>
                    <div class="auto-search-v2">
                      <input type="number" class="number-input-v2" value="30" />
                      <span>초</span>
                      <button class="btn-search-v2">조회</button>
            </div>
          </div>

                  <div class="filter-section-v2">
                    <div class="filter-header-v2">
                      <span>결과 필터</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4H10" stroke="#4A5565" stroke-width="1.33"/>
                        <path d="M6 8H10" stroke="#4A5565" stroke-width="1.33"/>
                        <path d="M6 12H10" stroke="#4A5565" stroke-width="1.33"/>
                      </svg>
              </div>
            </div>
                  
                  <button class="btn-search-primary-v2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="7.11" cy="7.11" r="5.33" stroke="white" stroke-width="1.33"/>
                      <path d="M11.11 11.11L14.67 14.67" stroke="white" stroke-width="1.33" stroke-linecap="round"/>
                    </svg>
                    <span>검색</span>
                  </button>
                </div>
              </div>
              
              <div class="search-results-card-v2">
                <div class="results-header-v2">
                  <div>
                    <h3 class="card-title-v2">검색 결과</h3>
                    <p class="card-description-v2">총 10건의 검체가 조회되었습니다</p>
                  </div>
                  <div class="badge black">10건</div>
                </div>
                
                <div class="results-table-v2">
                  <table class="data-table-v2">
                <thead>
                  <tr>
                        <th>검체번호</th>
                        <th>환자명</th>
                        <th>환자ID</th>
                        <th>접수일시</th>
                        <th>검사분야</th>
                        <th>패널수</th>
                        <th>이상소견</th>
                        <th>미입력</th>
                        <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                      <tr class="table-row-highlight-v2">
                        <td class="link-v2">20241122H100001</td>
                        <td>김철수</td>
                        <td>12345678</td>
                        <td>2024-11-22 09:15</td>
                        <td>[A0] 종합검증</td>
                        <td>4</td>
                        <td><span class="badge red-small">5</span></td>
                        <td><span class="badge orange-small">1</span></td>
                        <td><span class="badge black-small">입력대기</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122G100001</td>
                        <td>이영희</td>
                        <td>12345679</td>
                        <td>2024-11-22 08:30</td>
                        <td>[A1] 일반혈액</td>
                        <td>3</td>
                        <td><span class="badge red-small">2</span></td>
                        <td>-</td>
                        <td><span class="badge gray-small">보고완료</span></td>
                  </tr>
                  <tr>
                        <td class="link-v2">20241122A100001</td>
                        <td>박민수</td>
                        <td>12345680</td>
                        <td>2024-11-22 10:20</td>
                        <td>[A2] 생화학</td>
                    <td>2</td>
                        <td><span class="badge red-small">1</span></td>
                        <td><span class="badge orange-small">1</span></td>
                        <td><span class="badge outline-small">임시저장</span></td>
                  </tr>
                  <tr>
                        <td class="link-v2">20241122H100002</td>
                        <td>정수진</td>
                        <td>12345681</td>
                        <td>2024-11-21 14:45</td>
                        <td>[A4] 미생물</td>
                        <td>5</td>
                        <td>-</td>
                        <td>-</td>
                        <td><span class="badge gray-small">보고완료</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122G100003</td>
                        <td>최영수</td>
                        <td>12345682</td>
                        <td>2024-11-22 11:30</td>
                        <td>[A1] 일반혈액</td>
                    <td>3</td>
                        <td><span class="badge red-small">1</span></td>
                        <td>-</td>
                        <td><span class="badge black-small">입력대기</span></td>
                  </tr>
                  <tr>
                        <td class="link-v2">20241122G100001</td>
                        <td>강미선</td>
                        <td>12345683</td>
                        <td>2024-11-22 12:00</td>
                        <td>[A2] 생화학</td>
                    <td>4</td>
                        <td><span class="badge red-small">3</span></td>
                        <td><span class="badge orange-small">1</span></td>
                        <td><span class="badge outline-small">임시저장</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122H100003</td>
                        <td>윤성호</td>
                        <td>12345684</td>
                        <td>2024-11-22 13:15</td>
                        <td>[A3] 면역혈청</td>
                        <td>2</td>
                        <td>-</td>
                        <td>-</td>
                        <td><span class="badge gray-small">보고완료</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122G100001</td>
                        <td>임지혜</td>
                        <td>12345685</td>
                        <td>2024-11-22 14:20</td>
                        <td>[A4] 미생물</td>
                        <td>3</td>
                        <td><span class="badge red-small">2</span></td>
                        <td><span class="badge orange-small">1</span></td>
                        <td><span class="badge black-small">입력대기</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122A100003</td>
                        <td>한동욱</td>
                        <td>12345686</td>
                        <td>2024-11-22 15:00</td>
                        <td>[A0] 종합검증</td>
                        <td>5</td>
                        <td><span class="badge red-small">1</span></td>
                        <td>-</td>
                        <td><span class="badge gray-small">보고완료</span></td>
                      </tr>
                      <tr>
                        <td class="link-v2">20241122A100001</td>
                        <td>송민지</td>
                        <td>12345687</td>
                        <td>2024-11-22 15:45</td>
                        <td>[A2] 생화학</td>
                        <td>3</td>
                        <td><span class="badge red-small">2</span></td>
                        <td><span class="badge orange-small">1</span></td>
                        <td><span class="badge outline-small">임시저장</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
            
            <div class="test-result-right-v2">
              <div class="patient-info-card-v2">
                <div class="patient-info-grid-v2">
                  <div class="info-item-v2">
                    <div class="info-label-v2">환자명</div>
                    <div class="info-value-v2">김철수</div>
      </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">환자 ID</div>
                    <div class="info-value-v2">12345678</div>
    </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">검체번호</div>
                    <div class="info-value-v2">20241122H100001</div>
  </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">나이/성별</div>
                    <div class="info-value-v2">67세/남</div>
        </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">병동</div>
                    <div class="info-value-v2">3병동 302호</div>
            </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">검체 종류</div>
                    <div class="info-value-v2">혈액</div>
          </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">채취 일시</div>
                    <div class="info-value-v2">09:15</div>
          </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">보고 일시</div>
                    <div class="info-value-v2">10:45</div>
        </div>
                  <div class="info-item-v2">
                    <div class="info-label-v2">담당의</div>
                    <div class="info-value-v2">김의사</div>
        </div>
      </div>
      
                <div class="status-section-v2">
                  <div class="status-info-v2">
                    <span>상태:</span>
                    <span class="badge black-small">입력 대기</span>
          </div>
                  <div class="edit-hint-v2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1.33 1.33H13.33V13.33H1.33V1.33Z" stroke="#155DFC" stroke-width="1.33"/>
                      <path d="M8 5.33V10.67" stroke="#155DFC" stroke-width="1.33"/>
                      <path d="M5.33 8H10.67" stroke="#155DFC" stroke-width="1.33"/>
                    </svg>
                    <span>결과값을 클릭하여 수정하세요</span>
        </div>
        </div>
            </div>
            
              <div class="test-results-detail-card-v2">
                <div class="results-detail-header-v2">
                  <h3 class="card-title-v2">검사 결과</h3>
                  <div class="results-actions-v2">
                    <span class="badge outline">총 2개 패널</span>
                    <button class="btn-collapse-v2">모두 접기</button>
              </div>
              </div>
              
                <div class="results-detail-content-v2">
                  <div class="panel-section-v2">
                    <div class="panel-header-v2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#155DFC" stroke-width="1.67"/>
                      </svg>
                      <div>
                        <div class="panel-title-v2">Routine CBC & Diff count</div>
                        <div class="panel-subtitle-v2">일반혈액검사</div>
              </div>
                      <div class="panel-stats-v2">
                        <span>높음: <span class="red-text">4</span></span>
                        <span>낮음: <span class="blue-text">3</span></span>
                        <span>정상: <span class="black-text">5</span></span>
              </div>
                      <span class="badge outline">12개 항목</span>
              </div>
              
                    <table class="results-table-detail-v2">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>검사코드</th>
                          <th>검사명</th>
                          <th>결과</th>
                          <th>단위</th>
                          <th>참고범위</th>
                          <th>상태</th>
                          <th>2024-11-15</th>
                          <th>2024-11-08</th>
                          <th>2024-11-01</th>
                          <th>추이</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="abnormal-row-v2">
                          <td>1</td>
                          <td>20001</td>
                          <td>
                            <div style="padding-left: 20px;">WBC</div>
                            <div class="test-name-en-v2">White Blood Cell</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="20.02" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>4.8~10.8</td>
                          <td><span class="badge red-small">H</span> <span class="badge red-small">P</span></td>
                          <td>18.5</td>
                          <td>19.2</td>
                          <td>19.8</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 33L12 22L22 28L32 18L42 25" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>2</td>
                          <td>20003</td>
                          <td>
                            <div style="padding-left: 20px;">RBC</div>
                            <div class="test-name-en-v2">Red Blood Cell</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="5.69" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10⁶/µl</td>
                          <td>4.2~5.4</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>5.45</td>
                          <td>5.52</td>
                          <td>5.58</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 25L12 22L22 20L32 18L42 16" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>20005</td>
                          <td>
                            <div style="padding-left: 20px;">Hb</div>
                            <div class="test-name-en-v2">Hemoglobin</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="15.1" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>g/dl</td>
                          <td>12.0~16.0</td>
                          <td></td>
                          <td>14.8</td>
                          <td>14.9</td>
                          <td>15.0</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 20L12 18L22 16L32 14L42 12" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>20007</td>
                          <td>
                            <div style="padding-left: 20px;">Hct</div>
                            <div class="test-name-en-v2">Hematocrit</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="45.2" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>36.0~48.0</td>
                          <td></td>
                          <td>44.5</td>
                          <td>44.8</td>
                          <td>45.0</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 18L12 16L22 14L32 12L42 10" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>5</td>
                          <td>20009</td>
                          <td>
                            <div style="padding-left: 20px;">MCV</div>
                            <div class="test-name-en-v2">Mean Corpuscular Volume</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="79.4" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>fL</td>
                          <td>81~99</td>
                          <td><span class="badge blue-small">L</span></td>
                          <td>80.2</td>
                          <td>80.5</td>
                          <td>80.8</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#2B7FFF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>6</td>
                          <td>20011</td>
                          <td>
                            <div style="padding-left: 20px;">MCH</div>
                            <div class="test-name-en-v2">Mean Corpuscular Hemoglobin</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="26.5" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>pg</td>
                          <td>27~32</td>
                          <td><span class="badge blue-small">L</span></td>
                          <td>26.8</td>
                          <td>26.9</td>
                          <td>27.0</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#2B7FFF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td>20013</td>
                          <td>
                            <div style="padding-left: 20px;">MCHC</div>
                            <div class="test-name-en-v2">Mean Corpuscular Hemoglobin Concentration</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="33.4" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>g/dl</td>
                          <td>32~36</td>
                          <td></td>
                          <td>33.2</td>
                          <td>33.3</td>
                          <td>33.3</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>20015</td>
                          <td>
                            <div style="padding-left: 20px;">RDW</div>
                            <div class="test-name-en-v2">Red Cell Distribution Width</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="12.4" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>11.5~14.5</td>
                          <td></td>
                          <td>12.2</td>
                          <td>12.3</td>
                          <td>12.3</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>9</td>
                          <td>20017</td>
                          <td>
                            <div style="padding-left: 20px;">Platelet</div>
                            <div class="test-name-en-v2">Platelet Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="515" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>130~450</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>485</td>
                          <td>495</td>
                          <td>505</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 33L12 22L22 28L32 18L42 25" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>20019</td>
                          <td>
                            <div style="padding-left: 20px;">PCT</div>
                            <div class="test-name-en-v2">Plateletcrit</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="0.54" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>0.17~0.35</td>
                          <td></td>
                          <td>0.51</td>
                          <td>0.52</td>
                          <td>0.53</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>11</td>
                          <td>20021</td>
                          <td>
                            <div style="padding-left: 20px;">MPV</div>
                            <div class="test-name-en-v2">Mean Platelet Volume</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="10.4" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>fL</td>
                          <td>7.5~12.5</td>
                          <td></td>
                          <td>10.2</td>
                          <td>10.3</td>
                          <td>10.3</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>12</td>
                          <td>20023</td>
                          <td>
                            <div style="padding-left: 20px;">PDW</div>
                            <div class="test-name-en-v2">Platelet Distribution Width</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="11.1" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>12~16.5</td>
                          <td><span class="badge blue-small">L</span></td>
                          <td>11.5</td>
                          <td>11.6</td>
                          <td>11.8</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#2B7FFF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
              </div>
              
                  <div class="panel-section-v2 nested-panel-v2">
                    <div class="panel-header-v2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#155DFC" stroke-width="1.67"/>
                      </svg>
                      <div>
                        <div class="panel-title-v2" style="padding-left: 20px;">Diff. count</div>
                        <div class="panel-subtitle-v2">Differential Count</div>
              </div>
                      <div class="panel-stats-v2">
                        <span>높음: <span class="red-text">3</span></span>
                        <span>낮음: <span class="blue-text">0</span></span>
                        <span>정상: <span class="black-text">7</span></span>
            </div>
                      <span class="badge outline">10개 항목</span>
          </div>
          
                    <table class="results-table-detail-v2">
                <thead>
                  <tr>
                          <th>No</th>
                          <th>검사코드</th>
                          <th>검사명</th>
                          <th>결과</th>
                          <th>단위</th>
                          <th>참고범위</th>
                    <th>상태</th>
                          <th>2024-11-15</th>
                          <th>2024-11-08</th>
                          <th>2024-11-01</th>
                          <th>추이</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                          <td>13</td>
                          <td>20025</td>
                          <td>
                            <div style="padding-left: 20px;">Diff. count</div>
                            <div class="test-name-en-v2">Differential Count</div>
                    </td>
                          <td>
                            <input type="text" class="result-input-v2" value="" placeholder="결과 입력" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                    </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                  </tr>
                        <tr>
                          <td>14</td>
                          <td>20027</td>
                          <td>
                            <div style="padding-left: 20px;">Neutrophil %</div>
                            <div class="test-name-en-v2">Neutrophil Percentage</div>
                    </td>
                          <td>
                            <input type="text" class="result-input-v2" value="66.80" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>40~70</td>
                          <td></td>
                          <td>65.2</td>
                          <td>65.8</td>
                          <td>66.2</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                    </td>
                  </tr>
                        <tr>
                          <td>15</td>
                          <td>20029</td>
                          <td>
                            <div style="padding-left: 20px;">Lymph %</div>
                            <div class="test-name-en-v2">Lymphocyte Percentage</div>
                    </td>
                          <td>
                            <input type="text" class="result-input-v2" value="26.90" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>20~45</td>
                          <td></td>
                          <td>27.5</td>
                          <td>27.2</td>
                          <td>27.0</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                    </td>
                  </tr>
                        <tr>
                          <td>16</td>
                          <td>20031</td>
                          <td>
                            <div style="padding-left: 20px;">Mono %</div>
                            <div class="test-name-en-v2">Monocyte Percentage</div>
                    </td>
                          <td>
                            <input type="text" class="result-input-v2" value="5.50" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>2~10</td>
                          <td></td>
                          <td>5.2</td>
                          <td>5.3</td>
                          <td>5.4</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                    </td>
                  </tr>
                        <tr>
                          <td>17</td>
                          <td>20033</td>
                          <td>
                            <div style="padding-left: 20px;">Eosino %</div>
                            <div class="test-name-en-v2">Eosinophil Percentage</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="0.50" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>0~7</td>
                          <td></td>
                          <td>0.45</td>
                          <td>0.48</td>
                          <td>0.49</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>18</td>
                          <td>20035</td>
                          <td>
                            <div style="padding-left: 20px;">Basoph %</div>
                            <div class="test-name-en-v2">Basophil Percentage</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="0.30" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>%</td>
                          <td>0~2</td>
                          <td></td>
                          <td>0.28</td>
                          <td>0.29</td>
                          <td>0.29</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>19</td>
                          <td>20037</td>
                          <td>
                            <div style="padding-left: 20px;">Lymph #</div>
                            <div class="test-name-en-v2">Lymphocyte Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="5.38" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>1.0~4.8</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>5.12</td>
                          <td>5.20</td>
                          <td>5.28</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 33L12 22L22 28L32 18L42 25" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>20</td>
                          <td>20039</td>
                          <td>
                            <div style="padding-left: 20px;">Mono #</div>
                            <div class="test-name-en-v2">Monocyte Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="1.10" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>0~0.80</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>1.05</td>
                          <td>1.07</td>
                          <td>1.08</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 33L12 22L22 28L32 18L42 25" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr class="abnormal-row-v2">
                          <td>21</td>
                          <td>20041</td>
                          <td>
                            <div style="padding-left: 20px;">Neutrophil #</div>
                            <div class="test-name-en-v2">Neutrophil Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="13.37" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>1.8~7.8</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>12.05</td>
                          <td>12.62</td>
                          <td>12.95</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 33L12 22L22 28L32 18L42 25" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>22</td>
                          <td>20043</td>
                          <td>
                            <div style="padding-left: 20px;">Eosinophil #</div>
                            <div class="test-name-en-v2">Eosinophil Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="0.11" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>0~0.50</td>
                          <td></td>
                          <td>0.10</td>
                          <td>0.10</td>
                          <td>0.11</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td>23</td>
                          <td>20045</td>
                          <td>
                            <div style="padding-left: 20px;">Basophil #</div>
                            <div class="test-name-en-v2">Basophil Count</div>
                          </td>
                          <td>
                            <input type="text" class="result-input-v2" value="0.06" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>x10³/µl</td>
                          <td>0~0.20</td>
                          <td></td>
                          <td>0.06</td>
                          <td>0.06</td>
                          <td>0.06</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 15L12 14L22 13L32 12L42 11" stroke="#99A1AF" stroke-width="1"/>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
              </div>
              
                  <div class="panel-section-v2">
                    <div class="panel-header-v2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#155DFC" stroke-width="1.67"/>
                      </svg>
                      <div>
                        <div class="panel-title-v2">ESR</div>
                        <div class="panel-subtitle-v2">적혈구침강속도</div>
              </div>
                      <div class="panel-stats-v2">
                        <span>높음: <span class="red-text">1</span></span>
                        <span>낮음: <span class="blue-text">0</span></span>
                        <span>정상: <span class="black-text">0</span></span>
            </div>
                      <span class="badge outline">1개 항목</span>
          </div>
          
                    <table class="results-table-detail-v2">
                <thead>
                  <tr>
                          <th>No</th>
                          <th>검사코드</th>
                          <th>검사명</th>
                          <th>결과</th>
                          <th>단위</th>
                          <th>참고범위</th>
                    <th>상태</th>
                          <th>2024-11-15</th>
                          <th>2024-11-08</th>
                          <th>2024-11-01</th>
                          <th>추이</th>
                  </tr>
                </thead>
                <tbody>
                        <tr class="abnormal-row-v2">
                          <td>24</td>
                          <td>20063</td>
                          <td>
                            <div>ESR</div>
                            <div class="test-name-en-v2">Erythrocyte Sedimentation Rate</div>
                    </td>
                          <td>
                            <input type="text" class="result-input-v2" value="24" style="width: 80px; padding: 4px 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 14px;">
                          </td>
                          <td>mm/hr</td>
                          <td>&lt;=20</td>
                          <td><span class="badge red-small">H</span></td>
                          <td>18</td>
                          <td>20</td>
                          <td>22</td>
                          <td>
                            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                              <path d="M2 30L12 28L22 26L32 24L42 22" stroke="#FB2C36" stroke-width="1"/>
                            </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
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
};
