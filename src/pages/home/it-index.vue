<template>
	<div class="home">
		
		<router-view></router-view>
		
		<van-tabbar v-model="active">
			<van-tabbar-item icon="home-o" to="/main">主页</van-tabbar-item>
			<van-tabbar-item icon="user-o" to="/personal">我的</van-tabbar-item>
		</van-tabbar>
		
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vant'

	export default {
		name: 'home',
		components: {
			'van-tabbar': Tabbar,
			'van-tabbar-item': TabbarItem
		},
		data () {
			return {
				active: 0,
				normal: '',
				user: null
			}
		},
		created () {
			this.init ()
		},
		methods: {
			init () {
				let that = this
				that.$router.push('/main')
			}
		}
	}
</script>

<style lang="scss">
	@import "./home.scss";
	
	.home {
		height: 100vh;
	}
</style>