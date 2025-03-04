import { defineConfig } from '@morjs/cli'
import path from 'path'
// 这样居然识别报错
// import MorJSPluginResolvePath from 'morjsPlugin/resolvePath'
import MorJSPluginResolvePath from './morjsPlugin/resolvePath'
import {TransformUnsupportTagForAlipayPlugin } from './morjsPlugin/TransformUnsupportTagForAlipayPlugin'

export default defineConfig([
  {
    name: 'wechat',
    sourceType: 'wechat',
    target: 'alipay',
    alias: {
      '~': path.resolve(__dirname, 'src/')
    },
    plugins: [
      // new MorJSPluginResolvePath()
      new TransformUnsupportTagForAlipayPlugin()
    ],
    autoInjectRuntime: {
      app: true,
      page: true,
      component: true,
      behavior: true,
      api: true
    }
  }
])