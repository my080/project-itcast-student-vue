<template>
	<div class="learn-state">
		<van-nav-bar class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
	</div>
</template>

<script>
	import { NavBar } from 'vant'

	export default {
		name: 'learn-state',
		components: {
			'van-nav-bar': NavBar
		},
		data () {
			return {
				navTitle: '学习中心'
			}
		},
		methods: {
			onClickLeft () {
				this.$router.push('/home')
			}
		}
	}
</script>

<style scoped>
	.fixed {
		position: fixed !important;
	}
</style>