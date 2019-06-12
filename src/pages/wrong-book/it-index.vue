<template>
	<div class="wrong-book">
		
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<van-cell-group class="exercise-list">
			<van-cell v-for="(exercise, index) in exercises" :key="index"
			          :title="exercise.name" :value="'>'"
			          :label="label + (new Date(exercise.end_time).Format('MM-dd hh:mm'))"
			          @click="toExerciseInfo(exercise)"/>
		</van-cell-group>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import WrongService from './service/wrong-service.js'
	import { NavBar, CellGroup, Cell } from 'vant'

	export default {
		name: 'wrong-book',
		components: {
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell
		},
		beforeCreate () {
			this.service = new WrongService()
		},
		data () {
			return {
				navTitle: '错题本',
				user: null,
				exercises: [],
				label: '截止时间：'
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
				}).then(function () {
					let options = {
						consumers: that.user.id
					}
					return that.service.listWrongExercises(options)
				}).then(function (data) {
					that.exercises = data.data
				})
			},
			onClickLeft () {
				this.$router.push('/home')
			},
			toExerciseInfo (item) {
				let that = this
				SessionStorage.set('doing-exercise', item).then(() => {
					that.$router.push({
						path: '/do-exercise',
						query: {
							id: item.id,
							type: 'wrong'
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "./wrong-book.scss";
</style>