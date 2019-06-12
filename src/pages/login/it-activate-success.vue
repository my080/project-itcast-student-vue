<template>
	<div class="activate-success">
		
		<van-nav-bar class="nav-bar" :title="navTitle"></van-nav-bar>
		
		<van-panel class="prompt" title="温馨提示">
			
			<div class="message">
				<h2>用户已激活成功！</h2>
				<h2> {{ seconds }} 秒钟后页面将自动跳转至登录页面！</h2>
			</div>
			
			<div slot="footer">
				<van-button size="small" type="info" @click="toLogin">去登陆</van-button>
				<div class="clear"></div>
			</div>
			
		</van-panel>
		
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import { Panel, NavBar, Button  } from 'vant'
	
	export default {
		name: 'question',
		beforeCreate () {
			this.loginService = new LoginService()
		},
		components: {
			'van-panel': Panel,
			'van-nav-bar': NavBar,
			'van-button': Button
		},
		data () {
			return {
				navTitle: '激活成功',
				seconds: 5,
				id: null,
				code: null
			}
		},
		created () {
			this.init()
			this.countDown()
			this.toActivate()
		},
		methods: {
			init () {
				this.id = this.$route.query.id
				this.code = this.$route.query.code
			},
			countDown () {
				let that = this
				let countDownFun = function () {
					that.seconds = that.seconds - 1
					if (that.seconds < 1) {
						that.$router.push({ path: '/login' })
					}
				}
				setInterval(countDownFun, 1000)
			},
			toLogin () {
				this.$router.push('/login')
			},
			toActivate () {
				let option = {
					id: this.id,
					code: this.code,
					status: 1
				}
				this.loginService.activate(option)
			}
		},
		destoryed () {
			clearInterval()
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.activate-success {
		background: #f4f4f4;
		height: 100vh;
		.message {
			padding: 30px 15px;
			h2 {
				font-size: 20px;
				line-height: 24px;
			}
		}
		.van-button {
			float: right;
		}
		.clear {
			clear: both;
		}
	}
</style>