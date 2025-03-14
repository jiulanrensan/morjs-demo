## 记录转换过程中的坑

### 无法识别路径
似乎只能识别相对路径，以下两种无法识别
1. 在app.json里配置的`resolveAlias`无法识别
2. index.json里配置的`path/to/file`，`/path/to/file`无法识别

### 无法生成正确的支付宝小程序json
app.json
```json
{
  "pages": [],
   "subPackages": [],
   "window": {},
   "tabBar": {},
   "component2": true,
   "enableAppxNg": true,
   "enableNodeModuleBabelTransform": true,
   "subPackageBuildType": "shared",
   "usingComponents": {
   }
}
```
mini.project.json
```json
{
  "format": 2,
  "compileOptions": {
    "component2": true,
    "enableNodeModuleBabelTransform": true
  }
}
```

### 支付宝小程序不支持通过`Component`来构造页面
见[社区](https://open.alipay.com/portal/forum/post/29501028)

wxapp项目中有 3 处使用`Component`构造页面,有 2 处使用`ComponentWithStore`构造页面
vscode搜索如下
```
// search
Component(

// search
ComponentWithStore

// files to exclude
components,component,componentsSubPackage,, miniprogram_npm,sourceSubPackage
```

ComponentWithStore

### mobx报错`Error: [MobX] MobX requires global 'Symbol' to be available or polyfilled`

也搜到相关问题：
https://github.com/NervJS/taro/issues/14090
https://github.com/NervJS/taro/issues/12979

搜到一个[解决方法](https://github.com/NervJS/taro/issues/12979#issuecomment-1365019553)吗，但我还是报错。

最后我的解决方法是：
参考[文档](https://opendocs.alipay.com/mini/framework/implementation-detail)，基础库升级到2.9.3，`app.json`添加
```json
{
  "globalObjectMode": "enable",
  "requirePolyfill": true
}
```

简单来说，支付宝小程序默认不对执行环境做任何处理，有些内置对象无法访问... todo


### mobx报错`ReferenceError: Behavior is not defined`
框架不会转换依赖里的函数
```ts
global.Behavior = Behavior
```

### customTabBar
```json
// app.json
"usingComponents": {
  // 之前是使用，这样会报错
  "custom-tab-bar": "/components/customTabBar/index",
  // 改为这个就好了
 "pagoda-custom-tab-bar": "/components/customTabBar/index"
}
```
根目录下新增`customize-tab-bar`目录，这个是支付宝小程序自定义tabbar要求

### 条件编译
* [文件维度](https://mor.ele.me/guides/conditional-compile/file-level)
* [代码维度](https://mor.ele.me/guides/conditional-compile/code-level)

文件维度需要添加配置：
```ts
// mor.config.ts
export default defineConfig([
  {
    name: 'alipay',
    sourceType: 'wechat',
    target: 'alipay',
    // 添加文件后缀
    // 优先查找 xxxx.my.xx, 如无则查找 xxxx.xx 文件
    conditionalCompile: {
      fileExt: '.my'
    },
  },
])
```


### 分包异步化
[文档](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/async.html)

#### 跨分包 JS 代码引用

morjs框架里有一个webpack Plugin [`DynamicRequireSupportPlugin`](https://github.com/eleme/morjs/blob/main/packages/plugin-compiler/src/plugins/dynamicRequireSupportPlugin.ts)，Plugin在框架内部初始化的时候就已经[注册](https://github.com/eleme/morjs/blob/main/packages/plugin-compiler/src/index.ts)了。看注释是有处理异步require，但实际编译的时候并找不到对应的分包模块，并且`require.async`被编译成了`require('xxxx').async('xxx')`。
通过debugger这段插件的源码，我认为这个Plugin的处理并不正确：
1. `require.async`并不是标准的CommonJS语法，webpack无法正确处理，所以要原封不动的保留`require.async`给微信小程序本身去处理。
2. 分包异步化，分包模块并不会被打包到主包中。而webpack处理的时候，会从入口代码开始，静态解析所有依赖入口，将所有依赖打包进来。所以小程序的分包，就有点像webpack的多入口文件，而这个Plugin并没有这样处理。
3. 在debugger的时候，发现Plugin处理逻辑中的订阅回调方法并没有被调用(代码中已经存在`require.async`)，所以这个Plugin实际上没有执行？

所以我的想法是先通过`patch-package`的方式先屏蔽掉[`DynamicRequireSupportPlugin`]，然后重写写一个自己的Plugin，主要处理两件事
1. 跳过`require.async`的编译，直接原封不动的保留
2. 处理分包异步化，解析`require.async`引入的分包路径，将分包模块的代码按原有路径打包进dist目录中。

写之前我突然想可以先参考下现有跨端框架(uniapp, taro)是怎么处理分包异步化的，说不定可以参考一下。

翻了下github issue，至少目前(2025-03)两个跨端框架官方还没提供直接的解决方案：
uniapp: [申请支持微信小程序分包异步化](https://github.com/dcloudio/uni-app/issues/2934)
taro: [请问Taro3中目前有办法使用分包异步化吗，微信小程序目前是支持的](https://github.com/NervJS/taro/issues/13836)

但发现有人提供了[解决思路](https://github.com/NervJS/taro/issues/10406)，可以使用`__non_webpack_require__`代替`require`，`__non_webpack_require__`不会被webpack解析，就可以保留`require.async`

> webpack的这个[api](https://webpack.js.org/api/module-variables/#__non_webpack_require__-webpack-specific)隐藏得太深了，文档也没有详细介绍

然后就是处理分包路径，在webpack.cofig.js中可以配置`entry`有多个入口，但morjs并没有直接暴露webpack配置，在对官方文档逐个排查的时候，发现了[customEntries - 自定义入口文件配置](https://mor.ele.me/guides/basic/config#customentries---%E8%87%AA%E5%AE%9A%E4%B9%89%E5%85%A5%E5%8F%A3%E6%96%87%E4%BB%B6%E9%85%8D%E7%BD%AE)

* 可用于指定入口配置文件的自定义文件路径，如 app.json / plugin.json / subpackage.json / component.json
* 可用于指定一些在 bundle 模式下额外需要参与编译且需要定制输出名称的文件，如对外输出某个 js 文件
* bundle 模式下，无引用关系，但需要额外需要编译的 页面（pages） 或 组件（components）

添加如下配置即可：
```ts
customEntries: {
  'sourceSubPackage/utils/test': 'src/sourceSubPackage/utils/test.ts'
}
```