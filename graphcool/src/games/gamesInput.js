import { fromEvent } from 'graphcool-lib'

export default async event => {
  console.log('Your event:')
  console.log(event)
  const lib = fromEvent(event)
  const client = lib.api('simple/v1')
  const {allGames} = await client.request(`{allGames{opponent}}`)
  console.log(allGames.opponent)

  return {
    data: {
      allGames
    }
  }
}
