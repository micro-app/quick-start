<script>
import clipper from  '../modules/clipper.js';

const appIconSize = 180;
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = canvas.height = appIconSize;
clipper.init({
	canvas,
	context,
});

let scale;
let rotation;

export default {
    props : ['clipping'],
	ready () {
        this.$els.canvas.appendChild(canvas);
	},
	methods : {
        panend ( event ) {
            clipper.save('translate');
            clipper.render();
        },
        panmove ( event ) {
            clipper.deltaX = event.deltaX;
            clipper.deltaY = event.deltaY;
            clipper.render();
        },
        pinchend ( event ) {
            clipper.save('scale');
            clipper.save('rotation');
            clipper.save('translate');
            clipper.render();
        },
        pinchmove ( event ) {
            clipper.scale = event.scale / scale;
            clipper.rotation = event.rotation - rotation;
            clipper.render();
        },
        pinchstart ( event ) {
            scale = event.scale;
            rotation = event.rotation;
        },
	},
};
</script>

<template>
	<div class="clipper">
        <div class="clipper-icon"
            v-el:canvas
            v-show="clipping"
            transition="fade"
            v-touch:panend="panend"
            v-touch:panmove="panmove"
            v-touch:pinchend="pinchend"
            v-touch:pinchmove="pinchmove"
            v-touch:pinchstart="pinchstart"
        ></div>
	</div>
</template>

<style lang="scss">
    .clipper {
        position: relative;
        z-index: 1;
        top: 50px;
        @media only screen and (max-width: 414px) {
            & {
                top: 36px;
            }
        }
    }
    .clipper-icon {
        position: absolute;
        width: 80%;
        padding-top: 80%;
        top: 0;
        left: 0%;
        // transform: translateX(12.5%) translateY(15px + 50 + 10);
        transform: translateX(12.5%) translateY(15px + 50 + 10 + 15);
        overflow: hidden;
        border-radius: 15%;
		background-color: #fdfdfd;
		margin-left: 0;
		@media only screen and (min-width: 414px) {
			@media (orientation : landscape) {
				transform-origin: 0% 0%;
				transform: translateX(12.5% + 25) translateY(10%) scale(.5);
			}
		}
		@media only screen and (max-width: 320px) {
			transform: translateX(12.5%) translateY(15px + 20);
		}
		.pwa + .clipper & {
			pointer-events: none;
			transform-origin: 0% 0%;
			transform: translateX(25px) translateY(25px) scale(.4);
			transition: transform 350ms linear;
			@media only screen and (min-width: 414px) {
				transform: translateX(25px + 15) translateY(25px + 15) scale(.4);
				// @media (orientation : landscape) {
				// 	transition: transform 350ms linear;
				// 	// transform: translateX(12.5%) translateY(15px + 50 + 10);
				// }
			}
			&::after {
			    background-image: none;
			}
		}
		&.fade-transition.fade-leave {
			transition: opacity 0ms linear;
		}
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
            background-image: url(../img/subline.png);
            overflow: hidden;
            border-radius: 15%;
            border: 1px solid #9f9f9f;
            opacity: .7;
        }
    }
</style>
