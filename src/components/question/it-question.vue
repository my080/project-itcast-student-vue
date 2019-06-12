<template>
	<div class="question">
		<component v-if="isInit"
		           :is="componentName" :question="questionData" :index="index" :total="total"
		           @next="next" @pre="pre" @submit="submit" @finish="finish" @refresh="refresh">
		</component>
	</div>
</template>

<script>
	import mixins from './config/components-mixins.js'
	import Question from './config/question.js'
	
	export default {
		name: 'question',
		mixins: [ mixins ],
		props: [ 'options' ],
		data () {
			return {
				optionsData: this.$props['options'],
				componentName: null,
				level: null,
				questionData: null,
				index: null,
				total: 0,
				isInit: false
			}
		},
		created () {
			this.question = new Question()
		},
		mounted () {
			this.init()
		},
		methods: {
			init () {
				this.initData()
				this.initComponents()
				this.isInit = true
			},
			initData () {
				if (this.optionsData) {
					this.level = this.optionsData.hasOwnProperty('level') && this.optionsData.level ? this.optionsData.level : 1
					this.index = this.optionsData.hasOwnProperty('index') && this.optionsData.index ? this.optionsData.index : 1
					this.questionData = this.optionsData.hasOwnProperty('question') && this.optionsData.question ?
						this.optionsData.question : null
					this.total = this.optionsData.total
				}
			},
			initComponents () {
				if (this.questionData) {
					let code = this.questionData.code
					this.componentName = this.question.match(code)
				}
			},
			next () {
				this.$emit('next')
			},
			pre () {
				this.$emit('pre')
			},
			refresh () {
				this.$emit('refresh')
			},
			submit (data) {
				this.$emit('submit', data)
			},
			finish (data) {
				this.$emit('finish', data)
			}
		}
	}
</script>

<style lang="scss">
	@import "./question.scss";
</style>