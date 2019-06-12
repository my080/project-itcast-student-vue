<template>
	<div class="personal">
		<van-nav-bar class="nav-bar" :title="msg"></van-nav-bar>
		
		<it-information>
		
		</it-information>
		
		<van-cell-group class="list">
			<van-cell title="个人信息" value=">" @click="toInformation" />
			<van-cell title="班级管理" value=">" @click="toClassroom" />
			<van-cell title="退出登录" value=">" @click="logout" />
		</van-cell-group>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import PersonalService from './service/personal-service.js'
	import Information from './components/information/it-information.vue'
	import { Cell, CellGroup, NavBar } from 'vant'

	export default {
		name: 'personal',
		components: {
			'it-information': Information,
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell
		},
		beforeCreate () {
			this.service = new PersonalService()
		},
		data () {
			return {
				msg: '个人中心',
				user: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				SessionStorage.get('loginUser').then(function (data) {
					that.user = data.data
					that.$store.state.personal.loginUser = that.user
				})
			},
			logout () {
				let that = this
				this.service.logout({}).then(function () {
					that.$router.push('/')
				}, function () {
					that.$router.push('/')
				})
			},
			toInformation () {
				this.$router.push('/personal-information')
			},
			toClassroom () {
				this.$router.push('/personal-classroom')
			}
		}
	}
</script>

<style lang="scss">
	@import "./personal.scss";
</style>