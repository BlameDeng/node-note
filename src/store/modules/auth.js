import request from '@/helpers/request.js'
import URL from '@/helpers/url.js'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async register({ commit }, data) {
        let res = await request({ url: URL.register, method: 'POST', data });
        return res;
    },
    async login({ commit }, data) {
        let res = await request({ url: URL.login, method: 'POST', data });
        return res;
    }
}

export default { state, getters, mutations, actions }