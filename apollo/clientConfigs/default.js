import {ApolloLink} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
// import {BatchHttpLink} from 'apollo-link-batch-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

export default ctx => {
  // const httpLink = new HttpLink({uri: 'http://localhost:60000/simple/v1/cjgyln01800020146e7hd3es6'})
  console.log('Set GraphQL API to: ')
  console.log(process.env.GRAPHQL_API)
  const httpLink = new HttpLink({uri: process.env.GRAPHQL_API})
  const middlewareLink = new ApolloLink((operation, forward) => {
    const session = process.server ? ctx.session : window.__NUXT__.state
    if (session && session.authUser) {
      const token = session.authUser.token
      if (token) {
        operation.setContext({
          headers: {authorization: `Bearer ${token}`}
        })
      }
    }
    return forward(operation)
  })

  console.log('default.js: concat link')
  // const link = middlewareLink.concat(httpLink)
  const link = ApolloLink.from([middlewareLink, httpLink])
  return {
    link,
    cache: new InMemoryCache()
  }
}
