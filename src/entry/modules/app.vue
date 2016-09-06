<script>
import Vue from 'vue';
import {
	mobile,
	standalone,
} from './user-agent.js';
import tips from './tips.vue';
import finish from './finish.vue';
import topbar from './topbar.vue';
import install from './install.vue';
import profile from './profile.vue';
import welcome from './welcome.vue';

Vue.transition('fade', {
	enter () {
		this.$broadcast('enter:' + this.activePage);
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
			mobile,
			app : {
				img,
			},
			standalone,
			activePage : 'welcome',
		}
	},
	methods : {
		show ( page ) {
			history.push(this.activePage);
			this.activePage = page;
		},
		back () {
			this.activePage = history.pop();
		},
	},
};
</script>

<template>
	<div id="app" v-if="!standalone" :class="mobile ? 'device-mobile' : 'device-pc'">
		<component
			keep-alive
			:app.sync="app"
			:is="activePage"
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
	    .app-button {
	        position: absolute;
	        left: 50%;
	        transform: translateX(-50%);
	        background: $baseColor;
	        cursor: pointer;
	        color: #fff;
	        bottom: 90px;
	        padding: 0 12px + 3;
	        height: 42px + 12;
	        line-height: 42px + 12;
	        font-size: 20px + 8;
	        border-radius: 5px + 2;
			@media only screen and (max-width: 414px) {
				& {
					bottom: 40px;
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
