<script>
import {
	language,
} from '../modules/user-agent.js';
import microApp from 'micro-app';
import defaultIcon from '../img/default.jpg';

const lang = language;

const title = 'Example';

const button = ({
	en : 'EDIT',
	zh : '返回编辑',
})[lang];

const step1 = ({
    en : 'Tap share button <i></i> below.',
    zh : '点击底部的分享按钮 <i></i> ；',
})[lang];
const step2 = ({
    en : 'Select Add to Home Screen.',
    zh : '添加到主屏幕。',
})[lang];

microApp.capable = true;

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
			data.title = query.name;
		}
		microApp.title = data.title;
		microApp.statusBarStyle = query.style ? query.style : null;
		let appIconBase64 = this.$root.appIconBase64;
		if (appIconBase64) {
			microApp.icon = appIconBase64;
		} else {
			if (query.icon) {
				data.style['background-image'] = `url(${ query.icon })`;
				microApp.icon = (query.icon.indexOf('#') == -1) ? query.icon + '#autosize' : query.icon;
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
		>{{* button }}</div>
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
</style>
