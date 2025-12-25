import { DashBoardPage } from '../page/DashBoardPage.js';

class DashBoardControl {
  constructor(containerId, userStat) {
    this.containerId = containerId;
    this.container = null;
    this.userStat = userStat;
  }

  render() {
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      return;
    }

    this.container.innerHTML = DashBoardPage(this.userStat);
  }
}

export { DashBoardControl };
