<template lang="pug">
div
  v-layout(row wrap)
    v-flex(xs3)
      no-ssr
        div
          label(for="opponent") Opponent
          vue-select(id="opponent" @input="setOpponent" label="Opponent" :options="opponents")
    v-flex(xs3)
      no-ssr
        div
          label(for="result") Result
          vue-select(id="result" @input="setResult" label="Result" v-model="filter.result" :options="results")
    v-flex(xs3)
      no-ssr
        div
          label(for="season") Season
          vue-select(id="season" label="Season" @input="setSeason" :options="seasons")
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
      td {{ props.item.season.year }}
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
import PaginationMixin from '~/components/mixins/pagination'

export default {
  mixins: [PaginationMixin],
  data () {
    return {
      pagination: {
        sortBy: 'date',
        descending: true,
        sortMap: {
          'season': 'season',
          'date': 'date',
          'opponent': 'opponent',
          'result': 'result',
          'score': 'score1'
        }
      },
      opponent: null,
      result: null,
      season: null,
      opponents: ['Michigan', 'Purdue', 'Georgia', 'USC', 'Miami'],
      results: [
        'WIN', 'LOSS', 'TIE'
      ],
      seasons: ['2018', '2017', '2016', '1998'],
      headers: [
        { text: 'Season', value: 'season', align: 'left' },
        { text: 'Date', value: 'date', align: 'left' },
        { text: 'Opponent', value: 'opponent', align: 'left' },
        { text: 'Result', value: 'result', align: 'left' },
        { text: 'Score', value: 'score', align: 'left' }

      ],
      filter: { season: {} },
      graphqlFilters: { season: {} }
    }
  },
  methods: {
    resetFilters () {
      this.filter = Object.assign({ season: {} }, {})
      this.graphqlFilters = Object.assign({ season: {} }, {})
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
      this.filter.season.year = parseInt(value)
      this.graphqlFilters = Object.assign({}, this.filter)
    }
  },
  pagination: {
    itemsPerPage: 15
  },
  apollo: {
    allSeasons: {
      query: ALL_SEASONS,
      fetchPolicy: 'network-only',
      update (data) {
        return data.allSeasons
      }
    },
    rows: {
      query: GAMES,
      fetchPolicy: 'network-only',
      variables () {
        return {
          opponent: this.graphqlFilters.opponent,
          result: this.graphqlFilters.result,
          season: this.graphqlFilters.season,
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