<script>
import {
	mobile,
	language,
} from '../modules/user-agent.js';
import topbar from './topbar.vue';
import clipper from './clipper.vue';

const lang = language;

const landscapeTips = ({
	en : 'Please rotate your device to portrait mode.',
	zh : '请在竖屏下操作',
})[lang];

export default {
	components : {
		topbar,
		clipper,
	},
	data () {
		return {
			clipping : false,
		};
	},
	ready () {
		this.$el.classList.add(`lang-${ lang }`);
		this.$el.classList.add(`device-${ mobile ? 'mobile' : 'pc' }`);
		this.$el.setAttribute('tips', landscapeTips);
	},
};
</script>

<template>
	<div id="app">
		<router-view transition="fade"></router-view>
		<clipper :clipping.sync="clipping"></clipper>
		<topbar></topbar>
	</div>
</template>

<style lang="scss">
	@import "../sass/_variable.scss";
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
            // font-weight: 400;
			-webkit-touch-callout: none;
		}
		*:not(input) {
			&,
	        &::before,
	        &::after {
	            user-select: none;
			}
		}
		&.device-pc {
			min-height: 600px;
			@media only screen and (max-width: 414px) {
	            min-height: 480px;
	        }
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
	}
	#app {
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
				bottom: 30px - 2;
				padding: 0 12px;
				height: 42px;
				line-height: 42px;
				font-size: 20px;
				border-radius: 5px;
			}
		}
	}
	#app {
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
	.fade-transition {
		transition: opacity 250ms linear;
		&.fade-enter,
		&.fade-leave {
			opacity: 0;
		}
	}
</style>
