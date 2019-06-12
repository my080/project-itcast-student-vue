<template>
	<content>
		<h3>{{ qIndex }}.{{ questionData.title }}</h3>
		
		<main>
			<small v-for="(item, index) in questionData.stem.content" :key="index">{{ item }}</small>
			
			<img v-if="imageURL" :src="imageURL" width="300px">
		</main>
		
		<div class="options">
			<template v-for="(value, key) in questionData.options">
				
				<template v-if="hasAnswered">
					
					<template v-if="selected === answer.correct">
						
						<small class="right" v-if="selected && key === selected" :key="key">
							{{ key }}.{{ value }}<van-icon class="icon right-icon" name="success" />
						</small>
						
						<small v-else :key="key">{{ key }}.{{ value }}</small>
					
					</template>
					
					<template v-else>
						
						<small class="right" v-if="selected && answer.correct === key" :key="key">
							{{ key }}.{{ value }}<van-icon class="icon right-icon" name="success" />
						</small>
						
						<small class="wrong" v-else-if="selected && key === selected" :key="key">
							{{ key }}.{{ value }}<van-icon class="icon wrong-icon" name="close" />
						</small>
						
						<small v-else :key="key">{{ key }}.{{ value }}</small>
					
					</template>
				
				</template>
				
				<template v-else>
					<template v-if="selected && key === selected">
						<van-checkbox v-model="selected" :key="key" @click="selectAnswer(key)">
							<small class="selected" >{{ key }}.{{ value }}</small>
						</van-checkbox>
					</template>
					<template v-else>
						<van-checkbox :key="key" @click="selectAnswer(key)">
							<small>{{ key }}.{{ value }}</small>
						</van-checkbox>
					</template>
				</template>
			
			</template>
		</div>
	</content>
</template>

<script>
	import { Icon, Checkbox } from 'vant'
	import Bus from '../../../../../common/scripts/utils/bus.js'

	export default {
		name: 'it-english-single-stem',
		components: {
			'van-icon': Icon,
			'van-checkbox': Checkbox
		},
		props: [ 'question', 'index' ],
		data () {
			return {
				questionData: this.$props['question'],
				qIndex: this.$props['index'],
				selected: null,
				answer: null,
				hasAnswered: false,
				optionsKey: 0,
				imageURL: null
			}
		},
		created () {
			this.initData()
			this.initEvents()
		},
		methods: {
			initData() {
				this.answer = this.questionData.answer
				this.imageURL = require('@/assets/images/' + this.questionData.files.images[0])
			},
			initEvents () {
				let that = this
				Bus.$on('question-submit', function () {
					that.hasAnswered = true
					that.submit()
				})
				Bus.$on('question-finish', function () {
					that.finish()
				})
			},
			submit () {
				let that = this
				let result = {
					selected: this.selected,
					correctOption: this.questionData.answer.correct,
					score: 0,
					correct: false
				}
				if (this.selected === this.questionData.answer.correct) {
					result.correct = true
					result.score = this.questionData.score
				}
				that.$emit('submit', result)
			},
			selectAnswer (key) {
				this.selected = key
				if (this.selected) {
					let options = {
						hasAnswered: true
					}
					Bus.$emit('status-change', options)
				}
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

<style>
	@import "../question.scss";
</style>