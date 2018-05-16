<template lang="pug">
div
  v-layout(row wrap)
    v-flex(xs12).headline
      | Games
    v-flex(xs3)
      no-ssr
        div
          label(for="opponent") Opponent
          vue-select(id="opponent" label="Opponent" v-model="opponent" :options="opponents")
    v-flex(xs3)
      no-ssr
        div
          label(for="result") Result
          vue-select(id="result" label="Result" v-model="result" :options="teams")
    v-flex(xs3)
      no-ssr
        div
          label(for="season") Season
          vue-select(id="season" label="Season" v-model="season" :options="seasons")
  v-data-table(
    :headers="headers"
    :items="rows",
    :total-items="5"
    class="elevation-1"
  )
    template(slot="items" slot-scope="props")
      td {{ props.item.opponent }}
      td {{ props.item.date }}
    

</template>

<script>
import GAMES from '~/apollo/queries/games'

export default {
  created () {
    console.log('created')
  },
  data () {
    return {
      opponent: null,
      result: null,
      season: null,
      opponents: ['Michigan', 'Purdue', 'Georgia', 'USC', 'Miami'],
      teams: ['Win', 'Loss', 'Tie'],
      seasons: ['2018', '2017', '2016'],
      headers: [
        { text: 'Opponent', value: 'opponent', align: 'left' },
        { text: 'Date', value: 'date', align: 'left' }
      ],
      filters: {
        opponent: '',
        home: null,
        score1: null,
        score2: null,
        result: null,
        date: null
      }
    }
  },
  apollo: {
    rows: {
      query: GAMES,
      fetchPolicy: 'network-only',
      variables () {
        console.log('Set variables')
        let data = {}
        let filters = Object.keys(this.filters).filter(key => this.filters[key])

        filters.forEach(key => {
          data[key] = filters[key]
        })

        console.log('Filters are set to ')
        console.log(data)

        return data
      },
      update (data) {
        return data.allGames
        // if (data.allGames) {
        //   return data.allGames
        // }
      }
    }
  }
}
</script>

<style>
</style>