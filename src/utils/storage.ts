export const getStorage = <T>(key: string) => {
  return JSON.parse(localStorage.getItem(key)) as T;
};

export const setStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};
