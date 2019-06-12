<template>
	<div class="perfect-classroom">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
	</div>
</template>

<script>
	import { NavBar } from 'vant'

	export default {
		name: 'perfect-classroom',
		components: {
			'van-nav-bar': NavBar
		},
		data () {
			return {
				navTitle: '精品课堂'
			}
		},
		methods: {
			onClickLeft () {
				this.$router.push('/home')
			}
		}
	}
</script>

<style lang="scss">

</style>