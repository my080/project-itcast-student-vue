'use strict'

const learnStateStore = {
	state: {
		test: 'dfdfdf'
	},
	mutations: {
		setTest (state, data) {
			state.test = data
		}
	}
}

export default learnStateStore