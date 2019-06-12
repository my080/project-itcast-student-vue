'use strict'

const loginStore = {
	state: {
		teacherEmail: null
	},
	mutations: {
		setTeacherEmail (state, data) {
			state.teacherEmail = data
		}
	}
}

export default loginStore