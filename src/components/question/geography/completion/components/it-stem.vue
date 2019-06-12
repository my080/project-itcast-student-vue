<template>
	<content class="nui-scroll">
		<h3>{{ qIndex }}.{{ questionData.title }}</h3>
		
		<div class="main" id="question-main">
			<small v-for="(item, index) in questionData.stem.content" :key="index" v-html="item"></small>
		</div>
		
		<div class="question-panel" v-if="hasAnswered">
			<h3>正确答案：</h3>
			<div v-for="(key, index) in answer" :key="index">
				
				<template v-if="Array.isArray(key)">
					{{ key[0] }}
				</template>
				
				<template v-else>
					{{ key }}
				</template>
				
			</div>
		</div>

	</content>
</template>

<script>
	import Bus from '../../../../../common/scripts/utils/bus.js'
	import $ from 'jquery'

	export default {
		name: 'it-geography-completion-stem',
		components: {},
		props: [ 'question', 'index' ],
		data () {
			return {
				questionData: this.$props['question'],
				qIndex: this.$props['index'],
				answer: null,
				hasAnswered: false,
				optionsKey: 0,
				inputs: null
			}
		},
		created () {
			this.initData()
			this.initEvents()
		},
		mounted () {
			let elements = $('#question-main input')
			this.inputs = elements
		},
		methods: {
			initData () {
				this.answer = this.questionData.answer
			},
			initEvents () {
				let that = this
				Bus.$on('question-submit', function () {
					that.displayAnswer()
					that.submit()
				})
				Bus.$on('question-finish', function () {
					that.finish()
				})
			},
			displayAnswer () {
				this.hasAnswered = true
				for (let i = 0; i < this.inputs.length; i ++) {
					let value = this.inputs[i].value
					let answer = this.answer[i + 1]
					if (Array.isArray(answer)) {
						let className = 'wrong'
						for (let j = 0; j < answer.length; j++) {
							if (value && value.trim() == answer[j]) {
								className = 'right'
								break
							}
						}
						this.inputs[i].className = className
					} else {
						if (value && value.trim() == answer) {
							this.inputs[i].className = 'right'
						} else {
							this.inputs[i].className = 'wrong'
						}
					}
				}
			},
			optionsKeyChange () {
				this.optionsKey = this.optionsKey > 1000 ? 0 : this.optionsKey + 1
			},
			transFromAnswer (result) {
				let rightCount = 0
				let answerObj = {}
				for (let i = 0; i < this.inputs.length; i++) {
					let value = this.inputs[i].value
					answerObj[i + 1] = value
					let answer = this.answer[i + 1]
					if (Array.isArray(answer)) {
						for (let j = 0; j < answer.length; j++) {
							if (value && value.trim() == answer[j]) {
								rightCount = rightCount + 1
								break
							}
						}
					} else {
						if (value && value.trim() == answer) {
							rightCount = rightCount + 1
						}
					}
				}
				if (rightCount == 0) {
					result.correct = 'wrong'
				} else if (rightCount > 0 && rightCount < this.inputs.length) {
					result.correct = 'half'
				} else {
					result.correct = 'right'
				}
				result.answer = answerObj
				result.score = Math.floor(this.questionData.score * rightCount / this.inputs.length)
			},
			submit () {
				let that = this
				let result = {
					answer: null,
					correctOption: this.questionData.answer,
					score: 0,
					correct: 'right'
				}
				that.transFromAnswer(result)
				that.$emit('submit', result)
			},
			finish () {
				this.$emit('finish', {})
			},
			offEvents () {
				Bus.$off('question-submit')
				Bus.$off('question-finish')
			}
		},
		destoryed () {
			this.offEvents()
		}
	}
</script>

<style lang="scss" scope>
	@import "../question.scss";
</style>