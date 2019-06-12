<template>
	<div class="main">
		<it-header :title="title"></it-header>
		
		<div class="content">
			
			<it-main></it-main>
			
			<it-practice></it-practice>
			
		</div>
	</div>
</template>

<script>
	import Header from './components/header/it-header.vue'
	import Main from './components/main/it-main.vue'
	import Practice from './components/practice/it-practice.vue'
	
	export default {
		name: 'main',
		components: {
			'it-header': Header,
			'it-main': Main,
			'it-practice': Practice
		},
		data () {
			return {
				'msg': 'main',
				'title': '2019 学年 第二学期'
			}
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import "./home.scss";
	
	.main {
		height: 100%;
	}
</style>