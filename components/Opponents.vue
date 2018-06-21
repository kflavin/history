<template lang="pug">
div
  v-layout(row wrap)
    v-flex(xs3)
      no-ssr
        div
          label(for="opponent") Name
          vue-select(id="opponent" @input="setOpponent" label="Opponent" :options="allOpps")

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
    :items="filterOpps",
    :total-items="12"
    class="elevation-1"
    hide-actions
  )
    template(slot="items" slot-scope="props")
      td {{ props.item }}
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
import FILTER_OPPONENTS from '~/apollo/queries/filterOpponents'
import ALL_OPPONENTS from '~/apollo/queries/allOpponents'
import PaginationMixin from '~/components/mixins/pagination'

export default {
  mixins: [PaginationMixin],
  data () {
    return {
      allOpponents: [],
      filterableOpponents: [],
      pagination: {
        sortBy: 'name',
        descending: false,
        sortMap: {
          'name': 'name'
        }
      },
      headers: [
        { text: 'Name', value: 'name', align: 'left' }

      ],
      filter: {},
      graphqlFilters: {}
    }
  },
  methods: {
    setOpponent (value) {
      if (value) {
        this.filter['name'] = value
      } else {
        delete this.filter['name']
      }
      this.graphqlFilters = Object.assign({}, this.filter)
    }
  },
  computed: {
    allOpps () {
      return this.allOpponents
    },
    filterOpps () {
      return this.filterableOpponents
    }
  },
  pagination: {
    itemsPerPage: 25
  },
  apollo: {
    allOpponents: {
      query: ALL_OPPONENTS,
      fetchPolicy: 'network-only',
      update (data) {
        return data.allOpponents.map(o => `${o.name}`)
      }
    },
    filterableOpponents: {
      query: FILTER_OPPONENTS,
      fetchPolicy: 'network-only',
      update (data) {
        this.pagesInfo.totalCount = data._allOpponentsMeta.count
        return data.allOpponents.map(o => `${o.name}`)
      },
      variables () {
        return {
          name: this.graphqlFilters.name,
          orderBy: this.pagination.orderBy,
          first: this.pagesInfo.itemsPerPage,
          skip: this.pagesInfo.skip
        }
      }
    }
  }
}
</script>

<style>
</style>