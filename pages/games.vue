<template lang="pug">
v-app
  v-content
    v-container(fluid grid-list-md)
      games/
</template>

<script>
import Games from '~/components/games'

export default {
  created () {
    console.log('games page')
  },
  components: {
    Games
  }
}
</script>

<style lang="stylus">
</style>