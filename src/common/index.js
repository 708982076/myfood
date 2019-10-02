import ImageLoading from './ImageLoading/ImageLoading';
import Loading from './Loading/Loading';

export default {
  install(Vue) {
    Vue.component(ImageLoading.name, ImageLoading);
  }
}