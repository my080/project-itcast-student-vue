
import englishComponents from '../english/config/components.js'
import chineseComponents from '../chinese/config/components.js'
import mathComponents from '../math/config/components.js'
import physicsComponents from '../physics/config/components.js'
import geographyComponents from '../geography/config/components.js'
import historyComponents from '../history/config/components.js'
import chemistryComponents from '../chemistry/config/components.js'

let components = Object.assign(
	englishComponents,
	chineseComponents,
	mathComponents,
	physicsComponents,
	geographyComponents,
	historyComponents,
	chemistryComponents
)

const componentsMixins = {
	components: components
}

export default componentsMixins
