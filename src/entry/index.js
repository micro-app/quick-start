import './sass/index.scss';

import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueHref from './modules/vue-href.js';
import VueAction from './modules/vue-action.js';

import app from './modules/app.vue';
import icon from './img/apple-touch-icon.png';

// import { standalone } from './modules/user-agent.js';

// if (!standalone) {
// }
location.hash = '';

microApp.icon = icon;

Vue.use(VueHref);
Vue.use(VueTouch);
Vue.use(VueAction);

new Vue({
    el : 'body',
    components : {
        app,
    },
});
