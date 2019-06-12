<template>
	<footer>
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18" class="btn-area">
				
				<template v-if="inProgress">
					
					<template v-if="hasAnswered">
						<van-button class="submit-btn" round type="info"
						            @click="submit">
							提交
						</van-button>
					</template>
					
					<template v-else>
						<van-button class="submit-btn" round disabled type="info">
							提交
						</van-button>
					</template>
					
				</template>
				
				<template v-else>
					
					<template v-if="status === 'first'">
						<van-button round class="submit-btn"  type="primary"
						            @click="next">
							下一题
						</van-button>
					</template>
					
					<template v-else-if="status === 'last'">
						<van-button round class="question-btn" type="primary"
						            @click="pre">
							上一题
						</van-button>
						<van-button round class="question-btn"  type="primary"
						            @click="finish">
							完成
						</van-button>
					</template>
					
					<template v-else>
						<van-button round class="question-btn" type="primary"
						            @click="pre">
							上一题
						</van-button>
						<van-button round class="question-btn"  type="primary"
						            @click="next">
							下一题
						</van-button>
					</template>
					
				</template>
				
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</footer>
</template>

<script>
	import { Button, Row, Col } from 'vant';
	import Bus from '../../../../../common/scripts/utils/bus.js'

	export default {
		name: 'it-english-single-footer',
		components: {
			'van-button': Button,
			'van-row': Row,
			'van-col': Col
		},
		props: [ 'progress', 'state' ],
		data () {
			return {
				inProgress: this.$props['progress'] ? this.$props['progress'] : true,
				status: this.$props['state'] ? this.$props['state'] : 'normal',
				hasAnswered: false
			}
		},
		mounted () {
			this.initEvents ()
		},
		methods: {
			initEvents () {
				let that = this
				Bus.$on('status-change', function (options) {
					that.hasAnswered = options.hasAnswered
				})
			},
			change (inProgress, status) {
				this.inProgress = inProgress
				this.status = status
			},
			next () {
				this.$emit('next')
			},
			pre () {
				this.$emit('pre')
			},
			submit () {
				Bus.$emit('question-submit')
			},
			finish () {
				Bus.$emit('question-finish')
			},
			offEvent () {
				Bus.$off('status-change')
			}
		},
		destoryed () {
			this.offEvent()
		}
	}
</script>

<style>

</style>