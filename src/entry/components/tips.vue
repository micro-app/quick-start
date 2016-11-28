<script>
import {
	language,
} from '../modules/variable.js';

const lang = language;

const title = ({
	en : 'Please use Safari browser.',
	zh : '请用 Safari 浏览器体验',
})[lang];

export default {
	data () {
		return {
			title,
		};
	},
};
</script>

<template>
	<div class="app-page tips">
		<div class="tips-browser"></div>
		<div class="tips-title">{{* title }}</div>
	</div>
</template>

<style lang="scss">
	.tips {
		pointer-events: none;
	}
	.tips-browser {
		width: 80px;
		height: 80px;
		margin: 40% auto 0;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url(../img/safari.png);
	}
	.tips-title {
		font-size: 16px;
		padding-top: 15px;
		text-align: center;
	}
</style>
