<script>
import { lang } from '../modules/lang.js';

const tips_title = {
	en : 'Please open the link in Safari.',
	zh : '请用Safari浏览器打开链接',
};

export default {
	data () {
		return {
			title : tips_title[lang],
		}
	},
};
</script>

<template>
	<div class="app-page tips">
		<div class="tips-browser"></div>
		<div class="tips-title">{{ title }}</div>
	</div>
</template>

<style lang="scss">
	.tips {
		z-index: 2;
	}
	.tips-browser {
		width: 80px;
		height: 80px;
		margin: 50px auto 0;
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
