import { createStore } from '../lib/index.js';
import { userStorage } from '../storages/index.js';

// 초기 상태 설정
const initialState = {
  get currentUser() {
    // 항상 localStorage에서 최신 사용자 정보 가져오기
    return userStorage.get();
  },
  get loggedIn() {
    // currentUser getter를 사용하여 최신 로그인 상태 반환
    return Boolean(this.currentUser);
  }
};

export const globalStore = createStore(initialState);
