import Nav from './Nav.js';
import TabBar from './TabBar.js';

export default function renderLayout() {
  const root = document.getElementById('root');

  root.innerHTML = `
      <div class='sidebar-v2' id="Nav" >
        ${Nav()}
      </div>
      <div class='page dashboard-page-v2'>
        <div class='dashboard-container-v2'>
          <div class='main-content-v2' >
            ${TabBar()}
            <div class="content-body-v2" id="app">
            </>
          </div>
        </div>
      </div>
  `;
}
