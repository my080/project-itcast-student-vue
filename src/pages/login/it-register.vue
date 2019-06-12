<template>
	<div class="register">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<div class="join-title">请注意查收邮件</div>
		
		<van-cell-group>
			<van-field class="login-input" required placeholder="邮箱地址"
					v-model="email" />
			<van-field class="login-input" required placeholder="请输入密码" type="password"
					v-model="password" />
			<van-field class="login-input" required placeholder="请再次输入密码" type="password"
					v-model="confirmPassword" />
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="submit">发送邮件</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</div>
</template>

<script>
	import config from '../../common/scripts/config/config.js'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
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
				register: {},
				activateCode: null,
				registerId: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				SessionStorage.get('register').then(function (data) {
					that.register = data
				})
			},
			onClickLeft () {
				this.$router.push('/student-info')
			},
			submit () {
				let that = this
				if (!this.email) {
					that.$toast('邮箱地址不能为空！')
					return
				}
				if (!this.password) {
					that.$toast('请输入密码！')
					return
				}
				if (!this.confirmPassword) {
					that.$toast('请再次输入密码！')
					return
				}
				if (this.password !== this.confirmPassword) {
					that.$toast('两次输入的密码不一致！')
					return
				}
				this.sendRegister()
					.then(this.registerSuccess, this.registerFail)
					.then(this.sendEmailSuccess, this.sendEmailFail)
			},
			registerSuccess (data) {
				if (data) {
					this.registerId = data.data.id
					return this.sendEmail()
				}
			},
			registerFail (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			sendRegister () {
				this.register.email = this.email
				this.register.activate_code = this.$md5(this.email + Math.random())
				this.register.create_time = new Date()
				this.register.update_time = new Date()
				this.register.password = this.$md5(this.password)
				this.register.type = '学生'
				this.activateCode = this.register.activate_code
				return this.service.register(this.register)
			},
			sendEmailSuccess (data) {
				if (data) {
					this.$router.push('/send-email-success')
				}
			},
			sendEmailFail (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			sendEmail () {
				let that = this
				let url = config.emailURL + '#/activate-success?code=' + that.activateCode + '&id=' + that.registerId
				let link = '<a href="' + url +  '">' + url + '</a>'
				let param = {
					email: that.email,
					title: '激活邮件',
					html: link
				}
				return this.service.sendEmail(param)
			}
		}
	}
</script>

<style>
	@import "./login.scss";
	
	.register {
		background: #f4f4f4;
		height: 100vh;
	}
</style>