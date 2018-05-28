<template lang="pug">
  v-toolbar(color="primary" class="white--text")
    v-toolbar-title Games
    v-spacer
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