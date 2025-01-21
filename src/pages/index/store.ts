// store.js
import { observable, action } from 'mobx-miniprogram'

// 创建 store 时可以采用任何 mobx 的接口风格
// 这里以传统的 observable 风格为例

export const indexStore = observable({
  // 数据字段
  numA: 1,
  numB: 2,

  // 计算属性
  get sum() {
    return this.numA + this.numB
  },

  // actions
  update: action(function (numA, numB) {
    this.numA = numA
    this.numB = numB
  }),
})