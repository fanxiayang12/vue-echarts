export default {
  namespaced: true,
  state: {
    info: {}
  },
  actions: {
    set({ state, dispatch, commit }, info) {
      return new Promise(async resolve => {
        commit('set', info);
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'user.info',
          value: info,
          user: true
        }, { root: true })
        resolve()
      })
    },
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        state.info = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'user.info',
          defaultValue: {},
          user: true
        }, { root: true })
        resolve()
      })
    }
  }, mutations: {
    set(state, info) {
      state.info = info
    }
  }
}
