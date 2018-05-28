<template lang="pug">
  v-app
    nav-bar/
    nuxt/
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  created () {
    console.log('the default layout created()')
  },
  components: {
    NavBar
  }
}
</script>

<style lang='stylus'>
  @import '../assets/stylus/app.styl'
</style>