<script>
import { lang } from '../lang/';

let { button } = lang.install;

let canvas;
let context;

export default {
	props : [
		'app'
	],
	data () {
		return {
			button,
			size : 180,
			x : 0,
			y : 0,
			width : 0,
			height : 0,
			scale : 1,
			rotateZ : 0,
			translateX : 0,
			translateY : 0,
		}
	},
	ready () {
		canvas = this.$els.canvas;
		context = canvas.getContext('2d');
		this.init();
		this.$on('enter:install', this.init.bind(this));
	},
    methods : {
        tap () {
            // TODO: clip function
            console.log('tap');
        },
		init () {
			// let img = this.app.img;
			// let size = this.size;
			// this.x = 0;
			// this.y = 0;
			// this.width = img.width;
			// this.height = img.height;
			// this.rotateZ = 0;
			// this.translateX = 0;
			// this.translateY = 0;
			// if (img.width > img.height) {
			// 	this.x = (img.height - img.width) / 2;
			// 	this.scale = size / img.height;
			// } else {
			// 	this.y = (img.width - img.height) / 2;
			// 	this.scale = size / img.width;
			// }
			// this.render();
		},
		render ( delta = {} ) {
			let { scale = 0, rotateZ = 0, translateX = 0, translateY = 0 } = delta;
			let initScale = parseFloat((this.scale + scale).toFixed(3));
			let resetScale = parseFloat((1/initScale).toFixed(3));
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.rotate(0);
			context.scale(initScale, initScale);
			context.translate(this.translateX + translateX, this.translateY + translateY);
			context.drawImage(this.app.img, this.x, this.y, this.width, this.height);
			context.translate(this.translateX + translateX, this.translateY + translateY);
			context.scale(resetScale, resetScale);
			context.rotate(0);
		},
		panend ( event ) {
			// this.render({
			// 	translateX : event.deltaX,
			// 	translateY : event.deltaY,
			// });
			// this.translateX += event.deltaX;
			// this.translateY += event.deltaY;
		},
		panmove ( event ) {
			// this.render({
			// 	translateX : event.deltaX,
			// 	translateY : event.deltaY,
			// });
		},
		pinch () {
			console.log('pinch', arguments);
		},
		rotate () {
			console.log('rotate', arguments);
		},
    },
};
</script>

<template>
	<div class="app-page install">
        <div class="install-icon">
            <canvas
				v-el:canvas
				width="{{ size }}"
				height="{{ size }}"
				v-touch:panend="panend"
				v-touch:panmove="panmove"
				v-touch:pinch="pinch"
				v-touch:rotate="rotate"
			></canvas>
        </div>
        <div class="install-button"
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
    .install-button {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background: $baseColor;
		cursor: pointer;
		color: #fff;
		bottom: 40px;
		padding: 0 12px;
		height: 42px;
		line-height: 42px;
		font-size: 20px;
		border-radius: 5px;
		&.is-active {
			background: $activeColor;
		}
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
