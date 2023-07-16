import Cookies, { CookieSetOptions, CookieGetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = <T> (name: string, options?: CookieGetOptions) => {
  const cookie = cookies.get(name, options) as T;

  if (!cookie) {
    return null;
  }

  return cookie;
};

export const setCookie = <T> (name: string, value: T, options?: CookieSetOptions) => {
  cookies.set(name, value, options);
};

export const removeCookie = (name: string, options?: CookieSetOptions) => {
  cookies.remove(name, options);
};
