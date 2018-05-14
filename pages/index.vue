<template lang="pug">
  v-app
    v-content
      v-container
        v-layout
          v-flex(xs12 align-center align-content-center class="text-xs-center") Welcome
        v-layout(row wrap)
          v-flex(hidden-lg-and-up) hello1
          v-flex(lg3 md4 xs12) hello2
          v-flex(lg3 md4 xs12) hello3
          v-flex(lg3 md4 xs12) hello4
          v-flex(lg3 md4 xs12) hello5
          v-flex(lg3 md4 xs12) hello6
        v-layout(row)
          v-flex(md4 class="text-xs-center")
            v-text-field(
              v-model="email"
              label="Email"
            )
        v-layout(row align-center align-content-center class="text-xs-center")
          v-flex(md4)
            v-text-field(
              v-model="password"
              label="Password"
              type="password"
            )
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
    },
    fail (res) {
      console.log('Invalid credentials!')
    }
  },
  methods: {
    submitForm2 () {
      console.log('submitting the form')
      this.$apollo.mutate({
        mutation: AUTHENTICATION_MUTATION,
        variables: {
          eail: 'asdfas',
          password: 'password',
          bullshit: 'asdf'
        }
      }).then((res) => {
        console.log(' we have success !! ')
      }).catch((err) => {
        console.log('error')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
