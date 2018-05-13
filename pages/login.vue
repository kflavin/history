<template lang="pug">
v-content
  v-container(fluid)
    v-layout(row wrap)
      v-flex(xs4 offset-xs4)
        h1 Login?
        v-form
        v-text-field(
            label="Email"
            v-model="email"
        )
        v-text-field(
            label="Password"
            type="password"
        )
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: 'user'
    }
  },
  created () {
    return 'Created page'
  }
}
</script>

<style scoped>
</style>