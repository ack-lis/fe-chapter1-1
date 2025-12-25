const Storage = {
  init() {
    const storageInfo = {
      isLoggedIn: false,
      name: '',
      role: ''
    };

    if (!localStorage.getItem('user')) {
      this.save(storageInfo);
    }
  },

  get() {
    return JSON.parse(localStorage.getItem('user'));
  },

  save(state) {
    localStorage.setItem('user', JSON.stringify(state));
  },

  update(updates) {
    const currentState = this.get();
    const newState = { ...currentState, ...updates };
    this.save(newState);
    return newState;
  }
};

export { Storage };
