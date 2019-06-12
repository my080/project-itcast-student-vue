<template>
	<div class="question-card">
		
		<van-nav-bar class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<!-- 答题卡题号列表 author:周亮 createTime:2017-05-20 start -->
		
		<van-row class="btn-row" type="flex">
			<van-col span="2"></van-col>
			
			<van-col span="20">
				
				<template v-for="(score, index) in scores">
					
					<van-button class="select-item" v-if="score.status == 'right' || score.status == true"
					            type="primary" round :key="index"
					            @click="selectQuestion(score)">
						{{ score.index + 1 }}
					</van-button>
					
					<van-button class="select-item" v-else-if="score.status == 'half'"
					            type="info" round :key="index"
					            @click="selectQuestion(score)">
						{{ score.index + 1 }}
					</van-button>
					
					<van-button class="select-item" v-else-if="score.status == 'wrong'"
					            type="warning" round :key="index"
					            @click="selectQuestion(score)">
						{{ score.index + 1 }}
					</van-button>
					
					<van-button class="select-item" v-else
					            round :key="index"
					            @click="selectQuestion(score)">
						{{ score.index + 1 }}
					</van-button>
					
				</template>
			
			</van-col>
			
			<van-col span="2"></van-col>
		</van-row>
		
		<van-row class="btn-row status-bar" type="flex">
			
			<van-col span="2"></van-col>
			
			<van-col span="20">
				
				<span class="item-status">
					正确：<van-button size="mini" type="primary"></van-button>
				</span>
				<span class="item-status">
					半对：<van-button size="mini" type="info"></van-button>
				</span>
				
				<br />
				
				<span class="item-status">
					错误：<van-button size="mini" type="warning"></van-button>
				</span>
				<span class="item-status">
					未作答：<van-button size="mini"></van-button>
				</span>
				
			</van-col>
			
			<van-col span="2"></van-col>
		
		</van-row>
		
		<!-- 答题卡题号列表 author:周亮 createTime:2017-05-20 end -->
		
	</div>
</template>

<script>
	import { NavBar, Row, Col, Button } from 'vant';
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	
	export default {
		name: 'question-card',
		components: {
			'van-nav-bar': NavBar,
			'van-button': Button,
			'van-row': Row,
			'van-col': Col
		},
		data () {
			return {
				navTitle: '答题卡',
				questions: [],
				scores: [],
				doingExercise: null
			}
		},
		created () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				SessionStorage.get('doing-exercise').then(function (data) {
					that.doingExercise = data
					that.$store.state.exercise.userResult
					let answer_result = that.$store.state.exercise.userResult.answer_result
					that.questions = that.$store.state.exercise.questions
					for (let i = 0; i < that.questions.length; i++) {
						let question = that.questions[i]
						let score = answer_result[question.id]
						let obj = {
							qId: question.id,
							index: i
						}
						if (score && (score.correct == true || score.correct == 'right')) {
							obj.status = 'right'
						} else if (score && score.correct == 'half') {
							obj.status = 'half'
						} else if (score && (!score.correct || score.correct == 'wrong')) {
							obj.status = 'wrong'
						} else {
							obj.status = 'undone'
						}
						that.scores.push(obj)
					}
				})
			},
			selectQuestion (item) {
				this.$store.state.exercise.options.index = item.index + 1
				this.$store.state.exercise.options.question = this.questions[item.index]
				this.$router.push('/do-exercise')
			},
			onClickLeft () {
				this.$router.push('/do-exercise')
			}
		}
	}
</script>

<style lang="scss">
	@import "./exercise.scss";
	.question-card {
		margin-top: 54px;
	}
</style>