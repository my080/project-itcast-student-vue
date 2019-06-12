
/**
 * 学情报告主页
 */
const LearningReport = r => require.ensure([], () => r(require('@/pages/learning-report/it-index.vue')), 'learning-report')

const learningReportRoutes = [
	{
		path: '/learning-report',
		name: 'learning-report',
		component: LearningReport
	}
]

export default learningReportRoutes

