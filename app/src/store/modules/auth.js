/* eslint-disable prettier/prettier */
import axios from "axios";
import cookie from "vue-cookie";

const state = {
	status: '',
	token: cookie.get('token') || "",
	errors: []
};

const getters = {
	isAuthenticated: state => !!state.token,
	authStatus: state => state.status,
	getErrors: state => state.errors,
	getToken: state => state.token,
};

const actions = {
	async REGISTER({
		commit
	}, user) {
		commit('AUTH_REQUEST');
		try {
			const result = await axios.post(`${process.env.VUE_APP_URI}register`, user);
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
			const result = await axios.post(`${process.env.VUE_APP_URI}login`, user);
			cookie.set('token', result.data.token, {
				expires: '8h'
			});
			commit('AUTH_SUCCESS', result.data)
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
		const result = await axios.post(`${process.env.VUE_APP_URI}logout`);
		commit('AUTH_LOGOUT');
		cookie.delete('token')
		return result;
	},
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
		localStorage.setItem("userEmail", data.email);
	},
	AUTH_ERROR: (state, error) => {
		state.status = 'error'
		state.errors.push(error.data.errorMessage)
	},
	AUTH_LOGOUT: (state) => {
		state.token = "";
		localStorage.removeItem("userEmail");
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};