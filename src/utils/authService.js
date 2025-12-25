/**
 * 인증 서비스 모듈
 *
 * 목적: 사용자 인증 및 사용자 정보 관리
 * 책임:
 * - 사용자 정보 조회
 * - 로그인 처리
 * - 로그아웃 처리
 * - 로그인 상태 확인
 * - 사용자 정보 업데이트
 * - 사용자 이름 검증
 */

import { storage } from './storage.js';

const USER_KEY = 'user';

/**
 * 인증 서비스 객체
 */
export const authService = {
  /**
   * 현재 사용자 정보 가져오기
   * @returns {Object|null} 현재 사용자 정보 또는 null
   */
  getUser() {
    return storage.get(USER_KEY);
  },

  /**
   * 로그인 처리
   * @param {Object} user - 사용자 정보 { name, role, ... }
   */
  login(user) {
    storage.set(USER_KEY, user);
  },

  /**
   * 사용자 정보 저장 (기존 userManager.saveUser와 호환)
   * @param {Object} userData - 사용자 정보 { name, role }
   * @returns {Object} 저장된 사용자 정보 (isLoggedIn 포함)
   */
  saveUser(userData) {
    const user = {
      name: userData.name,
      role: userData.role,
      isLoggedIn: true
    };
    storage.set(USER_KEY, user);
    return user;
  },

  /**
   * 로그아웃 처리
   */
  logout() {
    storage.remove(USER_KEY);
  },

  /**
   * 로그인 상태 확인
   * @returns {boolean} 로그인 여부
   */
  isLoggedIn() {
    return this.getUser() !== null;
  },

  /**
   * 사용자 정보 업데이트
   * @param {Object} userData - 업데이트할 사용자 정보
   */
  updateUser(userData) {
    const currentUser = this.getUser();
    storage.set(USER_KEY, { ...currentUser, ...userData });
  },

  /**
   * 사용자 이름 검증
   * @param {string} name - 검증할 이름
   * @returns {Object} 검증 결과 { valid: boolean, message?: string }
   */
  validateUserName(name) {
    if (!name || name.trim().length === 0) {
      return { valid: false, message: '이름을 입력해주세요.' };
    }
    return { valid: true };
  }
};
