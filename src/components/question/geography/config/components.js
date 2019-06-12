
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

const SingleChoice = r => require.ensure([], () => r(require('@/components/question/geography/single-choice/it-question.vue')), 'single-choice')
const SingleImageChoice = r => require.ensure([], () => r(require('@/components/question/geography/single-choice/it-image-question.vue')), 'single-image-choice')
const Completion = r => require.ensure([], () => r(require('@/components/question/geography/completion/it-question.vue')), 'completion')
const ImageCompletion = r => require.ensure([], () => r(require('@/components/question/geography/completion/it-image-question.vue')), 'image-completion')

const geographyQuestion = {
	'it-geography-single-choice-I-I': SingleChoice,                                                                // 单项选择题
	'it-geography-single-choice-I-II': SingleImageChoice,                                                          // 附图的单项选择题
	'it-geography-completion-I-I': Completion,                                                                     // 单项选择题
	'it-geography-completion-I-II': ImageCompletion                                                                // 附图的单项选择题
}

export default geographyQuestion
