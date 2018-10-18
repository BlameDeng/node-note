import request from '@/helpers/request.js'
import URL from '@/helpers/url.js'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async findAllNotes({ commit }) {
        let res = await request({ url: URL.allNotes, method: 'GET' });
        return res;
    },

    async createNote({ commit }, data) {
        let res = await request({ url: URL.createNote, method: 'POST', data });
        return res;
    },

    async patchNote({ commit }, data) {
        let res = await request({ url: URL.patchNote, method: 'PATCH', data });
        return res;
    },

    async destroyNote({ commit }, id) {
        let res = await request({ url: URL.destroyNote, method: 'DELETE', data: { id } });
        return res;
    }
}

export default { state, getters, mutations, actions }