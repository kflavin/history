<template lang="pug">
  v-toolbar(color="primary" class="white--text")
    v-toolbar-title Games?
    v-spacer
    v-menu
      v-list
        v-list-tile(:href="'/opponents'")
          v-list-tile-title Opponents
    v-toolbar-items
      v-btn(flat :href="'/'" class="white--text") Games
      v-btn(flat :href="'/opponents'" class="white--text") Opponents

    v-btn(icon to="/logout")
      v-icon(v-if="isAuthenticated && !isLoginPage" class="white--text") fa-sign-out-alt
      v-icon(v-if="!isAuthenticated && !isLoginPage" class="white--text") fa-sign-in-alt
</template>

<script>
// import mapGetters from 'vuex'

export default {
  name: 'NavBar',
  created () {
    console.log(this.$route)
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.user && Object.keys(this.$store.state.user).length !== 0
    },
    isLoginPage () {
      return this.$route.name === 'login'
    }
  }
//   computed: mapGetters(['isAuthenticated'])
}
</script>