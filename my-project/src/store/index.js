import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
      count: 1
    },
    mutations: {
      increment (state) {
        // εζ΄ηΆζ
        state.count++
      }
    },
    modules:{
      user:user
    }
  })

  export default store;