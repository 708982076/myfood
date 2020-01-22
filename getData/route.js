const commentJSON = require('./comments-write');
const storeJSON = require('./store-write');
const shopInfoJSON = require('./shopInfo-write');

module.exports = function(app) {
// export const getAllCity = () => get('/city');
// export const getLocation = (query) => get('/location', {params: {query}});
// export const getStoreItem = (id) => get('/storeItem', { params: {id} });
// export const getStoreList = () => get('/store');
// export const getStoreInfo = (id) => get('/storeinfo', { params: {id} });
// export const getStoreComment = (id) => get('/storecomment', { params: {id} });
// export const storeWordSerach = (keyword) => get('/storeWordSerach', { params: {keyword} });
  app.get('/store', (req, res) => {
    res.json(storeJSON);
  })
  app.get('/storeinfo', (req, res) => {
    res.json(shopInfoJSON);
  });
  app.get('/storecomment', (req, res) => {
    res.json(commentJSON);
  })
}