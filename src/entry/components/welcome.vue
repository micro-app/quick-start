<script>
import { lang } from '../modules/lang.js';
import {
    mobile,
    safari,
} from '../modules/user-agent.js';

const welcome_desc = {
     en : 'Create your Web App any time.',
     zh : '一款轻应用构建工具',
};
const welcome_button = {
     en : 'START',
     zh : '立刻体验',
};
const welcome_tips = {
     en : 'Support Safari Only',
     zh : '仅支持Safari',
};

let tipsTimeout = 0;

export default {
	data () {
		return {
            mobile,
            showTips : false,
            desc : welcome_desc[lang],
            tips : welcome_tips[lang],
            button : welcome_button[lang],
		}
	},
	methods : {
        tap () {
            if (safari) {
                this.$parent.show('profile');
            } else {
                this.$parent.show('tips');
            }
		},
        click () {
            clearTimeout(tipsTimeout);
			this.showTips = true;
            tipsTimeout = setTimeout(() => {
                this.showTips = false;
            }, 2500);
		},
	},
};
</script>

<template>
	<div class="app-page welcome">
        <div class="welcome-slogon">
            <div class="welcome-logo">L</div>
            <div class="welcome-title">micro-app</div>
            <div class="welcome-desc">{{ desc }}</div>
        </div>
        <div class="welcome-tips" v-if="!mobile" v-show="showTips" transition="fade">{{ tips }}</div>
		<div class="app-button"
		 	v-if="mobile"
            v-action:active
			v-touch:tap="tap"
		>{{ button }}</div>
		<div class="app-button"
			v-if="!mobile"
		 	v-on:click="click"
		>{{ button }}</div>
	</div>
</template>

<style lang="scss">
    $baseColor : #3995EE;
    $activeColor : #2485E3;
    .welcome {
        z-index: 1;
    }
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
        border-radius: 15%;
        color: $baseColor;
        border: 1px solid currentColor;
        width: 120px + 24;
        height: 120px + 24;
        line-height: 120px + 24;
        font-size: 80px + 12;
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
        font-size: 16px;
        color: #e96900;
        height: 45px;
        line-height: 45px;
        bottom: 40px;
        &.fade-transition {
            transition: opacity 300ms linear;
        }
        &.fade-enter,
        &.fade-leave {
            opacity: 0;
        }
    }
    @media only screen and (max-width: 414px) {
        .welcome-logo {
            width: 120px;
            height: 120px;
            line-height: 120px;
            font-size: 80px;
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
            bottom: 10px;
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
