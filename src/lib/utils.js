const storagefactory = {
  session: sessionStorage,
  local: localStorage
}
const defaultStorage = { type: 'local' };
export const getStorage = (prop, options = defaultStorage) => {
  const storage = storagefactory[options.type];
  if (!prop) return
  return JSON.parse(storage.getItem(prop))
}
export const setStorage = (prop, value, options = defaultStorage) => {
  const storage = storagefactory[options.type];
  if (!prop) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  storage.setItem(prop, value)
}
export const removeStorage = (prop, options = defaultStorage) => {
  const storage = storagefactory[options.type];
  if (!prop) return
  storage.removeItem(prop)
}

export const getDate = (date) => {
  let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate()
  return year + '-' + month + '-' + day 
}
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export const cookieUtils = {
  getCookie(key) {
    const cookie = document.cookie;
    const aCookie = cookie.split(';');
    aCookie.forEach(item => {
      const [ k, v ] = item.split("=");
      if (key === k) {
        return v;
      }
    })
    return false;
  },
  setCookie(key, val, options) {
    //  options
    //  "max-age" = 秒数
    //  "path",
    //  "domain",
    //  "secure",
    //  expires = GMTString-format
    if (!options) {
      document.cookie = `${key}=${encodeURIComponent(val)};`;
    }else {
      const temp = [];
      for ( const [ k, v ] of Object.entries(options) ) {
        temp.push( `${k}=${v}` );
      }
      document.cookie = `${key}=${encodeURIComponent(val)};${ temp.join(";") }`;
    }
  }
}
export const sum = (f, digit) => { 
  var m = Math.pow(10, digit); 
  return parseInt(f * m, 10) / m; 
}