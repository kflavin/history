import Vue from 'vue'
import vSelect from 'vue-select'

const VueSelect = {
  install (Vue, options) {
    Vue.component('vue-select', vSelect)
  }
}

Vue.use(VueSelect)
export default VueSelect
