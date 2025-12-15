// import { navigate, render } from "./router.js";
import renderLayout from './pages/MainLayout.js';
import DashboardPage from './pages/DashboardPage.js';
import TestResultViewPage from './pages/TestResultViewPage.js';
import LoginPage from './pages/LoginPage.js';
import ProfilePage from './pages/ProfilePage.js';
import NotFoundPage from './pages/NotFoundPage.js';

const routes = {
  // '/': () => DashboardPage,
  // '/testResultView': () => TestResultViewPage,
  // '/login': () => LoginPage,
  // '/profile': () => ProfilePage

  '/': { page: DashboardPage, layout: true },
  '/testResultView': { page: TestResultViewPage, layout: true },
  '/login': { page: LoginPage, layout: false },
  '/profile': { page: ProfilePage, layout: true }
};

// export function navigate(path) {
//   history.pushState(null, null, path);
//   render();
// }

// export function render() {
//   const app = document.getElementById("app");
//   const route = routes[location.pathname] || (() => NotFoundPage);
//   app.innerHTML = route();
// }

// export function init() {
//   window.addEventListener('popstate', () => render());
//   render();
// }

let layoutMounted = false;

const router = {
  init() {
    window.addEventListener('popstate', () => this.render());
    this.render();
  },

  navigate(path) {
    window.history.pushState(null, null, path);
    this.render();
  },

  render() {
    // const app = document.getElementById('app');
    // const path = location.pathname;

    // const page = routes[path];
    // app.innerHTML = page ? page() : '';

    // const app = document.getElementById('app');
    // const route = routes[window.location.pathname] || (() => NotFoundPage);
    // app.innerHTML = route();

    // const app = document.getElementById("app");
    // let path = window.location.pathname;
    // if (path === "/") {
    //   path = "/";
    //   history.replaceState(null, null, path);
    // }
    // const route = routes[path];
    // app.innerHTML = route ? route() : "<h1>404</h1>";

    // let app = document.getElementById('app');

    // // 테스트용도로 생성
    // if (!app) {
    //   app = document.createElement('div');
    //   app.id = 'app';
    //   document.body.appendChild(app);
    // }

    // const route = routes[window.location.pathname] || (() => app.innerHTML = NotFoundPage);

    // app.innerHTML = route();

    // setActiveNav();

    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'app';
      document.body.appendChild(root);
    }

    const path = window.location.pathname;
    const route = routes[path];

    if (!route) {
      layoutMounted = false;
      root.innerHTML = NotFoundPage();
      return;
    }

    if (route.layout) {
      if (!layoutMounted) {
        renderLayout(); // ⭐ 최초 1회만
        layoutMounted = true;
      }

      const app = document.getElementById('app');
      app.innerHTML = route.page();

      setActiveNav();

      return;
    }

    layoutMounted = false;
    root.innerHTML = route.page();
  }
};

function setActiveNav() {
  // alert('test');
  const currentPath = window.location.pathname;

  document.querySelectorAll('.nav-item-v2').forEach(item => {
    const path = item.getAttribute('href');

    item.classList.toggle('active', path === currentPath);
  });
}

const Main = () => `
  <div  class='page dashboard-page-v2'>
    <div id="root" class='dashboard-container-v2'>
    </>
  </div>
`;

window.router = router;
globalThis.router = router;

document.addEventListener('click', e => {
  const link = e.target.closest('[data-link]');

  if (!link) {
    return;
  }

  e.preventDefault();
  // navigate(link.getAttribute("href"));
  router.navigate(link.getAttribute('href'));
});

document.addEventListener('DOMContentLoaded', () => {
  // init();
  router.init();
});

// <div class='page dashboard-page-v2'>
//   <div class='dashboard-container-v2'>

// document.body.innerHTML = `

// <div class='page dashboard-page-v2'>
//   <div class='dashboard-container-v2'>
//     ${nav()}
//     ${Main()}
//     </div>
// </div>
// `;

// document.body.innerHTML = `

// <div class='page dashboard-page-v2'>
//   <div class='dashboard-container-v2'>
//     ${Main()}
//     </div>
// </div>
// `;

document.body.innerHTML = `
  ${Main()}
`;
