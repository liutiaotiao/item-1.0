export default {
  apiPrefix: "",
  timeout: 10000,
  accessTokenKey: 'ACCESS_TOKEN', //如果多个应用在同一个域下，本地存储最好添加前缀
  userInfoKey: 'USER_INFO',
  requestRetry: 4,
  requestRetryDelay: 800,
  designSize: 750, //设计稿宽度 375,建议使用375，可以和一些主流的ui库兼容。如vant
}