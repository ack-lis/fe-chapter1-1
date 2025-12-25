import { TestResultViewPage } from '../page/TestResultViewPage.js';

class TestResultViewControl {
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

    this.container.innerHTML = TestResultViewPage(this.userStat);
  }
}

export { TestResultViewControl };
