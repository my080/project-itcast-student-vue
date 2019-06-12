<template>
	<div class="result">
		<van-nav-bar class="nav-bar fixed" :title="navTitle">
		
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
		
		<footer>
			<van-row class="btn-row" type="flex">
				<van-col span="3"></van-col>
				
				<van-col span="18">
					<van-button class="submit-btn" round type="info" @click="toHome">返回首页</van-button>
				</van-col>
				
				<van-col span="3"></van-col>
			</van-row>
		</footer>
		
	</div>
</template>

<script>
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import { NavBar, Button, Row, Col, CellGroup, Cell, Circle  } from 'vant';

	export default {
		name: 'result',
		components: {
			'van-nav-bar': NavBar,
			'van-button': Button,
			'van-row': Row,
			'van-col': Col,
			'van-cell-group': CellGroup,
			'van-cell': Cell,
			'van-circle': Circle
		},
		data () {
			return {
				navTitle: '结果页',
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
					return SessionStorage.get('doing-exercise')
				}).then(function (data) {
					that.title = data.name
					that.subject = data.subjects[0].name
					that.type = data.type
					that.total = data.questions.length
					let scores = data.scores
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
			toHome () {
				this.$router.push('/home')
			},
			offStore () {
				this.$store.state.exercise.options = null
				this.$store.state.exercise.questions = null
				this.$store.state.exercise.userResult = null
				this.$store.state.exercise.type = null
			}
		},
		destoryed () {
			this.offStore()
		}
	}
</script>

<style lang="scss">
	@import "./exercise.scss";
	.result {
		height: 100vh;
		.exercise-list {
			padding-bottom: 80px;
		}
		footer {
			border-top: 1px solid #eeeeee;
			padding-top: 10px;
			padding-bottom: 10px;
			position: fixed;
			bottom: 0px;
			width: 100%;
			background: #ffffff;
			.btn-row {
				padding-top: 0;
			}
	  
		}
	}
</style>