import request from '@/helpers/request.js'
import URL from '@/helpers/url.js'

const state = {
    allNotes: null
}

const getters = {}

const mutations = {
    setAllNotes(state, payload) {
        state.allNotes = payload;
    },
    addNote(state, payload) {
        state.allNotes = state.allNotes || [];
        state.allNotes.push(payload);
    },
    deleteNote(state, payload) {
        state.allNotes = state.allNotes.filter(note => note.id !== payload);
    }
}

const actions = {
    async findAllNotes({ commit }) {
        let res = await request({ url: URL.allNotes, method: 'GET' });
        commit('setAllNotes', res.data);
        return res;
    },

    async createNote({ commit }, data) {
        let res = await request({ url: URL.createNote, method: 'POST', data });
        commit('addNote', res.data);
        return res;
    },

    async patchNote({ commit }, data) {
        let res = await request({ url: URL.patchNote, method: 'PATCH', data });
        return res;
    },

    async destroyNote({ commit }, id) {
        let res = await request({ url: URL.destroyNote, method: 'DELETE', data: { id } });
        commit('deleteNote', id);
        return res;
    }
}

export default { state, getters, mutations, actions }