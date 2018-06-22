import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

export default async (event) => {
  console.log('My event')
  console.log(event)

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const { opponent, seasonYear } = event.data

  const winQuery = `
      query aggregateResults($opponent: String, $seasonYear: Int) {
          _allGamesMeta(filter: { opponent: $opponent, result: WIN, seasonYear: $seasonYear }) {
              count
          }
      }
      `
  const lossQuery = `
          query aggregateResults($opponent: String, $seasonYear: Int) {
              _allGamesMeta(filter: { opponent: $opponent, result: LOSS, seasonYear: $seasonYear }) {
                  count
              }
          }
          `
  const tieQuery = `
          query aggregateResults($opponent: String, $seasonYear: Int) {
              _allGamesMeta(filter: { opponent: $opponent, result: TIE, seasonYear: $seasonYear }) {
                  count
              }
          }
          `
  const countQuery = `
          query aggregateResults($opponent: String, $seasonYear: Int) {
              _allGamesMeta(filter: { opponent: $opponent, seasonYear: $seasonYear }) {
                  count
              }
          }
          `
  const variables = { opponent, seasonYear }
  const winCount = await api.request(winQuery, variables)
  const lossCount = await api.request(lossQuery, variables)
  const tieCount = await api.request(tieQuery, variables)
  const totalCount = await api.request(countQuery, variables)

  return { data: {
    count: totalCount._allGamesMeta.count,
    winCount: winCount._allGamesMeta.count,
    lossCount: lossCount._allGamesMeta.count,
    tieCount: tieCount._allGamesMeta.count } }
}

// function getResultsAgg(api, opponent) {
// async function getResultsAgg(api, opponent) {
//    const query = `
//      query aggregateResults($opponent: String!) {
//          _allGamesMeta(filter: { opponent: $opponent, result: WIN }) {
//              count
//          }
//      }
//    const variables = { opponent }
//    const value = await api.request(query, variables)
//    return value
// }


