import request from '@/helpers/request.js'
import URL from '@/helpers/url.js'

const state = {
    user: null,
    isLogin: false
}

const getters = {}

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
    setLogin(state, payload) {
        state.isLogin = payload;
    }
}

const actions = {
    async register({ commit }, data) {
        let res = await request({ url: URL.register, method: 'POST', data });
        commit('setUser', res.data);
        res.isLogin ? commit('setLogin', res.isLogin) : '';
        res.token ? localStorage.setItem('token', res.token) : '';
        return res;
    },
    async login({ commit }, data) {
        let res = await request({ url: URL.login, method: 'POST', data });
        console.log(res);
        commit('setUser', res.data);
        res.isLogin ? commit('setLogin', res.isLogin) : '';
        res.token ? localStorage.setItem('token', res.token) : '';
        return res;
    },
    async check({ commit }) {
        let res = await request({ url: URL.check });
        commit('setLogin', res.isLogin);
        commit('setUser', res.data);
        return res;
    }
}

export default { state, getters, mutations, actions }