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
      td {{ props.item.name }}
      td {{ props.item.date }}
    

</template>

<script>
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
        { text: 'Name', value: 'name', align: 'left' },
        { text: 'Date', value: 'date', align: 'left' }
      ],
      rows: [
        { 'name': 'Georgia', 'date': '2017-09-02' },
        { 'name': 'USC', 'date': '2017-10-17' }
      ]
    }
  }
}
</script>

<style>
</style>