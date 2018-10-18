import request from '@/helpers/request.js'
import URL from '@/helpers/url.js'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async createUser({ commit }, data) {
        let res = await request({ url: URL.createUser, method: 'POST', data });
        return res;
    }
}

export default { state, getters, mutations, actions }