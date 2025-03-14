import { defineConfig } from '@morjs/cli'
import path from 'path'
// 这样居然识别报错
// import MorJSPluginResolvePath from 'morjsPlugin/resolvePath'
import MorJSPluginResolvePath from './morjsPlugin/resolvePath'
import {TransformUnsupportTagForAlipayPlugin } from './morjsPlugin/TransformUnsupportTagForAlipayPlugin'
// import MorCompilerPlugin from '@morjs/plugin-compiler'

export default defineConfig([
  {
    name: 'alipay',
    sourceType: 'wechat',
    target: 'alipay',
    alias: {
      '~': path.resolve(__dirname, 'src/')
    },
    plugins: [
      // new MorJSPluginResolvePath()
      new TransformUnsupportTagForAlipayPlugin(),
      // new MorCompilerPlugin()
    ],
    conditionalCompile: {
      // fileExt 支持配置配置单个或多个, 如 { fileExt: '.my' } 或 { fileExt: ['.my', '.share'] }
      // 如配置为多个, 则文件寻址及解析的优先级以实际配置的先后顺序为准
      // 以 { fileExt: ['.my', '.share'] } 为例
      // 优先查找 xxxx.my.xx, 如无则查找 xxxx.share.xx, 如无则查找 xxxx.xx 文件
      fileExt: '.my'
    },
    customEntries: {
      'sourceSubPackage/utils/test': 'src/sourceSubPackage/utils/test.ts'
    }
    // autoInjectRuntime: {
    //   app: true,
    //   page: true,
    //   component: true,
    //   behavior: true,
    //   api: true
    // }
  },
  // 编译目标是alipay时，不能加下面这段
  // {
  //   name: 'wechat',
  //   alias: {
  //     '~': path.resolve(__dirname, 'src/')
  //   },
  //   conditionalCompile: {
  //     fileExt: '.wx'
  //   }
  // }
])