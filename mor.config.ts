import { defineConfig } from '@morjs/cli'
// 这样居然识别报错
// import MorJSPluginResolvePath from 'morjsPlugin/resolvePath'
import MorJSPluginResolvePath from './morjsPlugin/resolvePath'


export default defineConfig([
  {
    name: 'wechat',
    sourceType: 'wechat',
    target: 'alipay',
    // 对app.json 的 resolveAlias没有作用
    // alias: {
    //   '~': 'src'
    // },
    plugins: [
      new MorJSPluginResolvePath()
    ],
    
  }
])