<template lang="pug">
div
  v-layout(row wrap)
    v-flex(xs3)
      no-ssr
        div
          label(for="opponent") Opponent
          vue-select(id="opponent" @input="setOpponent" label="Opponent" :options="allOpponents")
    v-flex(xs3)
      no-ssr
        div
          label(for="result") Result
          vue-select(id="result" @input="setResult" label="Result" v-model="filter.result" :options="results")
    v-flex(xs3)
      no-ssr
        div
          label(for="season") Season
          vue-select(id="season" label="Season" @input="setSeason" :options="allSeasons")
  div.text-xs-center.pt-2
    v-pagination(
      :length="numberOfPages"
      :value="pagesInfo.currentPage"
      total-visible="5"
      @input="setPage"
      circle
  )
  v-data-table(
    :pagination.sync="pagination"
    :headers="headers"
    :items="rows",
    :total-items="12"
    class="elevation-1"
    hide-actions
  )
    template(slot="items" slot-scope="props")
      td {{ props.item.seasonYear }}
      td {{ $moment(props.item.date).format('YYYY-MM-DD') }}
      td {{ props.item.opponent }}
      td {{ props.item.result }}
      td {{ props.item.score1 }} - {{ props.item.score2 }}
  div.text-xs-center.pt-2
    v-pagination(
      :length="numberOfPages"
      :value="pagesInfo.currentPage"
      total-visible="5"
      @input="setPage"
      circle
  )

</template>

<script>
import GAMES from '~/apollo/queries/games'
import ALL_SEASONS from '~/apollo/queries/allSeasons'
import ALL_OPPONENTS from '~/apollo/queries/allOpponents'
import PaginationMixin from '~/components/mixins/pagination'

export default {
  mixins: [PaginationMixin],
  data () {
    return {
      pagination: {
        sortBy: 'date',
        descending: true,
        sortMap: {
          'seasonYear': 'seasonYear',
          'date': 'date',
          'opponent': 'opponent',
          'result': 'result',
          'score': 'score1'
        }
      },
      opponent: null,
      result: null,
      seasonYear: null,
      opponents: ['Michigan', 'Purdue', 'Georgia', 'USC', 'Miami'],
      results: [
        'WIN', 'LOSS', 'TIE'
      ],
      seasons: ['2018', '2017', '2016', '1998'],
      headers: [
        { text: 'Season', value: 'seasonYear', align: 'left' },
        { text: 'Date', value: 'date', align: 'left' },
        { text: 'Opponent', value: 'opponent', align: 'left' },
        { text: 'Result', value: 'result', align: 'left' },
        { text: 'Score', value: 'score', align: 'left' }

      ],
      // filter: { season: {} },
      filter: {},
      // graphqlFilters: { season: {} }
      graphqlFilters: {}
    }
  },
  computed: {
    allSeasons () {
      console.log('compute allSeasons')
      return this.allSeasons
      // return ['2017', '2016', '2015', '2014', '2013']
    },
    allOpponents () {
      console.log('compute allOpponents')
      console.log(this.allOpponents)
      return this.allOpponents
    }
  },
  methods: {
    resetFilters () {
      this.filter = Object.assign({}, {})
      this.graphqlFilters = Object.assign({}, {})
    },
    setValue (key, value) {
      console.log(' set to value: ' + value)
      if (value) {
        this.filter[key] = value
      } else {
        delete this.filter[key]
      }
      console.log(this.filter)
      this.graphqlFilters = Object.assign({}, this.filter)
    },
    setOpponent (value) {
      this.setValue('opponent', value)
    },
    setResult (value) {
      this.setValue('result', value)
    },
    setSeason (value) {
      this.setValue('seasonYear', parseInt(value))
      // this.filter.season.year = parseInt(value)
      // this.graphqlFilters = Object.assign({}, this.filter)
    }
  },
  pagination: {
    itemsPerPage: 15
  },
  apollo: {
    allOpponents: {
      query: ALL_OPPONENTS,
      fetchPolicy: 'network-only',
      update (data) {
        return data.allOpponents.map(t => `${t.name}`)
      }
    },
    allSeasons: {
      query: ALL_SEASONS,
      fetchPolicy: 'network-only',
      update (data) {
        console.log('seasons')
        console.log(data.allSeasons.map(s => `${s.year}`))
        let seasons = data.allSeasons.map(s => `${s.year}`).sort().reverse()
        return seasons
      }
    },
    rows: {
      query: GAMES,
      fetchPolicy: 'network-only',
      variables () {
        return {
          opponent: this.graphqlFilters.opponent,
          result: this.graphqlFilters.result,
          seasonYear: this.graphqlFilters.seasonYear,
          orderBy: this.pagination.orderBy,
          first: this.pagesInfo.itemsPerPage,
          skip: this.pagesInfo.skip
        }
      },
      update (data) {
        this.pagesInfo.totalCount = data._allGamesMeta.count
        // this.pagesInfo.totalCount = data.allGames.length
        // console.log('total count from length is ' + data.allGames.length)
        // console.log('total count is ' + this.pagesInfo.totalCount)
        return data.allGames
      }
    }
  }
}
</script>

<style>
</style>