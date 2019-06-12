<template>
	<div class="history">
		
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
	import HistoryService from './service/history-service.js'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Cell, CellGroup } from 'vant'

	export default {
		name: 'wrong-book',
		components: {
			'van-nav-bar': NavBar,
			'van-cell-group': CellGroup,
			'van-cell': Cell
		},
		beforeCreate () {
			this.service = new HistoryService()
		},
		data () {
			return {
				navTitle: '做题历史',
				label: '截止时间：',
				user: null,
				exercises: null
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
					return that.service.listFinishExercises(options)
				}).then(function (data) {
					that.exercises = data.data
				})
			},
			onClickLeft () {
				this.$router.push('/home')
			},
			toExerciseInfo (item) {
				this.$store.state.history.selectExercise = item
				this.$router.push('/exercise-info')
			}
		},
		computed: {
			endTimeStr: function () {
				return new Date(this.endTime).Format('MM-dd hh:mm')
			}
		}
	}
</script>

<style lang="scss">
	@import "./history.scss";
</style>