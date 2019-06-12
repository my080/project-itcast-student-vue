<template>
	<footer>
		
		<h3 v-if="recorderSuccess">recorder success</h3>
		
		<van-row class="btn-row" type="flex">
			<van-col span="3"></van-col>
			
			<van-col span="18" class="btn-area">
				
				<template v-if="inProgress">
					<span class="icon iconfont icon-luyin record" :class="isRecoding ? 'record-touch' : ''"
					      @touchstart="startRecord" @touchend="endRecord"></span>
				</template>
				
				<template v-else>
					
					
					<span class="icon iconfont icon-bofang5 sound"
					      v-if="isBroadcasting" @click="startBroadcast"></span>
					<span class="icon iconfont icon-zanting sound"
					      v-else @click="endBroadcast"></span>
					<span class="icon iconfont icon-icon_duihao-mian next-btn"
					      @click="next"></span>
					<span class="icon iconfont icon-shuaxin refresh"
					      @click="refresh"></span>
					
				</template>
				
			</van-col>
			
			<van-col span="3"></van-col>
		</van-row>
	</footer>
</template>

<script>
	import Wox from '../../../../../common/scripts/utils/wox.js'
	import { Row, Col } from 'vant';
	import Bus from '../../../../../common/scripts/utils/bus.js'

	export default {
		name: 'it-english-single-footer',
		components: {
			'van-row': Row,
			'van-col': Col
		},
		props: [ 'progress', 'state' ],
		data () {
			return {
				inProgress: this.$props['progress'] ? this.$props['progress'] : true,
				status: this.$props['state'] ? this.$props['state'] : 'normal',
				hasAnswered: false,
				isRecoding: false,
				isBroadcasting: true,
				recorderSuccess: false
			}
		},
		mounted () {
			this.initEvents ()
			this.wox = new Wox(this)
		},
		methods: {
			initEvents () {
				let that = this
				Bus.$on('status-change', function (options) {
					that.hasAnswered = options.hasAnswered
				})
			},
			startRecord () {
				this.isRecoding = true
				let data = {}
				Wox.startRecorder(data)
			},
			endRecord () {
				let that = this
				this.isRecoding = false
				let id = "endRecorder"
				let success = function (data) {
					that.inProgress = false
					console.log(data)
				}
				let error = function (err) {
					that.inProgress = false
					console.log(err)
				}
				let data = {}
				Wox.endRecorder(data, id, success, error)
			},
			showRecorderSuccess () {
				this.recorderSuccess = true
			},
			startBroadcast () {
				this.isBroadcasting = false
				let data = {}
				Wox.play(data)
			},
			endBroadcast () {
				this.isBroadcasting = true
			},
			change (inProgress, status) {
				this.inProgress = inProgress
				this.status = status
			},
			refresh () {
				this.$emit('refresh')
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

<style lang="scss" scoped>
	@import "../../../../../common/icons/iconfont.css";
	@import "./footer.scss";
	
	footer {
		height: 200px;
	}
</style>