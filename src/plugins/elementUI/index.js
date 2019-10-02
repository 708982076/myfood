import {
  Button,
  Badge,
  Col,
  Tabs,
  TabPane,
  Image,
  Icon,
  InfiniteScroll,
  Row,
  Avatar
} from 'element-ui';

export default {
  install(Vue) {
    Vue.use(Avatar);
    Vue.use(Button);
    Vue.use(Badge);
    Vue.use(Col);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Image);
    Vue.use(Icon);
    Vue.use(InfiniteScroll);
    Vue.use(Row);
  }
}