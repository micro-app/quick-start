<script>
import {
	language,
} from '../modules/user-agent.js';
import clipper from  '../modules/clipper.js';

const lang = language;

const title = ({
	en : 'Web App Profile',
	zh : '创建您的轻应用',
})[lang];
const backButton = ({
	en : 'BACK',
	zh : '上一步',
})[lang];
const nextButton = ({
	en : 'NEXT',
	zh : '下一步',
})[lang];
const appNameLabel = ({
	en : 'AppName',
	zh : '应用名称',
})[lang];
const appLinkLabel = ({
	en : 'AppLink',
	zh : '应用地址',
})[lang];
const appIconLabel = ({
	en : 'AppIcon',
	zh : '应用图标',
})[lang];
const appStatusBarStyleLabel = ({
	en : 'AppStatusBarStyle',
	zh : '状态栏样式',
})[lang];
const appNamePlaceholder = 'Example';
const appLinkPlaceholder = 'http://example.com';
const appIconPlaceholder = 'http://example.com/pic.jpg';
const webIcon = ({
	en : 'Web',
	zh : '网络图标',
})[lang];
const localIcon = ({
	en : 'Local',
	zh : '本地图标',
})[lang];
const selectIcon = ({
	en : 'Please select icon',
	zh : '请选择图标',
})[lang];
const selectStyle = ({
	en : 'Please select style',
	zh : '请选择样式',
})[lang];
const tips = ({
	en : 'Icon request fail, please select another.',
	zh : '图标请求失败，请重新输入',
})[lang];

// const defaultBase64Value = '[object Base64]';

let tipsTimeout = 0;
let appIconBase64;
let appIconFilePath;

export default {
	data () {
		let data = {
			backButton,
			nextButton,
			title,
			appNameLabel,
			appLinkLabel,
			appIconLabel,
			appStatusBarStyleLabel,
			appNamePlaceholder,
			appLinkPlaceholder,
			appIconPlaceholder,
			webIcon,
			localIcon,
			selectIcon,
			selectStyle,
			tips,
			tipsSwitch : false,
			appName : '',
			appLink : '',
			appStatusBarStyle : '',
			appStatusBarStyleType : ['', 'white', 'black', 'black-translucent'],
			appIcon : '',
			appIconType : 'web',
			appIconFilePath : '',
			clipping : false,
		};
		let query = this.$route.query;
		if (query.name) {
			data.appName = query.name
		}
		if (query.link) {
			data.appLink = query.link
		}
		if (query.icon) {
			data.appIcon = query.icon;
		}
		if (this.$root.appIconBase64 && appIconFilePath) {
			data.appIconType = 'local';
			data.appIconFilePath = appIconFilePath;
		}
		return data;
	},
	ready () {
		this.$root.clipping = false;
		setTimeout(() => {
			let query = this.$route.query;
			if (query.style) {
				this.appStatusBarStyle = query.style;
			}
		}, 0);
	},
	methods : {
		go ( base64, icon ) {
			let query = {};
			if (this.appName) {
				query.name = this.appName;
			}
			if (this.appLink) {
				query.link = this.appLink;
			}
			if (this.appStatusBarStyle) {
				query.style = this.appStatusBarStyle;
			}
			if (icon) {
				query.icon = icon;
			}
			if (base64) {
				appIconFilePath = this.appIconFilePath;
				this.$root.appIconBase64 = clipper.canvas.toDataURL();
			} else {
				appIconFilePath = null;
				this.$root.appIconBase64 = null;
			}
			this.$router.go({
				path : '/pwa',
				query,
			});
		},
		back () {
			this.clipping = this.$root.clipping = false;
		},
		next () {
			if (this.clipping) {
				// this.$root.clipping = false;
				this.go(true);
			} else {
				if (this.appIconType == 'web') {
					if (this.appIcon) {
						let img = new Image;
						img.onerror = () => {
							this.showTips();
						};
						img.onload = () => {
							this.go(false, img.src);
						};
						img.src = this.appIcon;
					} else {
						this.go();
					}
				} else {
					if (this.appIconFilePath == appIconFilePath) {
						this.clipIcon();
					} else {
						let file = this.$els.file.files[0];
						if (file) {
							let reader = new FileReader;
							reader.onerror = () => {
								this.showTips();
							};
							reader.onload = () => {
								appIconBase64 = reader.result;
								this.clipIcon();
							};
							reader.readAsDataURL(file);
						} else {
							this.go();
						}
					}
				}
			}
		},
		focus ( event ) {
		    let target = event.target;
		    if (target.tagName == 'SELECT' || target.tagName == 'INPUT') {
		        return;
		    }
			event.preventDefault();
			let input = event.srcEvent.currentTarget.querySelector('input');
			input && input.focus();
		},
		change ( event ) {
			let target = event.target;
			this.appIconFilePath = target.value;
		},
		showTips () {
			clearTimeout(tipsTimeout);
			this.tipsSwitch = true;
			tipsTimeout = setTimeout(() => {
				this.tipsSwitch = false;
			}, 2500);
		},
		clipIcon () {
			if (clipper.img && clipper.img.src == appIconBase64) {
				this.clipping = this.$root.clipping = true;
			} else {
				let img = new Image;
				img.onerror = () => {
					this.showTips();
				};
				img.onload = () => {
					clipper.reset(img);
					this.clipping = this.$root.clipping = true;
				};
				img.src = appIconBase64;
			}
		},
	},
};
</script>

<template>
	<div class="app-page profile">
		<div class="profile-title">{{* title }}</div>
		<div v-show="!clipping" transition="fade">
			<div class="profile-detail" v-touch:tap="focus($event)">
				<div class="profile-label">{{* appNameLabel }}</div>
				<div class="profile-main">
					<input type="text" placeholder="{{* appNamePlaceholder }}" v-model="appName">
				</div>
			</div>
			<div class="profile-detail" v-touch:tap="focus($event)">
				<div class="profile-label">{{* appLinkLabel }}</div>
				<div class="profile-main">
					<input type="text" placeholder="{{* appLinkPlaceholder }}" v-model="appLink">
				</div>
			</div>
			<div class="profile-detail">
				<div class="profile-label">{{* appStatusBarStyleLabel }}</div>
				{{ appStatusBarStyle }}
				<span class="profile-placeholder" v-if="!appStatusBarStyle">{{* selectStyle }}</span>
				<select v-model="appStatusBarStyle">
					<option value="{{* style }}"
						v-for="style in appStatusBarStyleType"
						v-bind:selected="!$index"
					>{{* $index ? style : '-' }}</option>
				</select>
			</div>
			<div class="profile-detail">
				<div class="profile-tab">
					<input type="radio" name="appIconType" v-model="appIconType" value="web">
					<div class="text">{{* webIcon }}</div>
				</div>
				<div class="profile-tab">
					<input type="radio" name="appIconType" v-model="appIconType" value="local">
					<div class="text">{{* localIcon }}</div>
				</div>
			</div>
			<div class="profile-detail" v-touch:tap="(appIconType == 'web') && focus($event)">
				<div class="profile-label">{{* appIconLabel }}</div>
				<div class="profile-main" v-show="appIconType == 'web'">
					<input type="text" placeholder="{{* appIconPlaceholder }}" v-model="appIcon">
				</div>
				<div class="profile-main overflow-visible" v-show="appIconType == 'local'">
					<div class="overflow-ellipsis">
						{{ appIconFilePath }}
						<span class="profile-placeholder" v-if="!appIconFilePath">{{* selectIcon }}</span>
					</div>
					<input type="file" v-el:file v-on:change="change">
				</div>
			</div>
			<div class="profile-tips" transition="fade" v-show="tipsSwitch">{{* tips }}</div>
		</div>
		<div v-action:active
			v-show="clipping"
			v-touch:tap="back"
			v-bind:class="{ 'app-button' : true, 'is-left' : clipping }"
		>{{* backButton }}</div>
		<div v-action:active
			v-touch:tap="next"
			v-bind:class="{ 'app-button' : true, 'is-right' : clipping }"
		>{{* nextButton }}</div>
	</div>
</template>

<style lang="scss">
	@import "../sass/_variable.scss";
	.profile-title {
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28px;
		color: $baseColor;
		margin-top: 15px;
	}
	.profile-detail {
		height: 45px;
		line-height: 45px;
		padding: 0 20px 0 20px;
		overflow: hidden;
		position: relative;
		font-size: 16px;
		&::after {
			content: "";
			position: absolute;
			left: 10px;
			bottom: 0;
			width: 100%;
			height: 1px;
			transform: scaleY(.5);
			background: #9f9f9f;
		}
	}
	.profile-label {
		float: left;
		color: #666;
		padding-right: 5px;
		margin-right: 5px;
		font-size: 14px;
		position: relative;
		.lang-en & {
			min-width: 70px;
		}
		&::after {
			content: "";
			position: absolute;
			// right: 5px;
			right: 0;
			width: 1px;
			height: 40%;
			top: 50%;
			transform: translateY(-50%) scaleX(.5);
			background: #9f9f9f;
		}
	}
	.profile-main {
		height: 100%;
		overflow: hidden;
		position: relative;
		&::after {
			content: "";
			clear: both;
			display: table;
		}
		&.overflow-visible {
		    overflow: visible;
		}
	}
	.profile-tab {
		width: 50%;
		float: left;
		position: relative;
		&::after {
			content: "";
			position: absolute;
			right: 0;
			width: 1px;
			height: 40%;
			top: 50%;
			transform: translateY(-50%) scaleX(.5);
			background: #9f9f9f;
		}
		&:last-child {
			&::after {
				display: none;
			}
		}
		.text {
			text-align: center;
		}
	}
	.profile-placeholder {
		color: #a5a5a5;
		font-size: 14px;
	}
	.profile-detail {
		input {
			margin: 0;
			padding: 0;
			border: 0;
			outline: 0;
			background: none;
			&[type="text"] {
				width: 100%;
				line-height: 20px;
			}
			&[type="radio"] {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				&:checked + .text {
					color: $baseColor;
				}
			}
			&[type="file"] {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
		select {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			// float: left;
			margin: 0;
			padding: 0;
			border: 0;
			outline: 0;
			// background: none;
			// text-align: center;
			// // width: 50px;
			// margin-right: 3px;
		}
	}
	.profile-tips {
		text-align: center;
		height: 45px;
		line-height: 45px;
		font-size: 16px;
		color: #e96900;
	}
	.overflow-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
	}
	.app-button {
		&.is-left {
			margin-left: -65px;
		}
		&.is-right {
			margin-left: 65px;
		}
	}
</style>
