export default {
  data () {
    let itemsPerPage = this.$options.pagination.itemsPerPage || 25
    return {
      pagesInfo: {
        itemsPerPage: itemsPerPage,
        totalCount: 0,
        currentPage: 1,
        afterCursor: null
      }
    }
  },
  watch: {
    pagination: {
      handler () {
        console.log('pagination changed!')
        console.log(this.pagination)
        if (this.pagination.sortBy) {
          this.pagination.orderBy = this.pagination.sortBy
          if (this.pagination.descending) {
            this.pagination.orderBy += '_DESC'
          } else {
            this.pagination.orderBy += '_ASC'
          }
        }
      }
    },
    deep: true,
    immediate: true
  }
}
