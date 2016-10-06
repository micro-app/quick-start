<script>
import Vue from 'vue';
import {
	mobile,
	standalone,
} from '../modules/user-agent.js';
import { lang } from '../modules/lang.js';
import tips from './tips.vue';
import finish from './finish.vue';
import topbar from './topbar.vue';
import install from './install.vue';
import profile from './profile.vue';
import welcome from './welcome.vue';

const app_className = {
	en : 'en',
	zh : 'zh',
};
const app_landscapeTips = {
	en : 'Please rotate your device to portrait mode.',
	zh : '请在竖屏下操作',
};

Vue.transition('fade', {
	enter () {
		this.$broadcast('enter:' + this.currentPage);
	},
});

let history = [];

export default {
	components : {
		tips,
		finish,
		topbar,
		install,
		profile,
		welcome,
	},
	data () {
		let img = new Image;
		return {
			standalone,
			currentPage : 'welcome',
			landscapeTips : app_landscapeTips[lang],
		}
	},
	methods : {
		show ( page ) {
			history.push(this.currentPage);
			this.currentPage = page;
		},
		back () {
			this.currentPage = history.pop();
		},
	},
	computed : {
		className () {
			return `lang-${ app_className[lang] } ${ mobile ? 'device-mobile' : 'device-pc' }`;
		},
	},
};
</script>

<template>
	<div id="app" v-if="!standalone" :class="className" :tips="landscapeTips">
		<component
			keep-alive
			:is="currentPage"
			transition="fade"
		></component>
		<topbar></topbar>
	</div>
</template>

<style lang="scss">
	$baseColor : #3995EE;
	$activeColor : #2485E3;
	html,
	body,
	#app {
        height: 100%;
		background: #fdfdfd;
	}
	#app {
		position: relative;
        overflow: hidden;
		*,
        *::before,
        *::after {
            font-weight: 400;
			-webkit-touch-callout: none;
		}
		*:not(input) {
			&,
	        &::before,
	        &::after {
	            user-select: none;
			}
		}
		.app-page {
			top: 0;
	        left: 0;
	        width: 100%;
	        height: 100%;
	        overflow: hidden;
	        position: absolute;
			background: #fdfdfd;
			&.fade-transition {
				transition: opacity 400ms linear;
			}
			&.fade-enter,
			&.fade-leave {
				opacity: 0;
			}
		}
		&.device-pc {
			min-height: 600px;
			@media only screen and (max-width: 414px) {
	            min-height: 480px;
	        }
		}
		&.device-mobile {
			@media only screen and (max-height: 414px) and (orientation : landscape) {
				.app-page {
					display: none;
				}
				&::after {
					left: 0;
					top: 50%;
					width: 100%;
					font-size: 18px;
					color: $baseColor;
					position: absolute;
					text-align: center;
					content: attr(tips);
					transform: translateY(-50%);
				}
	        }
		}
	    .app-button {
	        position: absolute;
	        left: 50%;
	        transform: translateX(-50%);
	        background: $baseColor;
	        cursor: pointer;
	        color: #fff;
	        bottom: 80px;
	        padding: 0 12px + 3;
	        height: 42px + 12;
	        line-height: 42px + 12;
	        font-size: 20px + 8;
	        border-radius: 5px + 2;
			@media only screen and (max-width: 414px) {
				& {
					bottom: 30px + 3;
					padding: 0 12px;
					height: 42px;
					line-height: 42px;
					font-size: 20px;
					border-radius: 5px;
				}
			}
	    }
		&.device-mobile {
			.app-button.is-active {
				background: $activeColor;
			}
		}
		&.device-pc {
			.app-button:hover {
				background: $activeColor;
			}
		}
	}
</style>
