import { Storage } from './storage';

class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer extends Subject {
  constructor() {
    super();
    Storage.init();
    this.state = Storage.get();
  }

  getState() {
    return this.state;
  }

  setState(data) {
    this.state = Storage.update(data);

    this.notifyObservers(this.state);
  }
}

export const observer = new Observer();
