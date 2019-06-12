<template>
	<div class="find-password">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft" ></van-nav-bar>
		
		<div class="join-title">请注意查收邮件</div>
		
		<van-cell-group>
			<van-field class="login-input" required placeholder="邮箱地址"
			           v-model="email" />
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="send">发送邮件</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import config from '../../common/scripts/config/config.js'
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
				navTitle: '找回密码',
				name: null,
				password: null,
				confirmPassword: null,
				email: null,
				user: null
			}
		},
		methods: {
			onClickLeft () {
				this.$router.push('/login')
			},
			send () {
				let that = this
				if (!that.email) {
					this.$toast('邮箱地址不能为空！')
				}
				let options = {
					email: that.email,
					type: '学生',
					status: 1
				}
				that.service.getUser(options)
					.then(that.getUserSuccess, that.getUserFail)
					.then(that.saveCodeSuccess, that.saveCodeError)
					.then(that.sendEmailSuccess, that.sendEmailError)
			},
			getUserFail (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			saveCodeSuccess (data) {
				if (data && data.data) {
					let that = this
					return that.sendEmail()
				} else {
					this.$toast('您输入邮箱不存在！')
				}
			},
			saveCodeError (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			saveCode () {
				let that = this
				that.activateCode = this.$md5(that.email + Math.random())
				let obj = {
					id: this.user.id,
					activate_code: that.activateCode
				}
				return that.service.updateUserCode(obj)
			},
			getUserSuccess (data) {
				if (data && data.data.length > 0) {
					let that = this
					that.user = data.data[0]
					return that.saveCode()
				} else {
					this.$toast('您输入邮箱不存在！')
				}
			},
			sendEmailSuccess (data) {
				if (data) {
					this.$router.push('/send-email-success')
				}
			},
			sendEmailError (error) {
				if (error) {
					this.$toast('邮件发送失败！')
				}
			},
			sendEmail () {
				let that = this
				let url = config.emailURL + '#/reset-password?code=' + that.activateCode + '&email=' + that.email
				let link = '<a href="' + url +  '">' + url + '</a>'
				let param = {
					email: that.email,
					title: '重置密码邮件',
					html: link
				}
				return this.service.sendEmail(param)
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.find-password {
		background: #f4f4f4;
		height: 100vh;
	}
</style>