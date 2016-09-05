<script>
import Vue from 'vue';
import {
	mobile,
	standalone,
} from './user-agent.js';
import tips from './tips.vue';
import topbar from './topbar.vue';
import install from './install.vue';
import profile from './profile.vue';
import welcome from './welcome.vue';

Vue.transition('fade', {
	enter () {
		this.$broadcast('enter:' + this.activePage);
	},
});

export default {
	components : {
		tips,
		topbar,
		install,
		profile,
		welcome,
	},
	data () {
		return {
			mobile,
			app : {
				img : new Image,
			},
			standalone,
			prevPage : 'welcome',
			activePage : 'welcome',
		}
	},
	methods : {
		show ( page ) {
			this.prevPage = this.activePage;
			this.activePage = page;
		},
		back () {
			this.show(this.prevPage);
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
	}
</style>
