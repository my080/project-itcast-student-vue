<template>
	<div class="login">
		
		<!-- 登录页的头部，仅有 logo 没有实际功能 author:周亮 createTime:2017-05-17 start -->
		<header>
			<van-row type="flex">
				<van-col span="6"></van-col>
				
				<van-col class="input-area" span="5">
					<div class="logo-icon"></div>
				</van-col>
				
				<van-col span="9">
					<h2>黑马中学</h2>
					<h3>让学习更美好</h3>
				</van-col>
				
				<van-col span="4"></van-col>
			</van-row>
		</header>
		<!-- 登录页的头部，仅有 logo 没有实际功能 author:周亮 createTime:2017-05-17 end -->
		
		<!-- 登录页的输入框部分 author:周亮 createTime:2017-05-17 start -->
		<main>
			<van-row class="btn-row" type="flex">
				<van-col span="2"></van-col>
				
				<van-col class="input-area" span="20">
					<van-cell-group>
						<van-field class="login-input" required placeholder="邮箱地址"
						           v-model="email" />
						<van-field class="login-input" required placeholder="请输入密码" type="password"
						           v-model="password" />
					</van-cell-group>
				</van-col>
				
				<van-col span="2"></van-col>
			</van-row>
			
			<van-row class="checkbox-row" type="flex">
				<van-col span="2"></van-col>
				
				<van-col span="12"></van-col>
				
				<van-col span="8">
					<!--<van-checkbox class="forget-password" v-model="isSavePassword" checked-color="#07c160" @click="checkboxClick">记住密码</van-checkbox>-->
				</van-col>
				
				<van-col span="2"></van-col>
			</van-row>
			
			<van-row type="flex">
				<van-col span="3"></van-col>
				
				<van-col span="18">
					<van-button class="login-btn" round type="info" @click="submit">登录</van-button>
				</van-col>
				
				<van-col span="3"></van-col>
			</van-row>
		</main>
		<!-- 登录页的输入框部分 author:周亮 createTime:2017-05-17 end -->
		
		<!-- 登录页底部，主要是两个链接地址 author:周亮 createTime:2017-05-17 start -->
		<footer>
			
			<van-row type="flex">
				<van-col span="2"></van-col>
				
				<van-col span="20">
					<span class="left" @click="toForgetPassword">忘记密码</span>
					<span class="right" @click="toRegister">注册账号</span>
				</van-col>
				
				<van-col span="2"></van-col>
			</van-row>
			
		</footer>
		<!-- 登录页底部，主要是两个链接地址 author:周亮 createTime:2017-05-17 end -->
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { Button, CellGroup, Field, Row, Col } from 'vant'
	
	export default {
		name: 'login',
		components: {
			'van-button': Button,
			'van-field': Field,
			'van-cell-group': CellGroup,
			'van-row': Row,
			'van-col': Col
		},
		beforeCreate () {
			this.service = new LoginService()
		},
		data () {
			return {
				email: '71719323@qq.com',                                                                            // 为了演示方便默认填入的账号
				password: '123456',                                                                                   // 为了演示方便默认填入的密码
				isSavePassword: false
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
//				let user = CookieStorage.get('user')
//				let password = CookieStorage.get('password')
			},
			loginSuccess (data) {
				if (data) {
					if (data.data && data.data.length > 0) {
						if (data.data[0].status == 1) {
							this.saveLoginStatus(data)
						} else if (data.data[0].status == 0) {
							this.$toast('该用户没有激活，请激活后再进行登录！')
						} else {
							this.$toast('当前用户不存在！')
						}
					} else {
						this.$toast('用户或密码有误，请重新输入！')
					}
				}
			},
			loginError (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			saveLoginStatusSuccess (data) {
				if (data) {
					let that = this
					if (data.data.success) {
						SessionStorage.set('loginUser', data.data)
//						if (that.isSavePassword) {
//							CookieStorage.set('user', that.email, 3)
//							CookieStorage.set('password', md5Password, 3)
//						}
						that.$router.push('/home')
					}
				}
			},
			saveLoginStatusError (error) {
				if (error) {
					this.$toast('服务器异常，请与客服联系！')
				}
			},
			saveLoginStatus (data) {
				if (data) {
					let that = this
					let sendObj = data.data[0]
					let loginStatusCode = this.$md5(data.data[0].email + Math.random())
					sendObj.loginStatusCode = loginStatusCode
					that.service.saveLoginStatus(sendObj).then(function (data) {
						that.saveLoginStatusSuccess(data)
					}, function (error) {
						that.saveLoginStatusError(error)
					})
				}
			},
			login () {
				let md5Password = this.$md5(this.password)
				let obj = {
					email: this.email,
					password: md5Password,
					type: '学生'
				}
				return this.service.login(obj)
			},
			submit () {
				let that = this
				if (!that.email) {
					that.$toast('邮箱地址不能为空！')
					return
				}
				if (!this.password) {
					that.$toast('密码不能为空！')
					return
				}
				that.login()
					.then(this.loginSuccess, this.loginError)
			},
			checkboxClick () {
				if (!this.isSavePassword) {
					this.isSavePassword = false
				} else {
					this.isSavePassword = true
				}
			},
			toForgetPassword () {
				this.$router.push('/find-password')
			},
			toRegister () {
				this.$router.push('/relate-teacher')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./login.scss";
	
	header h2 {
		padding-left: 1rem;
		margin-top: 5.8rem;
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	header h3 {
		padding-left: 1rem;
	}
</style>