const storeJSON = require('./shopInfo-init');
const fs = require('fs');

let id = 1;

storeJSON.forEach(store => {
  store.id = id++;
})

fs.writeFileSync('./shopInfo-write.json', JSON.stringify(storeJSON));