'use strict'

const personalStore = {
	state: {
		loginUser: null,
		teacherEmail: null
	},
	mutations: {
		setLoginUser (state, data) {
			state.loginUser = data
		},
		setTeacherEmail (state, data) {
			state.teacherEmail = data
		}
	}
}

export default personalStore