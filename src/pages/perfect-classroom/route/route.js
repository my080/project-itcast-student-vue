
/**
 * 精品课堂页面
 */
const PerfectClassroom = r => require.ensure([], () => r(require('@/pages/perfect-classroom/it-index.vue')), 'perfect-classroom')

const perfectClassroomRoutes = [
	{
		path: '/perfect-classroom',
		name: 'perfect-classroom',
		component: PerfectClassroom
	}
]

export default perfectClassroomRoutes