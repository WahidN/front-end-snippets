/* eslint-disable prettier/prettier */
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/');
};

const ifAuthenticated = (to, from, next) => {
	if (store.getters.isAuthenticated) {
		next();
		return;
	}
	next('/login');
};

const routes = [{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			layout: 'login'
		},
		component: () => import('../views/Login.vue'),
		beforeEnter: ifNotAuthenticated
	},
	{
		path: '/register',
		name: 'register',
		meta: {
			layout: 'login'
		},
		component: () => import('../views/Register.vue'),
		beforeEnter: ifNotAuthenticated
	},
	{
		path: '/admin',
		name: 'dashboard',
		meta: {
			layout: 'admin'
		},
		component: () => import('../views/AdminDashboard.vue'),
		beforeEnter: ifAuthenticated
	},
	{
		path: '/admin/submit',
		meta: {
			layout: 'admin'
		},
		component: () => import('../views/SubmitSnippet.vue'),
		beforeEnter: ifAuthenticated
	},
	{
		path: '/admin/favorites',
		meta: {
			layout: 'admin'
		},
		component: () => import('../views/Favorites.vue'),
		beforeEnter: ifAuthenticated
	},
	{
		path: '*',
		name: '404',
		component: () => import('../views/404.vue')
	}
];

const router = new VueRouter({
	mode: 'history',
	routes
});

export default router;