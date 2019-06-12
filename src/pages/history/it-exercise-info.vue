<template>
	<div class="exercise-info">
		<van-nav-bar class="nav-bar"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<main>
			<van-circle v-model="currentRate" layer-color="#ebedf0" size="180px" fill="#fff"
			            :rate="currentRate" :speed="100" :text="text" :stroke-width="60">
			</van-circle>
			
			<h2>
				正确率
			</h2>
		</main>
		
		<van-cell-group class="exercise-list">
			<van-cell title="标题" :value="title"></van-cell>
			<van-cell title="学科" :value="subject"></van-cell>
			<van-cell title="类型" :value="type"></van-cell>
			<van-cell title="题数" :value="total"></van-cell>
			<van-cell title="正确题数" :value="correctCount"></van-cell>
			<van-cell title="得分" :value="score"></van-cell>
		</van-cell-group>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Circle, CellGroup, Cell } from 'vant'

	export default {
		name: 'exercise-info',
		components: {
			'van-nav-bar': NavBar,
			'van-circle': Circle,
			'van-cell-group': CellGroup,
			'van-cell': Cell
		},
		data () {
			return {
				navTitle: '练习详情',
				currentRate: 0,
				user: null,
				text: null,
				title: null,
				subject: null,
				type: null,
				total: 0,
				correctCount: 0,
				score: 0,
				userScore: null
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
					that.title = that.$store.state.history.selectExercise.name
					that.subject = that.$store.state.history.selectExercise.subjects[0].name
					that.type = that.$store.state.history.selectExercise.type
					that.total = that.$store.state.history.selectExercise.questions.length
					let scores = that.$store.state.history.selectExercise.scores
					for (let i = 0; i < scores.length; i++) {
						if (scores[i].consumer === that.user.id) {
							that.userScore = scores[i]
						}
					}
					if (that.userScore) {
						let answerResult = that.userScore.answer_result
						for (let key in answerResult) {
							let option = answerResult[key]
							if (option.correct === true || option.correct === 'right') {
								that.correctCount = that.correctCount + 1
								that.score = that.score + option.score
							} else if (option.correct === 'half') {
								that.correctCount = that.correctCount + 0.5
								that.score = that.score + option.score
							}
						}
					}
					that.currentRate = Math.floor(that.correctCount / that.total * 100)
					that.text = that.currentRate + '%'
				})
			},
			onClickLeft () {
				this.$router.push('/history')
			}
		}
	}
</script>

<style lang="scss">
	@import "./history.scss";
</style>
