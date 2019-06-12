
/**
 * 登录模块页面
 */
const ExerciseIndex = r => require.ensure([], () => r(require('@/pages/exercise/it-index.vue')), 'exercise-index')
const ExerciseResult = r => require.ensure([], () => r(require('@/pages/exercise/it-result.vue')), 'exercise-result')
const QuestionCard = r => require.ensure([], () => r(require('@/pages/exercise/it-question-card.vue')), 'question-card')
const DoExercise = r => require.ensure([], () => r(require('@/pages/exercise/it-do-exercise.vue')), 'do-exercise')

const exerciseRoutes = [
	{
		path: '/exercise',
		name: 'exercise',
		component: ExerciseIndex,
		children: []
	},
	{
		path: '/exercise-result',
		name: 'exercise-result',
		component: ExerciseResult
	},
	{
		path: '/question-card',
		name: 'question-card',
		component: QuestionCard
	},
	{
		path: '/do-exercise',
		name: 'do-exercise',
		component: DoExercise
	}
]

export default exerciseRoutes

