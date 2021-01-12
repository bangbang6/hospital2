import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    dataId:0
  },
  mutations: {
   setDataId(state,dataId){
     state.dataId = dataId
   }
  }
})


export default store