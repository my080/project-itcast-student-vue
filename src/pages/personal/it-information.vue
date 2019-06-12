<template>
	<div class="personal-information">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="msg"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<van-cell-group class="list">
			
			<van-cell title="头像">
				<template slot="title">
					
					<span class="custom-text">头像</span>
					
					<van-uploader :after-read="onRead">
						
						<template v-if="imageURL">
							<img :src="imageURL" width="40px">
						</template>
						
						<template v-else>
							<span class="icon iconfont icon-touxiang"></span>
						</template>
						
					</van-uploader>
					
				</template>
			</van-cell>
			
			<van-cell title="姓名" :value="user.name" />
			<van-cell title="学校" :value="user.schools[0].name" />
			<van-cell title="班级" :value="user.grades[0]['名称'] + user.classes[0].name" />
			
		</van-cell-group>
		
	</div>
</template>

<script>
	import PersonalService from './service/personal-service.js'
	import config from '../../common/scripts/config/config.js'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { Cell, CellGroup, NavBar, Uploader } from 'vant'
	
	export default {
		name: 'personal-information',
		components: {
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell,
			'van-uploader': Uploader
		},
		beforeCreate () {
			this.service = new PersonalService()
		},
		data () {
			return {
				msg: '个人信息',
				user: null,
				imageURL: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				this.user = this.$store.state.personal.loginUser
				if (this.user.hasOwnProperty('head_sculpture') && this.user['head_sculpture']) {
					let url = this.user['head_sculpture']['url']
					this.imageURL = config.serverURL + url.substring(1, url.length)
				}
			},
			onClickLeft () {
				this.$router.push('/personal')
			},
			refreshUserSuccess (data) {
				if (data) {
					let that = this
					that.imageURL = data.data.url
					that.user = data.data
					that.$store.state.personal.loginUser = that.user
					SessionStorage.set('loginUser', data)
				}
			},
			uploadSuccess (data) {
				if (data) {
					let option = {
						id: this.user.id
					}
					return this.service.refreshUser(option)
				}
			},
			onRead (file) {
				let files = []
				files.push(file.file)
				this.service.upload(files, this.user)
					.then(this.uploadSuccess)
			}
		}
	}
</script>

<style lang="scss">
	@import "./personal.scss";
</style>