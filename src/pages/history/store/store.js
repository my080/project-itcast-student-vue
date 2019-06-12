'use strict'

const historyStore = {
	state: {
		selectExercise: null
	},
	mutations: {
		setSelectExercise (state, data) {
			state.selectExercise = data
		}
	}
}

export default historyStore