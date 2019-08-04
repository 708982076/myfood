import { baseURL } from 'root/config'
import { totalmem } from 'os';
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
export const request = async (url, data = {}, method = 'GET') => {
  url = baseURL + url;
  method = method.toUpperCase();
  if (method === 'GET') {
    let dataUrl = '';
    Object.keys(data).forEach(key => {
      dataUrl += `${key}=${data[key]}&`;
    })
    if (dataUrl) {
      dataUrl = dataUrl.slice(0, -1);
      url += '?' + dataUrl;
    }
  }
  if (window.fetch) {
    let fetchOptions = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: "cors",
			cache: "no-cache"
    }

    if (method === 'POST') {
      Object.defineProperty(fetchOptions, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
			const response = await fetch(url, fetchOptions);
			const responseJson = await response.json();
			return responseJson;
		} catch (error) {
			throw new Error(error);
    }
  }else {
    return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (method == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(method, url, true);
			requestObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
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