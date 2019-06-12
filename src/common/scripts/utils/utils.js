
class Utils {
	constructor () {

	}

	static isEqual (obj1, obj2) {
		let o1 = obj1 instanceof Object
		let o2 = obj2 instanceof Object
		if (!o1 || !o2) {/*  判断不是对象  */
			return obj1 === obj2
		}
		if (Object.keys(obj1).length !== Object.keys(obj2).length) {
			return false
			// Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"]console.log(Object.keys(arr))->0,1,2
		}
		for(let attr in obj1){
			let t1 = obj1[attr] instanceof Object
			let t2 = obj2[attr] instanceof Object
			if (t1 && t2) {
				return Utils.isEqual(obj1[attr], obj2[attr])
			} else if(obj1[attr] !== obj2[attr]) {
				return false
			}
		}
		return true
	}
}

export default Utils
