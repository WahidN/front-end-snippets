/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueCookie from 'vue-cookie';
import Master from './layouts/Master.vue';
import Admin from './layouts/Admin.vue';
import Login from './layouts/Login.vue';
//import Prism from "prismjs";

//global properties
Vue.prototype.$http = axios;
Vue.use(Vuelidate);
Vue.use(VueCookie);

//axios set header
axios.interceptors.request.use(
	(config) => {
		const token = store.getters["getToken"];
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

// layouts
Vue.component('master-layout', Master);
Vue.component('admin-layout', Admin);
Vue.component('login-layout', Login);

//bulma
import './../node_modules/bulma/css/bulma.min.css';

// scss
import './assets/styles/_main.scss';

Vue.config.productionTip = false;
//Prism.highlightAll();

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');