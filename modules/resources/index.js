const { resolve } = require('path')

const isVueRule = (rule) => {
  return rule.test.toString() === '/\\.vue$/'
}
const isSassRule = (rule) => {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve('assets/sass/_variables.scss'),
      resolve('assets/sass/_mixins.scss')
    ]
  }
}

module.exports = function () {
  this.extendBuild((config, ctx) => {
    config.module.rules.forEach(rule => {
      if (isVueRule(rule)) {
        rule.options.loaders.sass.push(sassResourcesLoader)
        rule.options.loaders.scss.push(sassResourcesLoader)
      }

      if (isSassRule(rule)) {
        rule.use.push(sassResourcesLoader)
      }
    })
  })
}
