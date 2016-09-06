import './sass/index.scss';

import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueHref from './modules/vue-href.js';
import VueAction from './modules/vue-action.js';

import app from './modules/app.vue';
import { standalone } from './modules/user-agent.js';

if (!standalone) {
    location.hash = '';
}

// document.addEventListener('touchmove', function ( event ) {
//     event.preventDefault();
// }, false);

Vue.use(VueHref);
Vue.use(VueTouch);
Vue.use(VueAction);

new Vue({
    el : 'body',
    components : {
        app,
    },
});
