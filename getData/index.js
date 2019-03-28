import { request } from 'lib/utils';

export const getAllCity = () => request('/city');
export const getLocation = (query) => request('/location', query);
export const getStoreItem = (id) => request('/storeItem', { id });
export const getStoreList = () => request('/store');
export const getStoreInfo = (id) => request('/storeinfo', {id});
export const getStoreComment = (id) => request('/storecomment', {id});
export const storeWordSerach = (keyword) => request('/storeWordSerach', {keyword});
