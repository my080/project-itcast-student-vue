<template>
	<div class="student-info">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<div class="join-title">姓名和性别填写后将无法修改</div>
		
		<van-cell-group>
			<van-field class="login-input" required placeholder="请输入用户名"
					v-model="name" />
			
			<van-field class="login-input" required placeholder="请选择用户性别"
			           v-model="sex" @click="toSelectSex" />
		</van-cell-group>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18">
				<van-button class="login-btn" round type="info" @click="next">下一步</van-button>
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
		
		<van-actionsheet class="sex-actionsheet" v-model="show" title="选择性别">
			<div class="sex">
				<div class="man" @click="checkSex('男')"></div>
				<div class="woman" @click="checkSex('女')"></div>
			</div>
			<div class="cancel" @click="cancel">
				取消
			</div>
		</van-actionsheet>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Button, Row, Col, Field, CellGroup, Actionsheet } from 'vant'

	export default {
		name: 'student-info',
		components: {
			'van-nav-bar': NavBar,
			'van-field': Field,
			'van-row': Row,
			'van-button': Button,
			'van-col': Col,
			'van-cell-group': CellGroup,
			'van-actionsheet': Actionsheet
		},
		data () {
			return {
				navTitle: '学生信息',
				code: null,
				show: false,
				name: null,
				sex: null,
				register: {}
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
				this.$router.push('/join-class')
			},
			next () {
				let that = this
				if (!this.name) {
					that.$toast('用户名不能为空！')
					return
				}
				if (!this.sex) {
					that.$toast('性别不能为空！')
					return
				}
				this.register.name = this.name
				this.register.sex = this.sex
				SessionStorage.set('register', this.register).then(function () {
					that.$router.push('/register')
				})
			},
			checkSex (sex) {
				this.sex = sex
				this.show = false
			},
			toSelectSex () {
				this.show = true
			},
			cancel () {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	@import "./login.scss";
	
	.student-info {
		background: #f4f4f4;
		height: 100vh;
	}
</style>