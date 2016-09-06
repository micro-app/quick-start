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
			delta : {
				scale : 1,
				rotate : 0,
				translateX : 0,
				translateY : 0,
			},
			origin : {
				scale : 1,
				rotate : 0,
				translateX : 0,
				translateY : 0,
			},
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
            this.$parent.show('finish');
        },
		init () {
			let img = this.app.img;
			let size = this.size;
			this.x = 0;
			this.y = 0;
			this.width = img.width;
			this.height = img.height;
			let delta = this.delta;
			let origin = this.origin;
			delta.scale = 1;
			delta.rotate = delta.translateX = delta.translateY = origin.rotate = origin.translateX = origin.translateY = 0;
			if (img.width > img.height) {
				this.x = (img.height - img.width) / 2;
				this.origin.scale = size / img.height;
			} else {
				this.y = (img.width - img.height) / 2;
				this.origin.scale = size / img.width;
			}
			this.render();
		},
		render () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			this.applyTransform();
			context.drawImage(this.app.img, this.x, this.y, this.width, this.height);
			this.resetTransform();
		},
		applyTransform () {
			let scale = this.origin.scale * this.delta.scale;
			let translateX = (this.origin.translateX + this.delta.translateX) * this.origin.scale;
			let translateY = (this.origin.translateY + this.delta.translateY) * this.origin.scale;
			context.translate(translateX, translateY);
			context.scale(scale, scale);
			context.rotate(0);
		},
		resetTransform () {
			let scale = 1 / this.origin.scale / this.delta.scale;
			let translateX = (this.origin.translateX + this.delta.translateX) * this.origin.scale;
			let translateY = (this.origin.translateY + this.delta.translateY) * this.origin.scale;
			context.rotate(0);
			context.scale(scale, scale);
			context.translate(-translateX, -translateY);
		},
		panend ( event ) {
			this.delta.translateX = 0;
			this.delta.translateY = 0;
			this.origin.translateX += event.deltaX;
			this.origin.translateY += event.deltaY;
			this.render();
			// TODO: image clip
		},
		panmove ( event ) {
			this.delta.translateX = event.deltaX;
			this.delta.translateY = event.deltaY;
			this.render();
		},
		pinch ( event ) {
			console.log('pinch', event);
		},
		pinchend ( event ) {
			console.log('pinchend', event);
		},
		pinchmove ( event ) {
			console.log('pinchmove', event);
		},
		rotate ( event ) {
			console.log('rotate', event);
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
