<script>
import {
	pad,
	language,
} from '../modules/variable.js';
import defaultIcon from '../img/default.jpg';

// default
microApp.capable = true;
microApp.icon = 'https://micro-app.github.io/logo.jpg';

const lang = language;

const title = process.env.EXAMPLE_NAME;

const button = ({
	en : 'EDIT',
	zh : '返回编辑',
})[lang];

const step1 = ({
    en : 'Tap share button <i></i> below.',
    zh : `点击${ pad ? '顶部' : '底部' }的分享按钮 <i></i> ；`,
})[lang];
const step2 = ({
    en : 'Select Add to Home Screen.',
    zh : '添加到主屏幕。',
})[lang];

export default {
	data () {
		let data = {
			step1,
			step2,
			title,
			button,
			style : {},
		};
		let query = this.$route.query;
		if (query.name) {
			data.title = decodeURIComponent(query.name);
		}
		microApp.title = data.title;
		document.title = data.title;
		microApp.statusBarStyle = query.style ? query.style : null;
		let appIconBase64 = this.$root.appIconBase64;
		if (appIconBase64) {
			microApp.icon = appIconBase64;
		} else {
			if (query.icon) {
				let icon = decodeURIComponent(query.icon);
				data.style['background-image'] = `url(${ icon })`;
				microApp.icon = (icon.indexOf('#') == -1) ? icon + '#autosize' : icon;
			} else {
				data.style['background-image'] = `url(${ (microApp.icon = defaultIcon) })`;
			}
		}
		return data;
	},
	methods : {
		edit () {
			this.$router.go({
				path : '/profile',
				query : this.$route.query,
			});
		},
	},
};
</script>

<template>
	<div class="app-page pwa">
		<div class="pwa-profile">
			<div class="pwa-icon" v-bind:style="style"></div>
			<div class="pwa-title" v-bind:title="title"></div>
		</div>
		<div class="pwa-install">
			<div class="pwa-step">{{{* step1 }}}</div>
			<div class="pwa-step">{{* step2 }}</div>
		</div>
		<div class="app-button"
			v-action:active
			v-touch:tap="edit"
		><svg width="200px" height="200px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M995.639 107.069l-78.708-78.708c-18.124-17.865-47.121-17.865-64.987 0l-82.333 82.333 143.694 143.694 82.333-82.074c17.865-18.383 17.865-47.38 0-65.245zM745.275 135.29l-445.321 459.561-36.506 165.7 165.7-36.506 457.231-447.91zM843.402 512v388.362c0 13.204-10.098 26.149-23.82 26.149s-696.462-0.258-696.462-0.258c-14.499 0-25.374-13.981-25.374-25.89s0-693.873 0-693.873c0-12.946 12.169-25.89 27.444-25.89h386.809l82.851-82.851h-519.37c-33.658 0-60.585 26.668-60.585 60.326v790.445c0 33.399 27.185 60.585 60.585 60.585h790.445c33.399 0 60.326-27.185 60.326-60.585v-519.37l-82.851 82.851z" /></svg>{{* button }}</div>
	</div>
</template>

<style lang="scss">
	@import "../sass/_variable.scss";
	.pwa-profile {
		padding: 25px 0;
		overflow: hidden;
		position: relative;
		pointer-events: none;
	}
	.pwa-icon {
		height: 0;
		float: left;
		width: 80% * 0.4;
		overflow: hidden;
		margin-left: 25px;
		margin-right: 15px;
		position: relative;
		border-radius: 15%;
		padding-top: 80% * 0.4;
		box-sizing: content-box;
		// display: none;
		// margin: 0 auto;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		&::after {
		    content: "";
			display: none;
		    position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 15%;
			border: 1px solid transparentize(#9f9f9f, 0.3);
		}
		&[style] {
			&::after {
			    display: block;
			}
		}
	}
	.pwa-title {
		overflow: hidden;
		position: relative;
		padding-top: 80% * 0.4;
		&::before {
		    content: attr(title);
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 28px;
			color: $baseColor;
			padding-right: 15px;
			overflow: hidden;
			white-space: nowrap;
			word-wrap: break-word;
			word-break: break-all;
			text-overflow: ellipsis;
		}
	}
	.pwa-install {
		top: -12px;
		padding: 0 25px;
		position: relative;
		pointer-events: none;
	}
	.pwa-step {
		font-size: 16px;
		font-weight: 300;
		line-height: 28px;
		color: $baseColor;
		&:nth-child(1) {
		    &::before {
		        content: "1.";
		        font-weight: 500;
				margin-right: 5px;
		    }
			i {
				top: 5px;
				display: inline-block;
				width: 12.0px;
				height: 17.3px;
				position: relative;
				vertical-align: top;
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-image: url(../img/action-icon-ios7.png);
			}
		}
		&:nth-child(2) {
		    &::before {
		        content: "2.";
		        font-weight: 500;
				margin-right: 5px;
		    }
		}
	}
	.pwa {
		.app-button {
			box-sizing: content-box;
			padding-left: 12px + 25 + 5;
			background-color: $baseWarn;
			&.is-active {
				background-color: $activeWarn;
			}
			svg {
				fill: currentColor;
				position: absolute;
				left: 12px;
				top: 50%;
				transform: translateY(-50%);
				width: 25px;
				height: 25px;
				margin-top: -1px;
			}
		}
	}
	@media only screen and (min-width: 414px) {
		// ipad
		.pwa-profile {
			padding: 25px + 15 0;
		}
		.pwa-icon {
			margin-left: 25px + 15;
			margin-right: 15px + 15;
		}
		.pwa-title {
			&::before {
				font-size: 28px + 12;
			    padding-right: 15px + 15;
			}
		}
		.pwa-install {
			padding: 0 25px + 15;
		}
		.pwa-step {
			font-size: 16px + 6;
			line-height: 28px + 12;
			&:nth-child(1) {
				i {
					transform: scale(1.5) translateY(2px);
				}
			}
		}
	}
</style>
