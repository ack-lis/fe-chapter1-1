/**
 * LocalStorage 유틸리티 모듈
 */

export const storage = {
  /**
   * LocalStorage에서 데이터 가져오기
   */
  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  /**
   * LocalStorage에 데이터 저장하기
   */
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * LocalStorage에서 데이터 삭제하기
   */
  remove(key) {
    localStorage.removeItem(key);
  }
};
