<template lang="pug">
  div
    p You've been logged out
</template>

<script>
export default {
  created () {
    this.$store.dispatch('logout')
    this.$router.push('/login')
  }
}
</script>