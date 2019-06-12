<template>
	<content>
		<h1>待完成练习</h1>
		<it-practive-item v-for="(item, index) in exercises"
		                  :title="item.name" :start="item.start_time" :end="item.end_time"
		                  :subject="item.subjects[0].name" :key="index" :exercise="item">
		</it-practive-item>
	</content>
</template>

<script>
	import MainService from '../../service/main-service.js'
	import SessionStorage from '../../../../common/scripts/storage/promise/session-storage.js'
	import PractiveItem from './item/it-practice-item.vue'
	
	export default {
		name: 'home',
		components: {
			'it-practive-item': PractiveItem
		},
		beforeCreate () {
			this.service = new MainService()
		},
		data () {
			return {
				user: null,
				exercises: [],
				eId: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				this.eId = this.$route.query.id
				SessionStorage.get('loginUser').then(function (data) {
					that.user = data.data
				}).catch(function () {
					that.$router.push('/')
				}).then(that.listExercisesByUser)
					.then(that.listExercisesSuccess, that.listExercisesError)
			},
			listExercisesSuccess (data) {
				if (data) {
					this.exercises = data.data
				}
			},
			listExercisesError (error) {
				if (error) {
					this.$toast('当前用户不存在！')
				}
			},
			listExercisesByUser () {
				let that = this
				let options = {
					consumers: that.user.id
				}
				return this.service.listExercisesByUser(options)
			},
			toExercise (item) {
				this.$router.push({
					'path': '/practise',
					'query': {
						id: item.id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./practice.scss";
</style>