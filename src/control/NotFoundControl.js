import { Router } from '../route';
import { NotFoundPage } from '../page/NotFoundPage';

class NotFoundControl {
  constructor(containerId, userStat) {
    this.containerId = containerId;
    this.container = null;
    this.userStat = userStat;
  }

  render() {
    document.body.innerHTML = NotFoundPage();
    this.container = document.getElementById(this.containerId);

    if (this.container) {
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    this.container.addEventListener('click', e => {
      if (e.target.closest('#back')) {
        Router.back();
      } else if (e.target.closest('#home')) {
        Router.navigate('/');
      }
    });
  }
}

export { NotFoundControl };
