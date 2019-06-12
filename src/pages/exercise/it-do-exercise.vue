<template>
	<div class="do-exercise">
		
		<van-nav-bar v-if="type === 'exercise'" class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft" @click-right="onClickRight">
			
			<van-icon class="right-icon" name="description" slot="right" />
			
		</van-nav-bar>
		
		<van-nav-bar v-else-if="type === 'wrong'" class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<!-- -->
		<div class="question-area" :key="refreshKey">
			<van-progress class="progress" :percentage="percentage"></van-progress>
			
			<it-question v-if="options" :options="options" :key="index"
			             @next="next" @pre="pre" @submit="submit" @finish="finish" @refresh="refresh">
			</it-question>
		</div>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import ExerciseService from './service/exercise-service.js'
	import { Progress, NavBar, Icon } from 'vant';
	import Question from '../../components/question/it-question.vue'

	export default {
		name: 'exercise',
		components: {
			'it-question': Question,
			'van-progress': Progress,
			'van-nav-bar': NavBar,
			'van-icon': Icon
		},
		beforeCreate () {
			this.service = new ExerciseService()
		},
		data () {
			return {
				index: 1,
				questions: [],
				options: null,
				navTitle: '练习',
				percentage: 0,
				user: null,
				userResult: null,
				type: 'exercise',
				refreshKey: 1
			}
		},
		created () {
			this.init()
		},
		methods: {
			onClickLeft () {
				if (this.type === 'exercise') {
					this.$router.push('/exercise')
				} else if (this.type === 'wrong') {
					this.$router.push('/wrong-book')
				}
			},
			refreshKeyChange () {
				this.refreshKey = this.refreshKey > 1000 ? 1 : this.refreshKey + 1
			},
			getUserSuccess (data) {
				if (data && data.data) {
					this.user = data.data
					return this.getExercise()
				} else {
					this.$router.push('/')
				}
			},
			getUser () {
				return SessionStorage.get('loginUser')
			},
			transfromQuestions (data) {
				let that = this
				that.questions = data.questions
			},
			transfromWrongQuestions (data) {
				let score = this.$store.state.exercise.userResult
				let wrongQuestions = []
				for (let key in score.answer_result) {
					let qResult = score.answer_result[key]
					if (qResult.correct !== true && qResult.correct !== 'right') {
						for (let i = 0; i < data.questions.length; i++) {
							if (data.questions[i].id === key) {
								wrongQuestions.push(data.questions[i])
								break
							}
						}
					}
				}
				this.questions = wrongQuestions
			},
			getExerciseSuccess (data) {
				let that = this
				if (!data) {
					return
				}
				this.navTitle = data.subjects[0].name + this.navTitle
				that.findScore(data)
				if (this.type === 'exercise') {                                                                      // 判断是否是练习
					that.transfromQuestions(data)
				} else if (this.type === 'wrong') {                                                                  // 判断是否是错题本
					that.transfromWrongQuestions(data)
				}
				if (that.$store.state.exercise.options) {
					that.options = that.$store.state.exercise.options
					that.index = that.$store.state.exercise.options.index
				} else {
					that.options = {
						index: that.index,
						question: that.questions[0],
						level: 1,
						total: that.questions.length,
						eId: data.id
					}
					that.$store.state.exercise.options = that.options
					that.$store.state.exercise.questions = that.questions
				}
				that.percentage = Math.round((that.index - 1) / that.questions.length * 100)
			},
			getExercise () {
				return SessionStorage.get('doing-exercise')
			},
			init () {
				if (this.$route.query.hasOwnProperty('type') && this.$route.query.type) {
					this.type = this.$route.query.type
				}
				if (this.type === 'wrong') {
					this.$store.state.exercise.options = null
					this.$store.state.exercise.questions = null
					this.$store.state.exercise.userResult = null
					this.$store.state.exercise.type = null
				}
				this.getUser()
					.then(this.getUserSuccess)
					.then(this.getExerciseSuccess)
			},
			findScore (data) {
				let scores = data.scores
				if (scores && scores.length > 0) {
					for (let i = 0; i < scores.length; i++) {
						if (scores[i].consumer === this.user.id) {
							this.$store.state.exercise.userResult = scores[i]
							break
						}
					}
				}
			},
			next () {
				if (this.index < this.questions.length) {
					this.index = this.index + 1
					this.options = {
						index: this.index,
						question: this.questions[this.index - 1],
						level: 1,
						total: this.questions.length
					}
					this.$store.state.exercise.options = this.options
					this.percentage = Math.round((this.index - 1) / this.questions.length * 100)
				}
			},
			pre () {
				if (this.index > 0) {
					this.index = this.index - 1
					this.options = {
						index: this.index,
						question: this.questions[this.index - 1],
						level: 1,
						total: this.questions.length
					}
					this.$store.state.exercise.options = this.options
					this.percentage = Math.round((this.index - 1) / this.questions.length * 100)
				}
			},
			refresh () {
				this.refreshKeyChange()
			},
			calculate () {
				let userResult = this.$store.state.exercise.userResult
				let total = 0
				for (let key in userResult.answer_result) {
					if (userResult.answer_result[key].hasOwnProperty('score') && userResult.answer_result[key].score) {
						total = total + userResult.answer_result[key].score
					}
				}
				this.$store.state.exercise.userResult.total = total
			},
			saveAnswer (option) {
				if (this.type === 'wrong') {
					let newOption = this.$store.state.exercise.userResult.answer_result[this.options.question.id]
					if (newOption.hasOwnProperty('times')) {
						option.times = newOption.times + 1
					} else {
						option.times = 2
					}
				} else if (this.type === 'exercise') {
					option.times = 1
				}
				option['submit_time'] = new Date()
				this.$store.state.exercise.userResult.answer_result[this.options.question.id] = option
			},
			changeStatus (status) {
				this.$store.state.exercise.userResult.status = status
			},
			submitAnswer () {
				return this.service.submit(this.$store.state.exercise.userResult)
			},
			transformError () {
				let userResult = this.$store.state.exercise.userResult
				let isAllRight = true
				for (let key in userResult.answer_result) {
					if (userResult.answer_result[key].correct !== true && userResult.answer_result[key].correct !== 'right') {
						isAllRight = false
						break
					}
				}
				this.$store.state.exercise.userResult.is_all_right = isAllRight
			},
			submit (data) {
				// 改变 vuex 中题型数据格式
				this.saveAnswer(data)
				// 计算总分数
                this.calculate()
				if (this.type === 'exercise') {
					// 改变练习状态
					this.changeStatus('进行中')
				}
				// 判断是否存在错题，如果存在，本练习将会在错题本中出现
				this.transformError()
				// 提交答案
				this.submitAnswer()
				// 更新缓存数据
				this.resetDoingExercise()
			},
			resetDoingExercise () {
				let that = this
				let doingExercise = null
				SessionStorage.get('doing-exercise')
					.then(function (data) {
						doingExercise = data
					})
					.then(function () {
						let scores = doingExercise.scores
						for (let i = 0; i < scores.length; i++) {
							if (scores[i].consumer === that.user.id) {
								doingExercise.scores[i] = that.$store.state.exercise.userResult
								break
							}
						}
						SessionStorage.set('doing-exercise', doingExercise)
					})
			},
			finish () {
				let that = this
				if (this.type === 'exercise') {
					// 改变练习状态
					this.changeStatus('已完成')
				}
				this.service.finish(that.$store.state.exercise.userResult)
				this.$router.push('/exercise-result')
			},
			onClickRight () {
				this.$router.push('/question-card')
			}
		}
	}
</script>

<style lang="scss" scope>
	@import "./exercise.scss";
	.question-area {
		padding-top: 54px;
		padding-bottom: 80px;
	}
</style>