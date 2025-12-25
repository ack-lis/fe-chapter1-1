import { Router } from '../route.js';
import { Storage } from '../storage.js';
import { ProfilePage } from '../page/ProfilePage.js';
import { observer } from '../observer.js';

class ProfileControl {
  constructor(containerId, userStat) {
    this.containerId = containerId;
    this.container = null;
    this.userStat = userStat;
    observer.addObserver(this);
  }

  render() {
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      return;
    }

    this.container.innerHTML = ProfilePage(this.userStat);
    this.attachEventListeners();
  }

  update(state) {
    this.userStat = state;
    this.render();
  }

  attachEventListeners() {
    this.container.addEventListener('click', e => {
      const inName = this.container.querySelector('#inName');
      const inClass = this.container.querySelector('#inClass');

      if (e.target.closest('#save')) {
        if (!inName.reportValidity()) {
          return;
        }

        if (!inClass.reportValidity()) {
          return;
        }

        observer.setState({
          isLoggedIn: true,
          name: inName.value,
          role: inClass.value
        });

        Storage.save(this.userStat);

        Router.navigate('/');
      } else if (e.target.closest('#cancel')) {
        Router.navigate('/');
      }
    });
  }
}

export { ProfileControl };
