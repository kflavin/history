<template lang="pug">
  v-app
    v-content
      v-container(fluid)
        v-layout
          v-flex(xs12 align-center align-content-center class="text-xs-center")
            h1 Login
        v-layout(row flex align-center justify-center)
          v-flex(xs3)
            v-text-field(
              v-model="email"
              label="Email"
            )
        v-layout(row flex align-center justify-center)
          v-flex(xs3)
            v-text-field(
              v-model="password"
              label="Password"
              type="password"
            )
        v-layout(row flex align-center justify-center)
          v-flex(xs1)
            v-btn(@click="submitForm") Login



</template>

<script>
// import axios from '~/plugins/axios'
import AUTHENTICATION_MUTATION from '~/apollo/mutations/authenticate'

export default {
  // async asyncData () {
  //   let { data } = await axios.get('/api/users')
  //   return { users: data }
  // },
  layout: 'default',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    console.log(AUTHENTICATION_MUTATION)
  },
  head () {
    return {
      title: 'Users'
    }
  },
  graphqlForm: {
    query: AUTHENTICATION_MUTATION,
    variables () {
      return {
        email: this.email,
        password: this.password
      }
    },
    success (res) {
      console.log('You have logged in!')
      console.log(res)
      this.$store.dispatch('setUser', res.data.authenticateUser)
      this.$router.push('/')
    },
    fail (res) {
      console.log('Invalid credentials!')
    }
  }
  // methods: {
  //   submitForm2 () {
  //     console.log('submitting the form')
  //     this.$apollo.mutate({
  //       mutation: AUTHENTICATION_MUTATION,
  //       variables: {
  //         eail: 'asdfas',
  //         password: 'password',
  //         bullshit: 'asdf'
  //       }
  //     }).then((res) => {
  //       console.log(' we have success !! ')
  //     }).catch((err) => {
  //       console.log('error')
  //       console.log(err)
  //     })
  //   }
  // }
}
</script>

<style scoped>

</style>
