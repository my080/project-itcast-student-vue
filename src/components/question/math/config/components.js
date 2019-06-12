
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

const SingleChoice = r => require.ensure([], () => r(require('@/components/question/math/single-choice/it-question.vue')), 'single-choice')
const SingleImageChoice = r => require.ensure([], () => r(require('@/components/question/math/single-choice/it-image-question.vue')), 'single-image-choice')
const Completion = r => require.ensure([], () => r(require('@/components/question/math/completion/it-question.vue')), 'completion')
const ImageCompletion = r => require.ensure([], () => r(require('@/components/question/math/completion/it-image-question.vue')), 'image-completion')

const mathQuestion = {
	'it-math-single-choice-I-I': SingleChoice,                                                                     // 单项选择题
	'it-math-single-choice-I-II': SingleImageChoice,                                                               // 附图的单项选择题
	'it-math-completion-I-I': Completion,                                                                           // 填空题
	'it-math-completion-I-II': ImageCompletion                                                                      // 附图的填空题
}

export default mathQuestion
