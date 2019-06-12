<template>
	<div class="it-math-single-choice-I-I">
		<it-stem :question="questionData" :index="qIndex" @submit="submit" @finish="finish"></it-stem>
		<it-footer ref="footerRef" :progress="isInProgress" :status="status"
		            @next="next" @pre="pre"></it-footer>
	</div>
</template>

<script>
	import Stem from './components/it-stem.vue'
	import Footer from './components/it-footer.vue'
	
	export default {
		name: 'it-math-single-choice-I-I',
		components: {
			'it-stem': Stem,
			'it-footer': Footer
		},
		props: [ 'question', 'index', 'total' ],
		data () {
			return {
				questionData: this.$props['question'],
				qIndex: this.$props['index'],
				qTotal: this.$props['total'],
				status: 'first',
				footerRef: null,
				isInProgress: true
			}
		},
		created () {
			this.init()
		},
		mounted () {
			this.footerRef = this.$refs.footerRef
		},
		methods: {
			init () {
				if (this.qIndex <= 1) {
					this.status = 'first'
				} else if (this.qIndex >= this.qTotal) {
					this.status = 'last'
				} else {
					this.status = 'normal'
				}
			},
			next () {
				this.$emit('next')
			},
			pre () {
				this.$emit('pre')
			},
			submit (data) {
				this.isInProgress = false
				if (this.qIndex <= 1) {
					this.status = 'first'
				}
				if (this.qIndex >= this.qTotal) {
					this.status = 'last'
				}
				this.footerRef.change(this.isInProgress, this.status)
				this.$emit('submit', data)
			},
			finish (data) {
				this.$emit('finish', data)
				this.$router.push('/exercise-result')
			}
		}
	}
</script>

<style lang="scss">
	@import "./question.scss";
</style>