<script>
import {
	language,
} from '../modules/variable.js';

const lang = language;

const back = ({
	en : 'Back',
	zh : '返回',
})[lang];

const github = 'https://github.com/micro-app/micro-app';
const twitter = 'https://twitter.com/qq393464140';

export default {
	data () {
		return {
			back,
            github,
            twitter,
		};
	},
	methods : {
		tap () {
			history.back();
		},
	},
};
</script>

<template>
    <div class="topbar">
		<div  class="topbar-back" v-touch:tap="tap"><i></i>{{* back }}</div>
        <div class="topbar-github" v-href="github"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" width="30" height="30" viewBox="0 0 16 17"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>GitHub</div>
        <div class="topbar-twitter" v-href="twitter"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" width="30" height="24" viewBox="0 0 300.00006 244.18703"><g transform="translate(-539.17946,-568.85777)"><path style="fill-rule:nonzero;stroke:none" d="m 633.89823,812.04479 c 112.46038,0 173.95627,-93.16765 173.95627,-173.95625 0,-2.64628 -0.0539,-5.28062 -0.1726,-7.90305 11.93799,-8.63016 22.31446,-19.39999 30.49762,-31.65984 -10.95459,4.86937 -22.74358,8.14741 -35.11071,9.62551 12.62341,-7.56929 22.31446,-19.54304 26.88583,-33.81739 -11.81284,7.00307 -24.89517,12.09297 -38.82383,14.84055 -11.15723,-11.88436 -27.04079,-19.31655 -44.62892,-19.31655 -33.76374,0 -61.14426,27.38052 -61.14426,61.13233 0,4.79784 0.5364,9.46458 1.58538,13.94057 -50.81546,-2.55686 -95.87353,-26.88582 -126.02546,-63.87991 -5.25082,9.03545 -8.27852,19.53111 -8.27852,30.73006 0,21.21186 10.79366,39.93837 27.20766,50.89296 -10.03077,-0.30992 -19.45363,-3.06348 -27.69044,-7.64676 -0.009,0.25652 -0.009,0.50661 -0.009,0.78077 0,29.60957 21.07478,54.3319 49.0513,59.93435 -5.13757,1.40062 -10.54335,2.15158 -16.12196,2.15158 -3.93364,0 -7.76596,-0.38716 -11.49099,-1.1026 7.78383,24.2932 30.35457,41.97073 57.11525,42.46543 -20.92578,16.40207 -47.28712,26.17062 -75.93712,26.17062 -4.92898,0 -9.79834,-0.28036 -14.58427,-0.84634 27.05868,17.34379 59.18936,27.46396 93.72193,27.46396"></path></g></svg>Twitter</div>
    </div>
</template>

<style lang="scss">
    @import "../sass/_variable.scss";
	.app-page {
		padding-top: 50px;
	}
    .topbar {
        height: 50px;
        background: $baseColor;
        overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 9;
		i {
			position: absolute;
			top: 50%;
			transform: translateY(-50%) rotate(-45deg);
			left: 10px;
			width: 0;
			height: 0;
			&::before,
			&::after {
			    content: "";
			    background: #fff;
				position: absolute;
				top: 0;
				left: 0;
			}
			&::before {
			    width: 1px;
				height: 10px;
			}
			&::after {
			    width: 10px;
				height: 1px;
			}
		}
    }
	.topbar-back {
		float: left;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		padding: 0 10px 0 22px;
		color: #fff;
		cursor: pointer;
		position: relative;
		display: none;
		// opacity: 0;
		// pointer-events: none;
		&::after {
		    content: "";
		    position: absolute;
		}
	}
	.topbar-github,
	.topbar-twitter {
		float: right;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		padding-left: 30px;
		margin-right: 30px;
		position: relative;
		color: #fff;
		cursor: pointer;
		svg {
			fill: currentColor;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 25px;
			height: 25px;
		}
	}
    @media only screen and (max-width: 414px) {
		.app-page {
			padding-top: 36px;
		}
        .topbar,
		.topbar-back,
		.topbar-github,
		.topbar-twitter {
            height: 36px;
        }
		.topbar-back {
			line-height: 36px;
		}
		.topbar-github,
		.topbar-twitter {
			font-size: 0;
			margin-right: 16px;
		}
    }
</style>
