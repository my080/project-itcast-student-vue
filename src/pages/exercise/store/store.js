'use strict'

const exerciseStore = {
	state: {
		options: null,
		questions: null,
		userResult: null,
		type: null
	},
	mutations: {
		setOptions (state, data) {
			state.options = data
		},
		setQuestions (state, data) {
			state.questions = data
		},
		setUserResult (state, data) {
			state.userResult = data
		},
		setType (state, data) {
			state.type = data
		}
	}
}

export default exerciseStore