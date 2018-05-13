import {ApolloLink} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
// import {BatchHttpLink} from 'apollo-link-batch-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

export default ctx => {
  // const httpLink = new HttpLink({uri: 'http://localhost:60000/simple/v1/cjgyln01800020146e7hd3es6'})
  const httpLink = new HttpLink({uri: process.env.GRAPHQL_API})
  const middlewareLink = new ApolloLink((operation, forward) => {
    const authUser = process.server ? ctx.session.authUser : window.__NUXT__.state.authUser
    var token = null
    if (authUser) {
      token = authUser.token

      if (token) {
        operation.setContext({
          headers: {authorization: `Bearer ${token}`}
        })
      }
    }

    forward(operation)
  })

  const link = middlewareLink.concat(httpLink)
  return {
    link,
    cache: new InMemoryCache()
  }
}
