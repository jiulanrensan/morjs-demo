import b1 from '../../behavior/b1'
/**
 * 先缓存Component参数(简称 compParams)
 * b1 作为对象传入，b1 的 definitionFilter的第一个参数是 compParams, 第二个参数是 b1.behaviors
 */
Component({
  behaviors: [b1],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    displayStyle: ''
  },
  lifetimes: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
  },
})
