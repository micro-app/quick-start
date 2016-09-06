<script>
import { lang } from '../lang/';

let {
    title,
    step1,
    step2,
} = lang.finish;

export default {
	data () {
		return {
            title,
            step1,
            step2,
		}
	},
};
</script>

<template>
	<div class="app-page finish">
        <div class="finish-title">{{ title }}</div>
        <div class="finish-detail">{{ step1 }}<i></i></div>
        <div class="finish-detail">{{ step2 }}<i></i></div>
    </div>
</template>

<style lang="scss">
    $baseColor : #3995EE;
    $activeColor : #2485E3;
	.finish {
		z-index: 4;
        &:not(.fade-leave) ~ .topbar {
            .topbar-back {
                opacity: 1;
                pointer-events: auto;
            }
        }
	}
    .finish-title {
        height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28px;
		color: $baseColor;
		margin: 15px 0 10px;
    }
    .finish-detail {
        position: relative;
        font-size: 16px;
        line-height: 32px;
        padding: 0 20px 0 45px;
        margin-bottom: 10px;
        &::before {
            position: absolute;
            top: 5px;
            left: 15px;
            height: 20px;
            line-height: 20px;
            width: 20px;
            text-align: center;
            border-radius: 50%;
            overflow: hidden;
            color: #fff;
            background: #fd2445;
            font-size: 12px;
        }
        i {
            display: inline-block;
            position: relative;
            height: 0;
            width: 0;
            margin-left: 6px;
            vertical-align: top;
        }
        &:nth-child(2) {
            &::before {
                content: "1";
            }
            i::after {
                content: "";
                position: absolute;
                top: 4px;;
                left: 0;
                width: 13px;
                height: 19px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-image: url(../img/action-icon-ios7.png);

            }
        }
        &:nth-child(3) {
            &::before {
                content: "2";
            }
            i::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 30px;
                height: 30px;
                font-size: 0;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-image: url(../img/add-to-home-screen.jpg);
                box-sizing: border-box;
                border-radius: 7px;
                overflow: hidden;
            }
        }
    }
</style>
