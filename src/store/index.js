'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import state from './state'

import loginStore from '../pages/login/store/store.js'                                                           // 登录模块
import historyStore from '../pages/history/store/store.js'                                                       // 做题历史模块
import homeStore from '../pages/home/store/store.js'                                                             // 首页模块
import exerciseStore from '../pages/exercise/store/store.js'                                                     // 练习模块
import personalStore from '../pages/personal/store/store.js'                                                     // 个人中心模块
import wrongBookStore from '../pages/wrong-book/store/store.js'                                                 // 错题本模块
import perfectClassroomStore from '../pages/perfect-classroom/store/store.js'                                  // 精品课堂模块
import learningReportStore from '../pages/learning-report/store/store.js'                                       // 学情报告模块
import learnStateStore from '../pages/learn-state/store/store.js'                                               // 学习中心模块

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        login: loginStore,
        history: historyStore,
        home: homeStore,
        exercise: exerciseStore,
        personal: personalStore,
        wrongBook: wrongBookStore,
	    perfectClassroom: perfectClassroomStore,
	    learningReport: learningReportStore,
	    learnState: learnStateStore
    }
})

export default store

