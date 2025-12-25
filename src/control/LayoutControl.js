import {LayoutPage} from '../page/LayoutPage.js';
import {SideBarControl} from './SideBarControl.js';

class LayoutControl {

  constructor(containerId, userStat) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.userStat = userStat;
  }

  render() {

    if (!this.container) {
      // 에러페이지 연결부분
      return;
    }

    this.container.innerHTML = LayoutPage(this.userStat);

    new SideBarControl('sidebar-container', this.userStat).render();
  }

}

export {LayoutControl}
