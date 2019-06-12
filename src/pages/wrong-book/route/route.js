
/**
 * 登录模块页面
 */
const WrongBook = r => require.ensure([], () => r(require('@/pages/wrong-book/it-index.vue')), 'wrong-book')


const wrongBookRoutes = [
	{
		path: '/wrong-book',
		name: 'wrong-book',
		component: WrongBook,
		children: []
	}
]

export default wrongBookRoutes

