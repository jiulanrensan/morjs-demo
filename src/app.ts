// app.ts
// global.Symbol = Symbol
// global.Map = Map
// global.Set = Set

/* #ifdef alipay */
import { adaptersToAlipay, optionsAddDefaultFields } from './adapters/adaptersToAlipay';
adaptersToAlipay()
/* #endif */

import { formatTime } from '~/utils/util'

// @ts-ignore
const test = __non_webpack_require__.async('./sourceSubPackage/utils/test')
App<IAppOption>({
  globalData: {},
  onLaunch() {
    console.log('format', formatTime(new Date()));
    wx.setStorageSync('logs', [1,2,3,4,5])
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    console.log('logs', logs);
    const name = wx.getStorageSync('name') || []
    /* #ifdef alipay */
    console.log('name alipay', name);
    /* #endif */
    /* #ifdef wechat */
    console.log('name wechat', name);
    /* #endif */
    test.then(res => {
      res.print('test')
      console.log('test res');
    })
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