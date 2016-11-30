<script>
import {
	mobile,
	language,
} from '../modules/variable.js';

const lang = language;

const desc = ({
     en : 'Create your Web App any time.',
     zh : '一款轻应用构建工具',
})[lang];
const button = ({
     en : 'START',
     zh : '立刻体验',
})[lang];
const tips = ({
	en : 'Please use Safari browser.',
	zh : '请用 Safari 浏览器体验',
})[lang];

let tipsTimeout = 0;

export default {
	data () {
		return {
            desc,
            tips,
            button,
			mobile,
			tipsSwitch : false,
		};
	},
	ready () {
		this.$root.clipping = false;
	},
	methods : {
        tap () {
			this.$router.go({
				path : '/profile',
			});
		},
		click () {
			this.showTips();
		},
		showTips () {
			clearTimeout(tipsTimeout);
			this.tipsSwitch = true;
			tipsTimeout = setTimeout(() => {
				this.tipsSwitch = false;
			}, 2500);
		},
	},
};
</script>

<template>
	<div class="app-page welcome">
        <div class="welcome-slogon">
            <h1 class="welcome-logo"> Micro App </h1>
            <div class="welcome-title">micro-app</div>
            <div class="welcome-desc">{{* desc }}</div>
        </div>
		<div class="welcome-tips" transition="fade" v-show="tipsSwitch">{{* tips }}</div>
		<div class="app-button"
		 	v-if="mobile"
            v-action:active
			v-touch:tap="tap"
		>{{* button }}</div>
		<div class="app-button"
			v-if="!mobile"
		 	v-on:click="click"
		>{{* button }}</div>
	</div>
</template>

<style lang="scss">
    @import "../sass/_variable.scss";
    .welcome-slogon {
        width: 100%;
        min-width: 414px;
        height: 100%;
        max-height: 568px;
        overflow: hidden;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        pointer-events: none;
    }
    .welcome-logo {
        margin: 55px auto 0;
        // border-radius: 15%;
        // color: $baseColor;
        // border: 1px solid currentColor;
        width: 120px + 24;
        height: 120px + 24;
		font-size: 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url(../img/logo.jpg);
        // line-height: 120px + 24;
        // font-size: 80px + 12;
    }
    .welcome-title {
        color: #fff;
        letter-spacing: 1px;
        text-shadow: 0 0 3px $baseColor;
        text-transform: uppercase;
        height: 44px + 20;
        line-height: 44px + 20;
        font-size: 36px + 20;
        margin-top: 50px;
		font-weight: 700;
    }
    .welcome-desc {
        height: 30px + 20;
        line-height: 30px + 20;
        font-size: 16px + 10;
    }
    .welcome-tips {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 18px;
        color: #e96900;
        height: 45px;
        line-height: 45px;
        // bottom: 40px;
        bottom: 80px + 54 + 15;
		pointer-events: none;
    }
    @media only screen and (max-width: 414px) {
        .welcome-logo {
            width: 120px;
            height: 120px;
            // line-height: 120px;
            // font-size: 80px;
            margin-top: 30px + 8;
        }
        .welcome-title {
            height: 44px;
            line-height: 44px;
            font-size: 36px;
            margin-top: 25px;
        }
        .welcome-desc {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
        }
        .welcome-tips {
            height: 25px;
            line-height: 25px;
            // bottom: 10px;
            bottom: 30px - 2 + 42 + 15;
        }
    }
    @media only screen and (max-width: 320px) {
        .welcome-logo {
            margin-top: 30px;
        }
        .welcome-title {
            margin-top: 25px;
        }
    }
</style>
