
/**
 * 个人中心
 */
const PersonalIndex = r => require.ensure([], () => r(require('@/pages/personal/it-index.vue')), 'personal-index')
const Information = r => require.ensure([], () => r(require('@/pages/personal/it-information.vue')), 'personal-information')
const Classroom = r => require.ensure([], () => r(require('@/pages/personal/it-classroom.vue')), 'personal-classroom')
const ChangeClass = r => require.ensure([], () => r(require('@/pages/personal/it-change-class.vue')), 'change-class')
const Students = r => require.ensure([], () => r(require('@/pages/personal/it-students.vue')), 'students')
const ChangeTeacher = r => require.ensure([], () => r(require('@/pages/personal/it-change-teacher.vue')), 'change-teacher')

const personalRoutes = [
	{
		path: '/personal',
		name: 'personal',
		component: PersonalIndex
	},
	{
		path: '/personal-information',
		name: 'personal-information',
		component: Information
	},
	{
		path: '/personal-classroom',
		name: 'personal-classroom',
		component: Classroom
	},
	{
		path: '/students',
		name: 'students',
		component: Students
	},
	{
		path: '/change-teacher',
		name: 'change-teacher',
		component: ChangeTeacher
	},
	{
		path: '/change-class',
		name: 'change-class',
		component: ChangeClass
	}
]

export default personalRoutes

