'use strict'

export const fun = ({commit}) => {
  commit({
    type: 'getMsg',
    msg: '我是修改后的数据...',
    home: []
  })
}
