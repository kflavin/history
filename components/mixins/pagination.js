export default {
  data () {
    let itemsPerPage = this.$options.pagination.itemsPerPage || 25
    return {
      pagesInfo: {
        skip: 0,
        itemsPerPage: itemsPerPage,
        totalCount: 0,
        currentPage: 1
      }
    }
  },
  methods: {
    setPage (page) {
      var pagesInfoNew = Object.assign({}, this.pagesInfo)

      pagesInfoNew.currentPage = page

      if (page > 1) {
        console.log('page > 1 ' + (page - 1) * this.pagesInfo.itemsPerPage)
        pagesInfoNew.skip = (page - 1) * this.pagesInfo.itemsPerPage
      } else {
        console.log('page <= 1')
        pagesInfoNew.skip = 0
      }

      this.pagesInfo = pagesInfoNew
    }
  },
  watch: {
    pagination: {
      handler () {
        console.log('pagination changed!')
        console.log(this.pagination)
        var sorter = this.pagination.sortBy

        if (sorter && this.pagination.sortMap[sorter]) {
          this.pagination.orderBy = this.pagination.sortMap[sorter]
          if (this.pagination.descending) {
            this.pagination.orderBy += '_DESC'
          } else {
            this.pagination.orderBy += '_ASC'
          }
        }

        // if (this.pagination.rowsPerPage) {
        //   this.
        // }
      }
    },
    deep: true,
    immediate: true
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.pagesInfo.totalCount / this.pagesInfo.itemsPerPage)
    }
  }
}
