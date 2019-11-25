/* eslint-disable prettier/prettier */
import axios from "axios";
import cookie from "vue-cookie";
const state = {
	status: '',
	token: cookie.get('token') || "",
	userEmail: null,
	errors: []
};

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
	getErrors: state => state.errors,
	getToken: state => state.token,
	getUserEmail: state => state.userEmail
};

const actions = {
	async REGISTER({
		commit
	}, user) {
		commit('AUTH_REQUEST');
		try {
			const result = await axios.post('http://localhost:3000/register', user);
			commit('AUTH_SUCCESS', result.data)
			return result;
		} catch (error) {
			console.log(error.response)
			commit('AUTH_ERROR', error.response)
			return error.response;
		}
	},
	async LOGIN({
		commit
	}, user) {
		commit('AUTH_REQUEST');
		try {
			const result = await axios.post('http://localhost:3000/login', user);
			cookie.set('token', result.data.token, {
				expires: '8h'
			});
			commit('AUTH_SUCCESS', result.data)
			console.log(result.data);
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
	AUTH_SUCCESS: (state, data) => {
		state.status = 'success'
		state.errors = [];
		state.token = data.token;
		state.userEmail = data.email;
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