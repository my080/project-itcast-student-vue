<template>
	<div class="exercise">
		<van-nav-bar class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<main>
			<van-circle v-model="currentRate" layer-color="#ebedf0" size="180px" fill="#fff"
			            :rate="currentRate" :speed="100" :text="text" :stroke-width="60">
			</van-circle>
			
			<h2>
				完成进度
			</h2>
		</main>
		
		<content>
			<van-nav-list>
				<van-cell title="随堂练习" :value="value" @click="toDoExercise" />
			</van-nav-list>
		</content>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Circle, List, Cell } from 'vant';

	export default {
		name: 'exercise',
		components: {
			'van-circle': Circle,
			'van-nav-bar': NavBar,
			'van-nav-list': List,
			'van-cell': Cell
		},
		beforeCreate () {
			this.$store.state.exercise.options = null
			this.$store.state.exercise.questions = null
			this.$store.state.exercise.userResult = null
		},
		data () {
			return {
				currentRate: 0,
				navTitle: '随堂练习',
				exercise: null,
				value: null,
				user: null,
				userResult: null,
				total: null,
				complateCount: null
			}
		},
		created () {
			this.init()
		},
		computed: {
			text () {
				return this.currentRate.toFixed(0) + '%'
			}
		},
		methods: {
			init () {
				let that = this
				SessionStorage.get('loginUser').then(function (data) {
					that.user = data.data
				}).then(function () {
					SessionStorage.get('doing-exercise').then((data) => {
						that.exercise = data
						that.total = that.exercise.questions.length
						that.findScore(data)
					})
				})
			},
			findScore (data) {
				let that = this
				let scores = data.scores
				if (scores && scores.length > 0) {
					for (let i = 0; i < scores.length; i++) {
						if (scores[i].consumer === this.user.id) {
							that.userResult = scores[i]
							break
						}
					}
				}
				let complateCount = 0
				for (let key in that.userResult.answer_result) {
					that.userResult.answer_result[key]
					complateCount = complateCount + 1
				}
				this.value = complateCount + '/' + that.total
				this.currentRate = Math.floor(complateCount / that.total * 100)
			},
			onClickLeft () {
				this.$router.push('/home')
			},
			toDoExercise () {
				this.$router.push('/do-exercise')
			}
		}
	}
</script>

<style lang="scss">
	@import "./exercise.scss";
</style>