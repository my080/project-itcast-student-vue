
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ 罗马数字 1,2,3,4,5,6,7,8,9,10

const MultipleChoice = r => require.ensure([], () => r(require('@/components/question/physics/multiple-choice/it-question.vue')), 'multiple-choice')
const ImageMultipleChoice = r => require.ensure([], () => r(require('@/components/question/physics/multiple-choice/it-image-question.vue')), 'image-multiple-choice')
const Completion = r => require.ensure([], () => r(require('@/components/question/physics/completion/it-question.vue')), 'completion')
const ImageCompletion = r => require.ensure([], () => r(require('@/components/question/physics/completion/it-image-question.vue')), 'image-completion')
const SingleChoice = r => require.ensure([], () => r(require('@/components/question/physics/single-choice/it-question.vue')), 'single-choice')
const ImageSingleChoice = r => require.ensure([], () => r(require('@/components/question/physics/single-choice/it-image-question.vue')), 'image-single-choice')

const physicsQuestion = {
	'it-physics-multiple-choice-I-I': MultipleChoice,                                                              // 多项选择题
	'it-physics-multiple-choice-I-II': ImageMultipleChoice,                                                        // 附带图片内容的多项选择题
	'it-physics-completion-I-I': Completion,                                                                       // 填空题
	'it-physics-completion-I-II': ImageCompletion,                                                                 // 附带图片内容的填空题
	'it-physics-single-choice-I-I': SingleChoice,                                                                  // 单项选择题
	'it-physics-single-choice-I-II': ImageSingleChoice                                                             // 附带图片的单项选择题
}

export default physicsQuestion
