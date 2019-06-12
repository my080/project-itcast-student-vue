'use strict'

const learningReportStore = {
	state: {
		teacherEmail: null
	},
	mutations: {
		setTeacherEmail (state, data) {
			state.teacherEmail = data
		}
	}
}

export default learningReportStore