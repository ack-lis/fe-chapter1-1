import { createObserver } from './createObserver.js';

export const createRouter = routes => {
  const { subscribe, notify } = createObserver();

  const pathStack = [window.location.pathname || '/'];
  let currentIndex = 0;

  const getPath = () => {
    return pathStack[currentIndex] || window.location.pathname;
  };

  const getTarget = () => routes[getPath()];

  const push = path => {
    pathStack.splice(currentIndex + 1);
    pathStack.push(path);
    currentIndex = pathStack.length - 1;

    window.history.pushState({ path, index: currentIndex }, '', path);
    notify();
  };

  window.addEventListener('popstate', event => {
    const pathname = window.location.pathname;

    if (event.state && 'index' in event.state) {
      currentIndex = event.state.index;
    } else if (
      event.state !== null &&
      typeof event.state === 'object' &&
      Object.keys(event.state).length === 0
    ) {
      if (currentIndex > 0) {
        currentIndex--;
      }
    } else {
      const index = pathStack.indexOf(pathname);
      if (index !== -1) {
        currentIndex = index;
      } else {
        pathStack.splice(currentIndex + 1);
        pathStack.push(pathname);
        currentIndex = pathStack.length - 1;
      }
    }
    notify();
  });

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget
  };
};
