// app.ts
// global.Symbol = Symbol
// global.Map = Map
// global.Set = Set
import { Behavior } from '@morjs/runtime-mini/lib/common/behaviorOrMixin'
// import { aApp } from '@morjs/core'
// import MorCompilerPlugin from '@morjs/plugin-compiler'
function hackBehavior() {
  // global.Behavior = function (object) {
  //   object.mixins = object.behaviors || [] 
  //   object.behaviors = void 0
  //   return Mixin(object)
  // }
  global.Behavior = Behavior
}

function hackComponent() {
  const origin = Component
  Component = function (object) {
    if (!object.options) object.options = {}
    Object.assign(object.options, {
      lifetimes: true
    })
    object.mixins = object.behaviors || []
    object.behaviors = void 0
    return origin.call(this, object)
  }
}
hackBehavior()
// hackComponent()

App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.setStorageSync('logs', [1,2,3,4,5])
    // 展示本地存储能力
    debugger
    const logs = wx.getStorageSync('logs') || []
    console.log('logs', logs);
    const name = wx.getStorageSync('name') || []
    console.log('name', name);
  },
},
// [
//   () => {
//     return {
//       plugins: [new MorCompilerPlugin()]
//     }
//   }
// ]
)