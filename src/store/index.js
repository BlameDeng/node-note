import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import auth from './modules/auth.js'
import note from './modules/note.js'

const store = new Vuex.Store({
    modules: { auth, note }
})

export default store