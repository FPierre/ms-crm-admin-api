import userService from '../../api/user-service'
import * as types from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const actions = {
  login ({ commit, state }, userCredentials) {
    userService.login(
      userCredentials,
      (user) => commit(types.LOGIN_SUCCESS, { user }),
      () => commit(types.LOGIN_FAILURE)
    )
  }
}

const mutations = {
  [types.LOGIN_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.LOGIN_FAILURE] (state) {
    console.log('login fail')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
