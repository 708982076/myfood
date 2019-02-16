import Ojsonp from 'jsonp'
import { request } from '@/config/utils';

export const getHotCity = () => request('/hotCity')
export const getallCity = () => request('/allCity')
export const getCurrentCity = () => request('/currentCity')
export const login = (user) => request('/login', user, 'POST')
export const getSellerInfo = (id) => request('/sellerInfo', {id}) //获取店铺信息
export const getSellerFoodList = (id) => request('/sellerFoodList', {id}) //获取店铺食品
export const getNearbySeller = () => request('/nearbySeller') //获取附近店铺
export const getComment = (id) => request('/comment', {id}) //获取店铺评论
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
