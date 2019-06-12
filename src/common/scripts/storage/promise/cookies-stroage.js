
import Storage from '../storage.js'

/**
 * 操作 cookies 的工具类，封装操作 cookies
 * @author 周亮
 * @createDate 2018-6-4
 */
class CookiesStorage extends Storage {

  static set (key, value, days) {
      let promise = new Promise(function (resolve, reject) {
	      try {
		      let d = new Date();
		      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
		      window.document.cookie = key + '=' + value + ';path=/;expires=' + d.toGMTString();
		      resolve()
	      } catch (e) {
		      reject(e)
	      }
      })
      return promise
  }

  static get (key) {
      let promise = new Promise(function (resolve, reject) {
	      try {
		      let value = window.document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
		      if (resolve) {
			      resolve(value)
		      }
	      } catch (e) {
		      reject(e)
	      }
      })
      return promise
  }

  static remove (key) {
      let promise = new Promise(function (resolve, reject) {
	      try {
		      CookiesStorage.set(key, '', -1)
		      resolve()
	      } catch (e) {
		      reject(e)
	      }
      })
      return promise
  }

  static clear () {
      let promise = new Promise(function (resolve, reject) {
	      try {
              let keys = document.cookie.match(/[^ =;]+(?=\\=)/g);
              if (keys) {
                  for (let i = keys.length; i--;) {
                      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
                  }
              }
		      resolve()
	      } catch (e) {
		      reject(e)
	      }
      })
      return promise
  }

  static has (key) {
      let isContain = false;
      let keys = document.cookie.match(/[^ =;]+(?=\\=)/g);
      if (keys && keys.length > 0) {
          for (let i = 0; i < keys.length; i++) {
              if (keys[i] === key) {
                  isContain = true;
              }
          }
      }
      return isContain
  }

}

export default CookiesStorage
