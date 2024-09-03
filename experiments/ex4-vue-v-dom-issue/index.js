import Vue from 'vue/dist/vue.esm.browser';

import TemplateOnRuntime from './template-on-runtime.vue';

let instance = new Vue({
	el: '#app',
	render(h){
		return h(TemplateOnRuntime);
	}
})