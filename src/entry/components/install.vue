<script>
import { lang } from '../modules/lang.js';
import { space } from '../modules/space.js';
import { clipper } from  '../modules/clipper.js';

const install_button = {
    en : 'INSTALL',
    zh : '安装',
};

let img;
let canvas;

let scale;
let rotation;
let allowToDataURL;

const size = 180;

export default {
	data () {
		return {
			button : install_button[lang],
		}
	},
	ready () {
		this.init();
		this.$on('enter:install', this.init.bind(this));
	},
    methods : {
        tap () {
			microApp.capable = true;
			microApp.href = space.href;
			microApp.title = space.title;
			microApp.statusBarStyle = space.statusBarStyle;
			if (allowToDataURL) {
				microApp.icon = canvas.toDataURL();
			} else {
				if (/^data:image/.test(space.icon)) {
					microApp.icon = space.icon;
				} else {
					microApp.icon = space.icon + '#autosize';
				}
			}
            this.$parent.show('finish');
        },
		init () {
            if (img === space.img) {
                return;
            }
            img = space.img;
            canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            let context = canvas.getContext('2d');
            let prev = this.$els.canvas.querySelector('canvas');
            if (prev) {
                this.$els.canvas.removeChild(prev);
            }
            clipper.init({
                canvas,
                context,
            });
			clipper.reset(space.img);
			try {
				canvas.toDataURL();
				allowToDataURL = true;
			} catch (e) {
				allowToDataURL = false;
			}
            this.$els.canvas.appendChild(canvas);
		},
		panend ( event ) {
			if (allowToDataURL) {
                clipper.save('translate');
                clipper.render();
			}
		},
		panmove ( event ) {
			if (allowToDataURL) {
                clipper.deltaX = event.deltaX;
                clipper.deltaY = event.deltaY;
                clipper.render();
			}
		},
		pinchend ( event ) {
			if (allowToDataURL) {
                clipper.save('scale');
                clipper.save('rotation');
                clipper.save('translate');
                clipper.render();
			}
		},
		pinchmove ( event ) {
			if (allowToDataURL) {
                clipper.scale = event.scale / scale;
                clipper.rotation = event.rotation - rotation;
                clipper.render();
			}
		},
		pinchstart ( event ) {
			if (allowToDataURL) {
                scale = event.scale;
                rotation = event.rotation;
			}
		},
    },
};
</script>

<template>
	<div class="app-page install">
		<div class="install-box">
			<div class="install-icon"
                v-el:canvas
                v-touch:panend="panend"
                v-touch:panmove="panmove"
                v-touch:pinchend="pinchend"
                v-touch:pinchmove="pinchmove"
                v-touch:pinchstart="pinchstart"
            ></div>
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
        top: 7%;
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
