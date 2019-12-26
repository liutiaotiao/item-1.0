const fs = require('fs')
const Config = require('./src/config/page.js')

let pageConfig = {}

function addPageConfig(path, dir) {
  if (isPage(path + '/' + dir)) {
    if (pageConfig.hasOwnProperty(dir)) {
      throw new Error('duplicate file name:' + dir)
    }
    let template = 'public/index.html'

    if (fs.existsSync(path + '/' + dir + '/index.html')) {
      template = path + '/' + dir + '/index.html'
    }

    pageConfig[dir] = {
      entry: path + '/' + dir + '/index.js',
      filename: dir + '.html',
      path: dir,
      title: Config.hasOwnProperty(dir) ? Config[dir].title : '',
      template: template,
      chunks: ['chunk-vendors', 'chunk-common', dir],
      app_env: process.env.VUE_APP_MODE,
      pageName: dir
    }
  }

  let fileOrDir = fs.readdirSync(path + '/' + dir)

  fileOrDir.forEach(function(file) {
    let newDir = path + '/' + dir
    if (fs.statSync(newDir + '/' + file).isDirectory()) {
      addPageConfig(newDir, file)
    }
  })
}

function isPage(dir) {
  if (fs.existsSync(dir + '/index.js') && fs.existsSync(dir + '/index.vue')) {
    return true
  }
  return false
}

console.log('build mode => ', process.env.VUE_APP_MODE)

addPageConfig('src', 'pages')

module.exports = pageConfig
