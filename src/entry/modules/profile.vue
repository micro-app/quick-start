<script>
import { lang } from '../lang/';
import defaultIcon from '../img/default.jpg';
// import defaultIcon from '../img/safari.png';

export default {
	props : [
		'app'
	],
	data () {
		let profile = JSON.parse(JSON.stringify(lang.profile));
		// profile.appName = profile.appLinkProtocol = profile.appLinkAddress = profile.appIconType = profile.appIconProtocol = profile.appIconAddress = profile.appIconFilePath = profile.appIconBase64 = '';
		profile.appName = profile.appLink = profile.appStatusBarStyle = profile.appIcon = profile.appIconType = profile.appIconFilePath = profile.appIconBase64 = '';
		profile.statusBarStyleType = ['', 'white', 'black', 'black-translucent'];
		profile.error = false;
		return profile;
	},
	ready () {
		this.app.img.onload = () => {
			this.error = false;
			this.$parent.show('install');
		};
		this.app.img.onerror = () => {
			this.error = true;
			setTimeout(() => {
				this.error = false;
			}, 2500);
		};
	},
	methods : {
		tap () {
			// // app.href = this.appLinkAddress ? this.appLinkProtocol + this.appLinkAddress : null;
			// app.icon = this.appIconAddress ? this.appIconProtocol + this.appIconAddress : defaultIcon;
			let app = this.app;
			app.href = this.appLink ? this.appLink : null;
			app.title = this.appName ? this.appName : null;
			app.statusBarStyle = this.statusBarStyle ? this.statusBarStyle : null;
            if (this.appIconType == 'web') {
				app.icon = this.appIcon ? this.appIcon : defaultIcon;
            }
            if (this.appIconType == 'local') {
                app.icon = this.appIconFilePath ? this.appIconBase64 : defaultIcon;
            }
			if (app.img.src === app.icon) {
				this.$parent.show('install');
			} else {
				app.img.src = app.icon;
			}
		},
		focus ( event, id ) {
		    let target = event.target;
		    if (target.tagName == 'SELECT' || target.tagName == 'INPUT') {
		        return;
		    }
			this.$els[id.toLowerCase()].focus();
			event.preventDefault();
		},
		getFile ( event ) {
			let self = this;
			let file = event.target.files[0];
			if (file) {
				let reader = new FileReader();
				reader.onload = function () {
					self.appIconBase64 = this.result;
				};
				reader.readAsDataURL(file);
			}
		},
	},
};

// <select v-model="appLinkProtocol">
// 	<option value="http://" selected>http://</option>
// 	<option value="https://">https://</option>
// </select>
// <select v-model="appIconProtocol">
// 	<option value="http://" selected>http://</option>
// 	<option value="https://">https://</option>
// </select>
</script>

<template>
	<div class="app-page profile">
		<div class="profile-title">{{ title }}</div>
		<div class="profile-detail" v-touch:tap="focus($event, 'appName')">
			<div class="profile-label">{{ appNameLabel }}</div>
			<div class="profile-main">
				<input type="text" placeholder="{{ appNamePlaceholder }}" v-el:appName v-model="appName">
			</div>
		</div>
		<div class="profile-detail" v-touch:tap="focus($event, 'appLink')">
			<div class="profile-label">{{ appLinkLabel }}</div>
			<div class="profile-main">
				<input type="text" placeholder="{{ appLinkPlaceholder }}" v-el:appLink v-model="appLink">
			</div>
		</div>
		<div class="profile-detail">
			<div class="profile-label">{{ appStatusBarStyleLabel }}</div>
			{{ appStatusBarStyle }}
			<span class="profile-placeholder" v-if="!appStatusBarStyle">{{ selectStyle }}</span>
			<select v-model="appStatusBarStyle">
				<option value="{{ style }}" v-for="style in statusBarStyleType" :selected="!$index">{{ $index ? style : '-' }}</option>
			</select>
		</div>
		<div class="profile-detail">
			<div class="profile-tab">
				<input type="radio" name="appIconType" v-model="appIconType" value="web" checked>
				<div class="text">{{ WebIcon }}</div>
			</div>
			<div class="profile-tab">
				<input type="radio" name="appIconType" v-model="appIconType" value="local">
				<div class="text">{{ LocalIcon }}</div>
			</div>
		</div>
		<div class="profile-detail" v-show="appIconType == 'web'" v-touch:tap="focus($event, 'appIcon')">
			<div class="profile-label">{{ appIconLabel }}</div>
			<div class="profile-main">
				<input type="text" placeholder="{{ appIconPlaceholder }}" v-el:appIcon v-model="appIcon">
			</div>
		</div>
		<div class="profile-detail" v-show="appIconType == 'local'">
			<div class="profile-label">{{ appIconLabel }}</div>
			{{ appIconFilePath }}
			<span class="profile-placeholder" v-if="!appIconFilePath">{{ selectIcon }}</span>
			<input type="file" v-model="appIconFilePath" v-on:change="getFile($event)">
		</div>
		<div class="profile-tips" v-show="error" transition="fade">{{ tips }}</div>
		<div class="app-button"
			v-action:active
			v-touch:tap="tap"
		>{{ button }}</div>
	</div>
</template>

<style lang="scss">
	$baseColor : #3995EE;
	$activeColor : #2485E3;
    .profile {
		z-index: 2;
    }
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
		text-overflow: ellipsis;
		word-break: break-all;
		word-wrap: break-word;
		white-space: nowrap;
		overflow: hidden;
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
		&.fade-transition {
			transition: opacity 300ms linear;
		}
		&.fade-enter,
		&.fade-leave {
			opacity: 0;
		}
	}
</style>
