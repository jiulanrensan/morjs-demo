/**
 * 运行时适配
 */
import { Behavior } from '@morjs/runtime-mini/lib/common/behaviorOrMixin'
import {initAdapters} from '@morjs/runtime-mini'
import { createApi } from '@morjs/api'
import { registerComponentAdapters, registerPageAdapters } from '@morjs/core'

export function adaptersToAlipay() {
  initAdapters({
    sourceType: 'wechat',
    target: 'alipay',
    createApi,
    registerComponentAdapters,
    registerPageAdapters
  })
  addDefaultGlobalFields()
}

export function addDefaultGlobalFields() {
  // @ts-ignore
  global.Behavior = Behavior
  /**
   * 神策sdk有使用 __wxConfig __wxAppCode__ 
   */
  Object.assign(global, {
    __wxConfig: {},
    __wxAppCode__: {}
  })
} 

/**
 * 微信小程序的生命周期方法的入参里会有字段
 * query
 * referrerInfo
 * 支付宝没有，要添加默认值，避免报错
 */
export function optionsAddDefaultFields(options) {
  if (!options) return options
  const { qurey, referrerInfo } = options
  return Object.assign(options, { 
    query: qurey ? qurey : {},
    referrerInfo: referrerInfo ? referrerInfo : {}
  })
}