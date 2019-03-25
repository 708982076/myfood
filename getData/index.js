import Ojsonp from 'jsonp'
import { request } from 'lib/utils';

export const getAllCity = () => request('/city');
export const getLocation = (query) => request('/location', query);
export const getStoreItem = (id) => request('/storeItem', { id });
export const getStoreList = () => request('/store');
export const getStoreInfo = (id) => request('/storeinfo', {id});
export const getStoreComment = (id) => request('/storecomment', {id});
export const storeWordSerach = (keyword) => request('/storeWordSerach', {keyword});

export const jsonp = (url, data, opts) => {
  function params(data) {
    let url = ''
    for (let key in data) {
      let value = data[key] !== undefined ? data[key] : ''
      url += `&${key}=${encodeURIComponent(value)}`
    }
    return url
  }
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  return new Promise((resolve, reject) => {
    Ojsonp(url, opts, (err, data) => {
      if (err) {
        reject(err)
      }else {
        resolve(data)
      }
    })
  })
}
