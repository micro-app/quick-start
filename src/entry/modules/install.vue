<script>
import { lang } from '../lang/';
import { cliper } from  './cliper.js';

let { button } = lang.install;

let canvas;
let context;
let rotation;

export default {
	props : [
		'app'
	],
	data () {
		return {
			button,
			size : 180,
		}
	},
	ready () {
		canvas = this.$els.canvas;
		context = canvas.getContext('2d');
		cliper.init({
			canvas,
			context,
		});
		this.init();
		this.$on('enter:install', this.init.bind(this));
	},
    methods : {
        tap () {
			microApp.capable = true;
			microApp.href = this.app.href;
			microApp.title = this.app.title;
			microApp.statusBarStyle = this.app.statusBarStyle;
			if (/^data:image/.test(this.app.icon)) {
				microApp.icon = this.app.icon;
			} else {
				microApp.icon = this.app.icon + '#autosize';
			}
            this.$parent.show('finish');
        },
		init () {
			cliper.reset(this.app.img);
		},
		panend ( event ) {
			cliper.deltaX = event.deltaX;
			cliper.deltaY = event.deltaY;
			cliper.save();
			cliper.render();
		},
		panmove ( event ) {
			cliper.deltaX = event.deltaX;
			cliper.deltaY = event.deltaY;
			cliper.render();
		},
		pinchend ( event ) {
			cliper.scale = event.scale;
			cliper.rotation = event.rotation - rotation;
			cliper.render();
		},
		pinchmove ( event ) {
			cliper.scale = event.scale;
			cliper.rotation = event.rotation - rotation;
			cliper.render();
		},
		pinchstart ( event ) {
			rotation = event.rotation;
		},
    },
};
</script>

<template>
	<div class="app-page install">
		<div class="install-box">
			<div class="install-icon">
				<canvas
				v-el:canvas
				width="{{ size }}"
				height="{{ size }}"
				v-touch:panend="panend"
				v-touch:panmove="panmove"
				v-touch:pinchend="pinchend"
				v-touch:pinchmove="pinchmove"
				v-touch:pinchstart="pinchstart"
				></canvas>
			</div>
		</div>
        <div class="app-button"
            v-action:active
            v-touch:tap="tap"
        >{{ button }}</div>
	</div>
</template>

<style lang="scss">
    $baseColor : #3995EE;
    $activeColor : #2485E3;
	.install {
		z-index: 3;
        &:not(.fade-leave) ~ .topbar {
            .topbar-back {
                opacity: 1;
                pointer-events: auto;
            }
        }
	}
	.install-box {
		height: 0;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		max-width: 480px;
		position: relative;
	}
    .install-icon {
        position: absolute;
        width: 80%;
        padding-top: 80%;
        top: 12%;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        border-radius: 15%;
        canvas,
        &::after {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
        &::after {
            content: "";
            z-index: 3;
            pointer-events: none;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url(../img/icon.png);
			overflow: hidden;
	        border-radius: 15%;
	        border: 1px solid #9f9f9f;
			opacity: .7;
        }
    }
</style>
