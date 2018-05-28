module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  env: {
    GRAPHQL_API: process.env.GRAPHQL_API
  },
  /*
  ** Global CSS
  */
  css: [
    // '~/assets/css/main.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-select', 'moment'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'eval-source-map'

        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/apollo',
    '~/modules/resources'
  ],
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/global.js',
    '~/plugins/moment.js',
    { src: '~/plugins/vue-select.js', ssr: false }
  ],
  apollo: {
    clientConfigs: {
      default: '~/apollo/clientConfigs/default.js'
    }
  }
}
