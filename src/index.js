import Vue from 'vue';
import App from './App';
import store from './store';
import router from './pages/router';
import plugins from './plugins';
import globalComponents from '@/common' 
import 'lib/rem';
import './mock';

Vue.use(plugins);
Vue.use(globalComponents);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
