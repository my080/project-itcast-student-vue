<template>
	<main>
		<!-- 首页动态切换部分 author:周亮 createTime:2017-05-17 start -->
		<van-swipe @change="onChange" :autoplay="5000">
			
			<van-swipe-item>
				<div class="img1"></div>
			</van-swipe-item>
			
			<van-swipe-item>
				<div class="img2"></div>
			</van-swipe-item>
			
			<van-swipe-item>
				<div class="img3"></div>
			</van-swipe-item>
			
			<van-swipe-item>
				<div class="img4"></div>
			</van-swipe-item>
		</van-swipe>
		<!-- 首页动态切换部分 author:周亮 createTime:2017-05-17 end -->
		
		<!-- 首页错题本、做题历史、学情报告、精品课堂四个菜单按钮 author:周亮 createTime:2017-05-17 start -->
		<div class="menus">
			
			<div class="menu-item" @click="toPage('wrong-book')">
				<span class="icon iconfont icon-Location yellow"></span>
				<h4>错题本</h4>
			</div>
			
			<div class="menu-item" @click="toPage('history')">
				<span class="icon iconfont icon-lianxice- orange"></span>
				<h4>做题历史</h4>
			</div>
			
			<div class="menu-item" @click="toPage('learning-report')">
				<span class="icon iconfont icon-system-statu green"></span>
				<h4>学情报告</h4>
			</div>
			
			<div class="menu-item" @click="toPage('perfect-classroom')">
				<span class="icon iconfont icon-ketang red"></span>
				<h4>精品课堂</h4>
			</div>
			
		</div>
		<!-- 首页错题本、做题历史、学情报告、精品课堂四个菜单按钮 author:周亮 createTime:2017-05-17 start -->
	</main>
</template>

<script>
	import { Swipe, SwipeItem } from 'vant'
	
	export default {
		name: 'home',
		components: {
			'van-swipe': Swipe,
			'van-swipe-item': SwipeItem
		},
		data () {
			return {}
		},
		methods: {
			onChange () {},
			toPage (path) {
				if (path === 'perfect-classroom') {
					this.$toast('该模块维护中，尽情期待！')
				} else {
					this.$router.push('/' + path)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./main.scss";
</style>