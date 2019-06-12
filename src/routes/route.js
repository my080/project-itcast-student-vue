import Vue from 'vue'
import Router from 'vue-router'
import routeConfig from './route-config.js'
import SessionStorage from '../common/scripts/storage/promise/session-storage.js'

/**
 * 各个模块的路由配置
 */
import loginRoutes from '@/pages/login/route/route.js'
import historyRoutes from '@/pages/history/route/route.js'
import homeRoutes from '@/pages/home/route/route.js'
import exerciseRoutes from '@/pages/exercise/route/route.js'
import wrongBookRoutes from '@/pages/wrong-book/route/route.js'
import perfectClassroomRoutes from '@/pages/perfect-classroom/route/route.js'
import learningReportRoutes from '@/pages/learning-report/route/route.js'
import learningStateRoutes from '@/pages/learn-state/route/route.js'

Vue.use(Router)

let routes = []

routes = routes.concat(
	loginRoutes,
	historyRoutes,
	homeRoutes,
	exerciseRoutes,
	wrongBookRoutes,
	perfectClassroomRoutes,
	learningReportRoutes,
	learningStateRoutes
)

let router = new Router({
	routes: routes,
})

/**
 * 路由过滤器
 */
router.beforeEach((to, from, next) => {
	if (routeConfig.excepts.includes(to.path)) {
		next()
	} else {
		SessionStorage.get('loginUser').then(function (data) {
			if (data) {
				next()
			} else {
				next('/')
			}
		})
	}
})

export default router
