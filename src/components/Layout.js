import { SideBar } from './SideBar.js';
import { TabBar } from './TabBar.js';
import { globalStore } from '../stores/index.js';

export const Layout = ({
  routeName,
  pageClass,
  contentBody,
  showCollapseButton = false
}) => {
  const { currentUser } = globalStore.getState();

  const sidebar = SideBar({
    activeRoute: routeName,
    currentUser,
    showCollapseButton
  });

  const tabbar = TabBar({
    activeTab: routeName,
    showProfileTab: false
  });

  return `
    <div class="page ${pageClass}">
      <div class="dashboard-container-v2">
        ${sidebar}
        
        <div class="main-content-v2">
          ${tabbar}
          
          <div class="content-body-v2">
            ${contentBody}
          </div>
        </div>
      </div>
    </div>
  `;
};
