import { SideBarPage } from '../page/SideBarPage.js';
import { Router } from '../route.js';
import { observer } from '../observer.js';

class SideBarControl {
  constructor(containerId, _userStat) {
    this.containerId = containerId;
    this.container = null;
    this.userStat = observer.getState();
    observer.addObserver(this);
  }

  render() {
    this.container = document.getElementById(this.containerId);

    if (!this.container) {
      return;
    }

    this.container.innerHTML = SideBarPage(this.userStat);

    if (this.container) {
      // 디자인이 부셔져서 주석 후 HTML 수정으로 변경
      this.attachEventListeners();
    }
  }

  update(state) {
    this.userStat = state;
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    if (!this.container) {
      return;
    }

    const infoBtn = this.container.querySelector('#info');
    const nameData = this.container.querySelector('.user-name-v2');
    const classData = this.container.querySelector('.user-role-v2');
    const userBtn = this.container.querySelector('.user-info-v2');
    const loginText = this.container.querySelector('#loginText');

    if (infoBtn) {
      if (this.userStat.isLoggedIn) {
        infoBtn.classList.remove('hidden');
      } else {
        infoBtn.classList.add('hidden');
      }
    }

    if (nameData) {
      nameData.textContent = this.userStat.name;
    }

    if (classData) {
      classData.textContent = this.userStat.role;
    }

    if (userBtn) {
      if (this.userStat.isLoggedIn) {
        userBtn.classList.remove('hidden');
      } else {
        userBtn.classList.add('hidden');
      }
    }

    if (loginText) {
      loginText.textContent = this.userStat.isLoggedIn ? '로그아웃' : '로그인';
    }
  }

  attachEventListeners() {
    this.container.addEventListener('click', e => {
      // target.id 로 했을때 왜 글자부분은 안먹히고 공백만 되는지 -- 버블링
      const btn = e.target.closest('.nav-item-v2');
      if (btn) {
        this.container
          .querySelector('.nav-item-v2.active')
          ?.classList.remove('active');

        btn.classList.add('active');
      }

      if (e.target.closest('#board')) {
        Router.navigate('/');
      }

      if (e.target.closest('#Result')) {
        if (this.userStat.isLoggedIn) {
          Router.navigate('/testResultView');
        } else {
          Router.navigate('/login');
        }
      }

      if (e.target.closest('#info')) {
        if (this.userStat.isLoggedIn) {
          Router.navigate('/profile');
        } else {
          Router.navigate('/login');
        }
      }

      if (e.target.closest('.user-info-v2')) {
        if (this.userStat.isLoggedIn) {
          Router.navigate('/profile');
        } else {
          Router.navigate('/login');
        }
      }

      if (e.target.closest('.logout-btn-v2')) {
        if (this.userStat.isLoggedIn) {
          observer.setState({
            isLoggedIn: false,
            name: '',
            role: ''
          });

          observer.removeObserver(this);
        }

        Router.navigate('/login');
      }
    });
  }
}

export { SideBarControl };
