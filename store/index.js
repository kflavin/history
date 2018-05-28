import axios from 'axios'

export const state = () => ({
  user: null
})

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    if (req.session && req.session.user) {
      commit('setUser', req.session.user)
    }
  },
  async setUser ({commit, state}, user) {
    console.log('setUser action')
    console.log(user)
    commit('setUser', { id: user.id, token: user.token })
    await axios.post('/api/set_user', {id: user.id, token: user.token})
  },
  async logout ({commit, state}) {
    commit('logout')
    await axios.post('/api/set_user', null)
  }
}

export const mutations = {
  setUser (state, user) {
    console.log('setUser mutation')
    console.log(user)
    state.user = user
  },
  logout (state) {
    state.user = null
  }
}

export const getters = {
  isAuthenticated (state) {
    console.log('isAuthenticated')
    return state.user && Object.keys(state.user).length !== 0
  }
}
