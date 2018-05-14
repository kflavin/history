export default {
  methods: {
    submitForm () {
      console.log('Submitting the form')
      if (!this.$options.graphqlForm) {
        console.log('No graphqlform defined')
        return
      }

      // const opts = this.$options
      const graphqlForm = this.$options.graphqlForm
      const query = this.$options.graphqlForm.query

      console.log('query is ')
      console.log(query)
      console.log('variables are')
      console.log(graphqlForm.variables.call(this))

      this.$apollo.mutate({
        mutation: graphqlForm.query,
        variables: graphqlForm.variables.call(this)
      }).then((res) => {
        console.log('result is')
        console.log(res)
        graphqlForm.success.call(this, res)
      }).catch((err) => {
        console.log('caught error: ')
        console.log(err)
        graphqlForm.fail.call(this, err)
      })
    }
  }
}
