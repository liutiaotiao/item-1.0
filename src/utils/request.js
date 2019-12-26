import Axios from 'axios'
import Config from '../config/app.js'
// import { getToken } from '../utils/app'
//import { Toast } from 'vant';

const service = Axios.create({
  // baseURL: Config.apiUrl + '/' + Config.apiPrefix,
  // baseURL: Config.apiUrl + '/',
  baseURL: '',
  headers: {
    Accept: '*/*'
  }
  // timeout: Config.timeout
})

service.defaults.retry = Config.requestRetry
service.defaults.retryDelay = Config.requestRetryDelay
let LoadingInstance = null

service.interceptors.request.use(
  config => {
    if (!config.closeLoading) {
      //加载提示
      // window.LoadingInstance = Toast.loading({
      //     mask: true,
      //     message: '加载中...'
      // });
    }
    // config.headers['Authorization'] = getToken() || ''
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    //if(LoadingInstance){LoadingInstance.clear();}

    if (res.status !== 0) {
      //Toast('数据返回出错');
      return res.data.data
    } else {
      if (res.config.closeInterceptors) {
        return Promise.reject(res.data) //自己处理错误
      }
      //统一处理错误
      // Toast(res.data.msg)
      return Promise.reject('error')
    }
  },
  error => {
    //if(LoadingInstance){LoadingInstance.clear();}
    //Toast("网络错误");
    return Promise.reject(error)
  }
)

export default service
