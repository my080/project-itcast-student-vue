
/**
 * 主页模块
 */
const Main = r => require.ensure([], () => r(require('@/pages/home/it-main.vue')), 'main')
const Home = r => require.ensure([], () => r(require('@/pages/home/it-index.vue')), 'home')
import personalRoutes from '@/pages/personal/route/route.js'

const mainConfig = {
	path: '/main',
	name: 'main',
	component: Main
}

let childrenRoutes = []

childrenRoutes = childrenRoutes.concat(personalRoutes, [mainConfig])

const homeRoutes = [
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: childrenRoutes
	}
]

export default homeRoutes

