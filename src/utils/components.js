/**
 * 컴포넌트 모듈
 *
 * 목적: 모든 컴포넌트를 하나의 객체로 모아서 전역으로 노출
 */

import { SideBar, TabBar } from '../components/index.js';
import {
  LoginPage,
  DashboardPage,
  TestResultViewPage,
  ProfilePage,
  NotFoundPage
} from '../pages/index.js';

export const components = {
  SideBar,
  TabBar,
  LoginPage,
  DashboardPage,
  TestResultViewPage,
  ProfilePage,
  NotFoundPage
};
