import Toast from './toast';
import leftPad from './leftpad'
import dateFormat from './dateFormat'

const install = function(Vue) {
  if (install.installed) return;
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.prototype.$leftPad = leftPad
  Vue.prototype.$dateFormat = dateFormat
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  Toast,
  install,
};
