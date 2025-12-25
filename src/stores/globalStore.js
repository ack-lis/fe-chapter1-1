import { createStore } from '../lib/index.js';
import { userStorage } from '../storages/index.js';

// localStorage 동기화 미들웨어
const localStorageMiddleware = newState => {
  if ('currentUser' in newState) {
    if (newState.currentUser === null) {
      userStorage.reset();
    } else {
      userStorage.set(newState.currentUser);
    }
  }
};

const store = createStore({}, localStorageMiddleware);

store.getState = () => {
  const currentUser = userStorage.get();
  return {
    currentUser,
    loggedIn: Boolean(currentUser)
  };
};

export const globalStore = store;
