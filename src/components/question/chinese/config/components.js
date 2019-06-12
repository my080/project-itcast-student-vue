
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

// const MultipleChoice = r => require.ensure([], () => r(require('@/components/question/chinese/multiple-choice/it-question.vue')), 'multiple-choice')
const SingleChoice = r => require.ensure([], () => r(require('@/components/question/chinese/single-choice/it-question.vue')), 'multiple-choice')
const Completion = r => require.ensure([], () => r(require('@/components/question/chinese/completion/it-question.vue')), 'multiple-choice')

const chineseQuestion = {
	// 'it-chinese-multiple-choice-I-I': MultipleChoice,                                                              // 多项选择题
	'it-chinese-single-choice-I-I': SingleChoice,                                                                  // 单项选择题
	'it-chinese-completion-I-I': Completion                                                                         // 填空题
}

export default chineseQuestion
