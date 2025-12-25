/* eslint-env browser */

import { Storage } from './storage.js';
import { LayoutControl } from './control/LayoutControl.js';

const Router = (function () {
  const routes = {};

  function addRoute(path, handler) {
    routes[path] = handler;
  }

  function navigate(path) {
    if (location.pathname !== path) {
      history.pushState({}, '', path);
    }
    handleRoute();
  }

  function back() {
    history.back();
  }

  function init() {
    window.addEventListener('popstate', () => handleRoute());
    handleRoute();
  }

  function handleRoute() {
    const path = window.location.pathname;
    const userStat = Storage.get();

    const ControlClass = routes[path] || routes['/404'] || routes['/'];

    if (!routes[path] && path !== '/') {
      new ControlClass('error', userStat).render();
      return;
    }

    if (path === '/login') {
      new ControlClass('root', userStat).render();
      return;
    }

    if (path === '/' || (userStat && userStat.isLoggedIn)) {
      if (!document.getElementById('main-container')) {
        new LayoutControl('root', userStat).render();
      }

      if (path === '/') {
        new ControlClass('main-container', userStat).render();
      } else if (userStat.isLoggedIn) {
        new ControlClass('main-container', userStat).render();
      }
    } else if (path !== '/login') {
      navigate('/login');
      return;
    }
  }

  return {
    addRoute,
    navigate,
    back,
    init
  };
})();

export { Router };
