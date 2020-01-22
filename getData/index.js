import {create} from 'axios';
import {baseURL} from 'root/config';

let instance = create({baseURL})
const {get} = instance;
instance.interceptors.response.use((res) => {
  return res.data;
}); 

export const getAllCity = () => get('/city');
export const getLocation = (query) => get('/location', {params: {query}});
export const getStoreItem = (id) => get('/storeItem', { params: {id} });
export const getStoreList = (id) => {
  return id ? 
    get('/store').then((res) => res.find(food => food.id == id))
      : get('/store')
};
export const getStoreInfo = (id) => {
  return id ? 
    get('/storeinfo').then((res) => res.find(food => food.id == id))
      : get('/storeinfo')
};
export const getStoreComment = (id) => {
  return id ? 
    get('/storecomment').then(res => res.find(food => food.id == id)) 
      : get('/storecomment');
};
export const storeWordSerach = (keyword) => get('/storeWordSerach', { params: {keyword} });
