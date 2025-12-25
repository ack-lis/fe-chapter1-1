import { createObserver } from './createObserver.js';

export const createStore = (initialStore, middleware) => {
  const { subscribe, notify } = createObserver();

  let state = { ...initialStore };

  const setState = newState => {
    if (middleware) {
      middleware(newState);
    }

    state = { ...state, ...newState };
    notify();
  };

  const getState = () => ({ ...state });

  return { getState, setState, subscribe };
};
