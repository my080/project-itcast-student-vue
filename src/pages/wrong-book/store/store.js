'use strict'

const wrongBookStore = {
	state: {
		test: 'dfdfdf'
	},
	mutations: {
		setTest (state, data) {
			state.test = data
		}
	}
}

export default wrongBookStore