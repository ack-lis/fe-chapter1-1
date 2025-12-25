import { Router } from '../route.js';
import { LoginPage } from '../page/LoginPage.js';
import { observer } from '../observer.js';

class LoginControl {
  constructor(containerId, userStat) {
    this.containerId = containerId;
    this.container = null;
    this.userStat = userStat;
  }

  render() {
    if (this.userStat && this.userStat.isLoggedIn) {
      Router.navigate('/');
      return;
    }

    this.container = document.getElementById(this.containerId);
    if (this.container) {
      this.container.innerHTML = LoginPage();
      this.attachEventListeners();
    }
  }

  attachEventListeners() {
    const form = this.container.querySelector('.login-form-v2');

    form.addEventListener('submit', e => {
      e.preventDefault();

      const emailCheck = this.container.querySelector('#email');
      const passCheck = this.container.querySelector('#passwordV2');

      if (!emailCheck.checkValidity() || !passCheck.checkValidity()) {
        return;
      }

      observer.setState({
        isLoggedIn: true,
        name: emailCheck.value.split('@')[0],
        role: '의사'
      });

      Router.navigate('/');
    });
  }
}

export { LoginControl };
