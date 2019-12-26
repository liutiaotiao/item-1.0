import 'normalize.css'
import 'animate.css'
import '@/utils/logger'
import '@/utils/tap'
import '@/utils/bridge'
import '@/utils/http-sign'
import '@/assets/css/style.less'
import plugin from '@/plugin'
import Vue from 'vue'
import axios from 'axios'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import { setHtmlFontSize } from '@/utils/setHtmlFontSize.js'
import { validateAndInitUrlParams } from '@/utils/validateAndInitUrlParams.js'

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.filter('currency', function(num) {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
})

Vue.use(plugin)
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

Vue.prototype.$http = axios
Vue.prototype.bridge = tujiJSBridge

fastClick.attach(document.body)
setHtmlFontSize()
validateAndInitUrlParams()