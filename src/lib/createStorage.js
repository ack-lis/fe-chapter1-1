export const createStorage = (key, storage = window.localStorage) => {
  const get = () => {
    const value = storage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Failed to parse storage item "${key}":`, error);
      return null;
    }
  };

  const set = value => storage.setItem(key, JSON.stringify(value));

  const reset = () => storage.removeItem(key);

  return { get, set, reset };
};
