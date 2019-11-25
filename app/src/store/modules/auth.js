import axios from "axios";
import cookie from "vue-cookie";

/* eslint-disable prettier/prettier */
const state = {
	status: '',
	token: cookie.get('token') || "",
	errors: []
};

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
	getErrors: state => state.errors,
	getToken: state => state.token
};

const actions = {
	async LOGIN({
		commit
	}, user) {
		commit('AUTH_REQUEST');
		try {
			const result = await axios.post('http://localhost:3000/login', user);
			cookie.set('token', result.data.token, {
				expires: '8h'
			});
			commit('AUTH_SUCCESS', result.data.token)
			return result;
		} catch (error) {
			commit('AUTH_ERROR', error.response)
			cookie.delete('token')
			//console.error(error.response);
		}
	},

	async LOGOUT({
		commit
	}) {
		const result = await axios.post('http://localhost:3000/logout');
		commit('AUTH_LOGOUT');
		cookie.delete('token')
		return result;
	}
};

const mutations = {
	AUTH_REQUEST: (state) => {
		state.status = 'loading'
		state.errors = [];
	},
	AUTH_SUCCESS: (state, token) => {
		state.status = 'success'
		state.errors = [];
		state.token = token
	},
	AUTH_ERROR: (state, error) => {
		state.status = 'error'
		state.errors.push(error.data.errorMessage)
	},
	AUTH_LOGOUT: (state) => {
		state.token = "";
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};