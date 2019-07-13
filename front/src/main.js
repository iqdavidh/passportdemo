import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

const urlBase = 'http://localhost:3000';
const UrlApi = {
	login: urlBase + '/api/login',
	logout: urlBase + '/api/logout',
	private_page: urlBase + '/api/private-page',
	private_only_admin: urlBase + '/api/private-only-admin',
	rooom: urlBase + '/api/rooms',
	validar_acceso: urlBase + '/api/validar_acceso'
};

/*
*
* login - post - username and password  -
* logout - get -sin parametros - no se requiere vista
* private_page - get - no hay parametros,
* private-only-admin - get - no hay paremtros
* rooms - es un crud room
* validar_acceso - get - ruta , no  tiene visa
* */

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
