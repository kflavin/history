import { fromEvent, FunctionEvent } from 'graphcool-lib'
import { GraphQLClient } from 'graphql-request'

export default async (event) => {
  console.log('My event')
  console.log(event)

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const { opponent, seasonYear, result } = event.data

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
  let winCount, lossCount, tieCount, totalCount

  if (result !== undefined) {
    if (result === 'WIN') {
      winCount = await api.request(winQuery, variables)
      totalCount = winCount
      lossCount = 0
      tieCount = 0
    } else if (result === 'LOSS') {
      lossCount = await api.request(lossQuery, variables)
      totalCount = lossCount
      winCount = 0
      tieCount = 0
    } else if (result === 'TIE') {
      tieCount = await api.request(tieQuery, variables)
      totalCount = tieCount
      winCount = 0
      lossCount = 0
    } else {
      winCount = await api.request(winQuery, variables)
      lossCount = await api.request(lossQuery, variables)
      tieCount = await api.request(tieQuery, variables)
      totalCount = await api.request(countQuery, variables)
    }
  } else {
    winCount = await api.request(winQuery, variables)
    lossCount = await api.request(lossQuery, variables)
    tieCount = await api.request(tieQuery, variables)
    totalCount = await api.request(countQuery, variables)
  }

  return { data: {
    count: isNaN(totalCount) ? totalCount._allGamesMeta.count : totalCount,
    winCount: isNaN(winCount) ? winCount._allGamesMeta.count : winCount,
    lossCount: isNaN(lossCount) ? lossCount._allGamesMeta.count : lossCount,
    tieCount: isNaN(tieCount) ? tieCount._allGamesMeta.count : tieCount } }
}
