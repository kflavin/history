<template lang="pug">
v-app
  v-content
    v-container(fluid grid-list-md)
      games/
</template>

<script>
import Games from '~/components/Games'

export default {
  created () {
    console.log('games page')
    console.log()
  },
  middleware: ['authenticated'],
  components: {
    Games
  }
}
</script>

<style lang="stylus">
</style>