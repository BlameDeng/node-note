import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './modules/user.js'
import note from './modules/note.js'

const store = new Vuex.Store({
    modules: { user, note }
})

export default store