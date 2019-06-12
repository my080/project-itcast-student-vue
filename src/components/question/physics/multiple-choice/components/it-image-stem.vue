<template>
	<content class="nui-scroll">
		<h3>{{ qIndex }}.{{ questionData.title }}</h3>
		
		<div class="main">
			<small v-for="(item, index) in questionData.stem.content" :key="index">{{ item }}</small>
			
			<img v-if="imageURL" :src="imageURL">
		</div>
		
		<div class="options" :key="optionsKey">
			<template v-for="(value, key) in questionData.options">
				
				<template v-if="hasAnswered">
					
					<template v-if="selected.hasOwnProperty(key)">
						
						<small class="select-right" v-if="selected && answer.correct.hasOwnProperty(key)" :key="key">
							{{ key }}.{{ value }}<van-icon class="icon right-icon" name="success" />
						</small>
						
						<small class="wrong" v-else :key="key">
							{{ key }}.{{ value }} <van-icon class="icon wrong-icon" name="close" />
						</small>
						
					</template>
					
					<template v-else>
						
						<small class="right" v-if="selected && answer.correct.hasOwnProperty(key)" :key="key">
							{{ key }}.{{ value }}<van-icon class="icon right-icon" name="success" />
						</small>
						
						<small v-else :key="key">{{ key }}.{{ value }}</small>
						
					</template>
					
				</template>
				
				<template v-else>
					
					<template class="selected" v-if="selected && selected.hasOwnProperty(key)">
						<van-checkbox v-model="selected[key]" :key="key" @click="selectAnswer(key, value)">
							<small class="selected" >{{ key }}.{{ value }}</small>
						</van-checkbox>
					</template>
					
					<template v-else>
						<van-checkbox :key="key" @click="selectAnswer(key, value)">
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
	import Utils from '../../../../../common/scripts/utils/utils.js'
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
			initData () {
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
			optionsKeyChange () {
				this.optionsKey = this.optionsKey > 1000 ? 0 : this.optionsKey + 1
			},
			tranFormAnswerStatus () {
				if (!this.selected) {
					return
				}
				let count = 0
				for (let key in this.selected) {
					if (this.selected.hasOwnProperty(key)) {
						count = count + 1
					}
				}
				if (count > 0) {
					let options = {
						hasAnswered: true
					}
					Bus.$emit('status-change', options)
				}
			},
			selectAnswer (key, value) {
				if (!this.selected) {
					this.selected = {}
				}
				if (this.selected.hasOwnProperty(key)) {
					delete this.selected[key]
				} else {
					this.selected[key] = value
				}
				this.tranFormAnswerStatus()
				this.optionsKeyChange()
			},
			transFromAnswer (result) {
				let isEqual = Utils.isEqual(this.selected, this.questionData.answer.correct)
				if (isEqual) {
					result.correct = 'right'
					result.score = this.questionData.score
				} else {
					let isHalf = true
					for (let key in this.selected) {
						if (!this.questionData.answer.correct.hasOwnProperty(key)) {
							isHalf = false
							break
						}
					}
					if (isHalf) {
						result.correct = 'half'
						result.score = Math.floor(this.questionData.score / 2)
					} else {
						result.correct = 'wrong'
						result.score = 0
					}
				}
			},
			submit () {
				let that = this
				let result = {
					selected: this.selected,
					correctOption: this.questionData.answer.correct,
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