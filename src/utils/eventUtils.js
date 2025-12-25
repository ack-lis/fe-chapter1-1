const eventHandlers = {};
let isInitialized = false;

const handleGlobalEvents = e => {
  const handlers = eventHandlers[e.type];
  if (!handlers) {
    return;
  }

  for (const selector in handlers) {
    const matchedElement = e.target.matches(selector)
      ? e.target
      : e.target.closest(selector);

    if (matchedElement) {
      handlers[selector](e);
      break;
    }
  }
};

export const registerGlobalEvents = () => {
  if (isInitialized) {
    return;
  }

  // 모든 이벤트 타입에 대한 리스너를 document.body에 등록
  Object.keys(eventHandlers).forEach(eventType => {
    document.body.addEventListener(eventType, handleGlobalEvents);
  });

  isInitialized = true;
};

export const addEvent = (eventType, selector, handler) => {
  if (!eventHandlers[eventType]) {
    eventHandlers[eventType] = {};
  }
  eventHandlers[eventType][selector] = handler;
};
