/**
 * 个人中心
 */
const LearnState = r => require.ensure([], () => r(require('@/pages/learn-state/it-index.vue')), 'learn-state')

const learnStateRoutes = [
	{
		path: '/learn-state',
		name: 'learn-state',
		component: LearnState
	}
]

export default learnStateRoutes