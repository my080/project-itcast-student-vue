<template>
	<div class="login">
		<div class="logo-area">
			<div class="logo"></div>
			<h2>黑马中学</h2>
		</div>
		<div class="btn-area">
			<van-row type="flex">
				<van-col span="3"></van-col>
				
				<van-col span="18">
					<van-button class="login-btn" round type="info" to="/relate-teacher">新用户注册</van-button>
				</van-col>
				
				<van-col span="3"></van-col>
			</van-row>
			
			<van-row type="flex">
				<van-col span="3"></van-col>
				
				<van-col span="18">
					<van-button class="login-btn" round type="info" to="/login">已有账号登录</van-button>
				</van-col>
				
				<van-col span="3"></van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	import { Button, Row, Col } from 'vant'
	
	export default {
		name: 'to-login',
		components: {
			'van-button': Button,
			'van-row': Row,
			'van-col': Col
		},
		data () {
			return {
				test: this.$store.state.login.test
			}
		},
		methods: {
			toRegister () {
				this.$router.push('/register')
			},
			toLogin () {
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
</style>