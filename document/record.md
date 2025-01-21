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