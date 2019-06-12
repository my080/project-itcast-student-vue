
import LoginService from '../service/login-service.js'

/**
 * 登录模块页面
 */
const ToLogin = r => require.ensure([], () => r(require('@/pages/login/it-to-login.vue')), 'to-login')
const Login = r => require.ensure([], () => r(require('@/pages/login/it-login.vue')), 'login')
const FindPassword = r => require.ensure([], () => r(require('@/pages/login/it-find-password.vue')), 'find-password')
const CheckSuccess = r => require.ensure([], () => r(require('@/pages/login/it-check-success.vue')), 'check-success')
const JoinClass = r => require.ensure([], () => r(require('@/pages/login/it-join-class.vue')), 'join-class')
const Register = r => require.ensure([], () => r(require('@/pages/login/it-register.vue')), 'register')
const ResetPassword = r => require.ensure([], () => r(require('@/pages/login/it-reset-password.vue')), 'reset-password')
const RelateTeacher = r => require.ensure([], () => r(require('@/pages/login/it-relate-teacher.vue')), 'relate-teacher')
const StudentInfo = r => require.ensure([], () => r(require('@/pages/login/it-student-info.vue')), 'student-info')
const SendEmailSuccess = r => require.ensure([], () => r(require('@/pages/login/it-send-email-success.vue')), 'send-email-success')
const ActivateSuccess = r => require.ensure([], () => r(require('@/pages/login/it-activate-success.vue')), 'activate-success')
const ResetSuccess = r => require.ensure([], () => r(require('@/pages/login/it-reset-success.vue')), 'reset-success')

let loginService = new LoginService()

let tranFormCode = function (to, from, next) {
	if (to.query.hasOwnProperty('code')) {
		let code = to.query.code
		let id = to.query.id
		let param = {
			id: id,
			code: code
		}
		loginService.getUserCount(param).then(function (data) {
			if (!data.data && data.data < 0) {
				next('/')
			} else {
				next()
			}
		}, function () {
			next('/')
		})
	} else {
		next('/')
	}
}

let tranFormResetPassword = function (to, from, next) {
	if (to.query.hasOwnProperty('code')) {
		let code = to.query.code
		let email = to.query.email
		let param = {
			email: email,
			code: code
		}
		loginService.getUserCount(param).then(function (data) {
			if (!data.data && data.data < 0) {
				next('/')
			} else {
				next()
			}
		}, function () {
			next('/')
		})
	} else {
		next('/')
	}
}

const loginRoutes = [
	{
		path: '/',
		name: 'login',
		component: Login,
		children: []
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		children: []
	},
	{
		path: '/to-login',
		name: 'to-login',
		component: ToLogin
	},
	{
		path: '/find-password',
		name: 'find-password',
		component: FindPassword
	},
	{
		path: '/check-success',
		name: 'check-success',
		component: CheckSuccess
	},
	{
		path: '/join-class',
		name: 'join-class',
		component: JoinClass
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/send-email-success',
		name: 'send-email-success',
		component: SendEmailSuccess
	},
	{
		path: '/reset-password',
		name: 'reset-password',
		component: ResetPassword,
		beforeEnter: function (to, from, next) {
			tranFormResetPassword(to, from, next)
		}
	},
	{
		path: '/relate-teacher',
		name: 'relate-teacher',
		component: RelateTeacher
	},
	{
		path: '/student-info',
		name: 'student-info',
		component: StudentInfo
	},
	{
		path: '/activate-success',
		name: 'activate-success',
		component: ActivateSuccess,
		beforeEnter: function (to, from, next) {
			tranFormCode(to, from, next)
		}
	},
	{
		path: '/reset-success',
		name: 'reset-success',
		component: ResetSuccess
	}
]

export default loginRoutes

