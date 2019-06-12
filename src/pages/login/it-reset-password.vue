<template>
	<div class="reset-password">
		<van-nav-bar class="nav-bar" :title="navTitle"></van-nav-bar>
		
		<div class="join-title">请注意查收邮件</div>
		
		<van-cell-group>
			<van-field class="login-input" disabled required placeholder="邮箱地址"
			           v-model="email" />
			<van-field class="login-input" required placeholder="请输入密码" type="password"
			           v-model="password" />
			<van-field class="login-input" required placeholder="请再次输入密码" type="password"
			           v-model="confirmPassword" />
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="submit">提交</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import { NavBar, Field, CellGroup, Button, Row, Col } from 'vant'

	export default {
		name: 'register',
		components: {
			'van-nav-bar': NavBar,
			'van-row': Row,
			'van-col': Col,
			'van-button': Button,
			'van-cell-group': CellGroup,
			'van-field': Field
		},
		beforeCreate () {
			this.service = new LoginService()
		},
		data () {
			return {
				navTitle: '输入注册信息',
				email: null,
				password: null,
				confirmPassword: null,
				user: null,
				code: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				this.code = this.$route.query.email
				this.email = this.$route.query.email
				let param = {
					email: this.email,
//					activate_code: this.code,
					status: 1,
					type: '学生'
				}
				this.service.getUser(param).then(function (data) {
					if (data && data.data.length > 0) {
						that.user = data.data[0]
					}
				}, function (error) {
					if (error) {
						that.$toast('服务器异常，请与客服联系！')
					}
				})
			},
			resetPasswordSuccess (data) {
				if (data) {
					let that = this
					that.$router.push({
						path: '/reset-success',
						query: {
							email: that.email,
							code: that.code
						}
					})
				}
			},
			resetPasswordError (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			resetPassword () {
				let that = this
				let param = {
					id: this.user.id,
					password: this.$md5(this.password)
				}
				return this.service.resetPassword(param)
					.then(that.resetPasswordSuccess, that.resetPasswordError)
			},
			submit () {
				if (!this.password) {
					this.$toast('密码不能为空！')
				}
				if (!this.confirmPassword) {
					this.$toast('请再次输入密码！')
				}
				if (this.password !== this.confirmPassword) {
					this.$toast('两次输入密码不一致！')
				}
				this.resetPassword()
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.reset-password {
		background: #f4f4f4;
		height: 100vh;
	}
</style>