import Mock from 'mockjs';

import store from './mockData/store';
import location from './mockData/location';
import storeComment from './mockData/storeComment';
import storeInfo from './mockData/storeInfo';
import city from './mockData/city';

Mock.mock('/store', store);
Mock.mock(/\/location(\?)?\w*/, location);
Mock.mock('/storeComment', storeComment);
Mock.mock('/city', city);
Mock.mock('/storeInfo', storeInfo);