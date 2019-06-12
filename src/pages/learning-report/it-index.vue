<template>
	<div class="learning-report">
		
		<van-nav-bar class="nav-bar fixed"
		             left-arrow
		             :title="navTitle"
		             @click-left="onClickLeft">
		</van-nav-bar>
		
		<content>
			<div id="myChart" ref="myChart"></div>
			
			<div id="subjectChart" ref="subjectChart"></div>
		</content>
		
	</div>
</template>

<script>
	import Echarts from 'echarts'
	import SessionStorage from '../../common/scripts/storage/promise/session-storage.js'
	import questionReportOption from './pojo/question-report-option.js'
	import subjectReportOption from './pojo/subject-report-option.js'
	import LearnReportService from './service/learn-report-service.js'
	import { NavBar } from 'vant'

	export default {
		name: 'learning-report',
		components: {
			'van-nav-bar': NavBar
		},
		beforeCreate () {
			this.service = new LearnReportService()
		},
		data () {
			return {
				navTitle: '学情报告',
				user: null
			}
		},
		mounted () {
			this.init()
		},
		methods: {
			init () {
				let that = this
				SessionStorage.get('loginUser')
					.then(that.getLoginUserSuccess, that.getLoginUserError)                                             // 从 sessionStorage 中获取登录用户信息
					.then(that.questionReportSuccess, that.requestError)                                                // 学习情况统计
					.then(that.subjectReportSuccess, that.requestError)                                                 // 学科情况统计
			},
			getLoginUserError (err) {
				if (err) {
					this.$toast('用户登录状态已过期！')
				}
			},
			getLoginUserSuccess (data) {
				let that = this
				that.user = data.data
				let options = {
					id: that.user.id
				}
				return that.service.questionReport(options)
			},
			requestError (err) {
				if (err) {
					this.$toast('服务异常，请与客服联系！')
				}
			},
			subjectReportSuccess (data) {
				if (data) {
					let englishMax = 30;
					let mathMax = 30;
					let chineseMax = 30;
					let physicsMax = 30;
					let chemistryMax = 30;
					let otherMax = 30;
					
					let otherCount = 0
					let otherStartCount = 0
					let otherUnStartCount = 0
					
					let startArray = [0, 0, 0, 0, 0, 0]
					let unStartArray = [0, 0, 0, 0, 0, 0]
					
					for (let key in data.data) {
						let subject = data.data[key]
						switch (subject.name) {
							case '英语':
								if (englishMax < subject.total) {
									englishMax = subject.total
								}
								startArray[0] = subject.start
								unStartArray[0] = subject.unStart
								break;
							case '数学':
								if (mathMax < subject.total) {
									mathMax = subject.total
								}
								startArray[1] = subject.start
								unStartArray[1] = subject.unStart
								break;
							case '语文':
								if (chineseMax < subject.total) {
									chineseMax = subject.total
								}
								startArray[2] = subject.start
								unStartArray[2] = subject.unStart
								break;
							case '物理':
								if (physicsMax < subject.total) {
									physicsMax = subject.total
								}
								startArray[3] = subject.start
								unStartArray[3] = subject.unStart
								break;
							case '化学':
								if (chemistryMax < subject.total) {
									chemistryMax = subject.total
								}
								startArray[4] = subject.start
								unStartArray[4] = subject.unStart
								break;
							default:
								otherCount = subject.total + otherCount
								otherStartCount = subject.start
								otherUnStartCount = subject.unStart
						}
					}
					
					if (otherCount > otherMax) {
						otherMax = otherCount
					}

					startArray[5] = otherStartCount
					unStartArray[5] = otherUnStartCount

					let startObj = {
						value: startArray,
						name : '已进行'
					}
					
					let unStartObj = {
						value: unStartArray,
						name : '未进行'
					}

					let subjectOptionData = [
						startObj,
						unStartObj
					]
					
					let subjectOptionIndicator = [
						{
							name: '英语',
							max: englishMax
						},
						{
							name: '数学',
							max: mathMax
						},
						{
							name: '语文',
							max: chineseMax
						},
						{
							name: '物理',
							max: physicsMax
						},
						{
							name: '化学',
							max: chemistryMax
						},
						{
							name: '其他',
							max: otherMax
						}
					]

					subjectReportOption['radar']['indicator'] = subjectOptionIndicator
					subjectReportOption['series'][0]['data'] = subjectOptionData
					this.subjectReport()
				}
			},
			questionReportSuccess (data) {
				if (data) {
					let questionOptionData = [
						{
							name: '全对',
							value: data.data.right
						},
						{
							name: '半对',
							value: data.data.half
						},
						{
							name: '错误',
							value: data.data.wrong
						},
						{
							name: '未进行',
							value: data.data.unStart
						}
					]
					questionReportOption.series[0].data = questionOptionData
					this.questionReport()
				}
				let options = {
					id: this.user.id
				}
				return this.service.subjectReport(options)
			},
			onClickLeft () {
				this.$router.push('/home')
			},
			questionReport () {
				// 实例化echarts对象
				let myChart = Echarts.init(this.$refs.myChart)
				// 绘制条形图
				myChart.setOption(questionReportOption)
			},
			subjectReport () {
				// 实例化echarts对象
				let subjectChart = Echarts.init(this.$refs.subjectChart)
				// 绘制条形图
				subjectChart.setOption(subjectReportOption)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './learn-report.scss';
	
	.fixed {
		position: fixed !important;
	}
</style>