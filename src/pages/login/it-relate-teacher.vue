<template>
	<div class="relate-teacher">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<h2 class="van-doc">请咨询老师获取老师邮箱地址</h2>
		
		<van-cell-group>
			<van-field class="login-input" v-model="code" required placeholder="请输入老师 ID 或邮箱"></van-field>
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="next">下一步</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</div>
</template>

<script>
	import LoginService from './service/login-service.js'
	import { NavBar, Field, CellGroup, Button, Row, Col } from 'vant'

	export default {
		name: 'relate-teacher',
		components: {
			'van-nav-bar': NavBar,
			'van-field': Field,
			'van-cell-group': CellGroup,
			'van-row': Row,
			'van-button': Button,
			'van-col': Col
		},
		beforeCreate () {
			this.service = new LoginService()
		},
		data () {
			return {
				navTitle: '老师ID或邮箱',
				code: null
			}
		},
		methods: {
			onClickLeft () {
				this.$router.push('/to-login')
			},
			next () {
				let that = this
				if (this.code) {
					let obj = { email: that.code }
					that.service.findTeacherCount(obj).then(function (data) {
						if (data.data > 0) {
							that.$store.state.login.teacherEmail = that.code
							that.$router.push('/join-class')
						} else {
							that.$toast('这位老师不存在！')
						}
					}).catch(function () {
						that.$toast('服务器存在异常请与客服联系！')
					})
				} else {
					that.$toast('请输入老师邮箱！')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.relate-teacher {
		background: #f4f4f4;
		height: 100vh;
	}
</style>