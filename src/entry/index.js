// base
import './sass/index.scss';

// variable
import {
    mobile,
    safari,
    language,
} from './modules/variable.js';
const standalone = !!navigator.standalone;

// vue
import Vue from 'vue';
import VueTouch from 'vue-touch';
import VueRouter from 'vue-router';
import VueHref from './modules/vue-href.js';
import VueAction from './modules/vue-action.js';

// components
import app from './components/app.vue';
import pwa from './components/pwa.vue';
import tips from './components/tips.vue';
import profile from './components/profile.vue';
import welcome from './components/welcome.vue';

if (!standalone) {

    // register vue plugin
    Vue.use(VueHref);
    Vue.use(VueTouch);
    Vue.use(VueRouter);
    Vue.use(VueAction);

    // config router
    let router = new VueRouter();

    router.map({
        '/' : {
            component : welcome,
        },
    });

    if (mobile) {
        if (safari) {
            router.map({
                '/pwa' : {
                    component : pwa,
                },
                '/profile' : {
                    component : profile,
                },
            }).redirect({
                '*': '/',
            });
        } else {
            router.map({
                '/pwa' : {
                    component : tips,
                },
                '/profile' : {
                    component : tips,
                },
            }).redirect({
                '*': '/',
            });
        }
    } else {
        router.map({
            '/pwa' : {
                component : welcome,
            },
            '/profile' : {
                component : welcome,
            },
        }).redirect({
            '*': '/',
        });
    }

    router.start(app, 'app');

    if (process.env.NODE_ENV !== 'production') {
        window.router = router;
    }

    // analysis
    if (process.env.NODE_ENV === 'production') {
        if (!navigator.standalone) {
            // 百度统计
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "//hm.baidu.com/hm.js?ea1b1681d8deacd6535761799af75879";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();
            // Google统计
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-81465644-2', 'auto');
            ga('send', 'pageview');
        }
    }

}
