<template>
	<div class="information">
		
		<div class="head-sculpture">
			
			<template v-if="imageURL">
				<img :src="imageURL" width="100px">
			</template>
			
			<template v-else>
				<span class="icon iconfont icon-touxiang"></span>
			</template>
			
		</div>
		
		<div class="user-info">
			<h2 v-if="user">{{ user.name }}</h2>
			<h4 v-if="school">{{ school.name }}</h4>
		</div>
		
	</div>
</template>

<script>
	import config from '../../../../common/scripts/config/config.js'
	import SessionStorage from '../../../../common/scripts/storage/promise/session-storage.js'

	export default {
		name: 'information',
		components: {},
		data () {
			return {
				msg: '个人中心',
				user: null,
				school: null,
				imageURL: null
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
					that.school = that.user.schools[0]
					that.imageURL = config.serverURL + that.user.head_sculpture.url.substring(1, that.user.head_sculpture.url.length)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./information.scss";
</style>