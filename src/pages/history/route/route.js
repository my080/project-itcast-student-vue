
/**
 * 登录模块页面
 */
const HistoryIndex = r => require.ensure([], () => r(require('@/pages/history/it-index.vue')), 'history-index')
const ExerciseInfo = r => require.ensure([], () => r(require('@/pages/history/it-exercise-info.vue')), 'exercise-info')

const historyRoutes = [
	{
		path: '/history',
		name: 'history',
		component: HistoryIndex,
		children: []
	},
	{
		path: '/exercise-info',
		name: 'exercise-info',
		component: ExerciseInfo
	},
]

export default historyRoutes

