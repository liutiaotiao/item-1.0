const path = require("path");
const pagesConfig = require("./page.config.js");
const px2rem = require("postcss-px2rem");

const postcss = px2rem({
  remUnit: 100
});

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: isProduction ? "//static.uugtv.com" : "/static/v3/m",
  outputDir: "../mobile3-release/static/v3/m",
  assetsDir: "public/static",
  runtimeCompiler: true,
  productionSourceMap: true,
  parallel: true,
  pages: pagesConfig,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "^/(g)/": {
        target: "http://g-api.test2.tuji.com"
      },
      "^/(udata)/": {
        target: "http://udata.test2.tuji.com"
      },
      "^/(x)/": {
        target: "http://jax-api.test2.tuji.com"
      },
      "^/": {
        target: "http://test-api.test2.tuji.com"
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", path.resolve("./src"));
    // config.module
    //   .rule('html')
    //   .test(/\.(html)$/)
    //   .use('html')
    //   .loader('html-loader')
  }
};
