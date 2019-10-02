import {create} from 'axios';
import {baseURL} from 'root/config';

let instance = create({baseURL})
const {get} = instance;
instance.interceptors.response.use((res) => {
  let {message, code} = res.data;
  if (code == 0) {
    return res.data;
  }else {
    return Promise.reject(message);
  }
}); 

export const getAllCity = () => get('/city');
export const getLocation = (query) => get('/location', {params: {query}});
export const getStoreItem = (id) => get('/storeItem', { params: {id} });
export const getStoreList = () => get('/store');
export const getStoreInfo = (id) => get('/storeinfo', { params: {id} });
export const getStoreComment = (id) => get('/storecomment', { params: {id} });
export const storeWordSerach = (keyword) => get('/storeWordSerach', { params: {keyword} });
