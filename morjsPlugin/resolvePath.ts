/**
 * 编译插件
 * 用于解决编译时路径解析
 */
import type { Plugin, Runner, FileParserOptions } from '@morjs/cli'
import { filenameEnum } from './enum'

export default class MorJSPluginResolvePath implements Plugin {
  name = 'MorJSPluginResolvePath'
  /**
   * app.json 配置的 resolveAlias
   */
  wechatAlias = {}

  apply(runner: Runner) {
    // webpackWrapper: 用于获取 webpackWrapper
    runner.hooks.webpackWrapper.tap(this.name, (webpackWrapper) => {
      // 保存 webpackWrapper 提供给后续流程调用
      debugger
    })

    // compiler: 用于获取 webpack compiler
    runner.hooks.compiler.tap(this.name, (compiler) => {
      debugger
    })

    // entryBuilder: 用于获取 entryBuilder
    runner.hooks.entryBuilder.tap(this.name, (entryBuilder) => {
      debugger
    })
    // shouldAddPageOrComponent: 用于判断是否要处理页面或组件
    runner.hooks.shouldAddPageOrComponent.tap(this.name, (pageOrComponent) => {
      debugger
      return true
    })

    // addEntry: 添加 entry 时触发, 可用于修改 entry 相关信息
    runner.hooks.addEntry.tap(this.name, (entryInfo) => {
      debugger
      return entryInfo
    })
    // beforeBuildEntries: 解析所有 entries 文件之后, 生成 entries 之前执行
    runner.hooks.beforeBuildEntries.tap(this.name, (entryBuilder) => {
      debugger
    })

    // afterBuildEntries: 用于获取并修改构建出来的 entries
    runner.hooks.afterBuildEntries.tap(this.name, (entries, entryBuilder) => {
      debugger
      return entries
    })
    /**
     * configParser: config(json) 文件解析 hook
     * 第一个读取的是app.json
     */
    runner.hooks.configParser.tap(this.name, (config, options) => {
      // console.log('---------config', JSON.stringify(config))
      // console.log('---------options', JSON.stringify(options))
      debugger
      // this.wechatAlias = getAlias(config, options)
      // resolvePath(config, this.wechatAlias)
      debugger
      return config
    })
  }
}

function validateFile(options: FileParserOptions, filename: string) {
  return options.fileInfo.entryName === filename
}

function getAlias(config: Record<string, any>, options: FileParserOptions) {
  if (!validateFile(options, filenameEnum.appJson)) return {}
  return config.resolveAlias || {}
}

/**
 * 解决以下路径
 * 1. resolveAlias
 * 2. path/to/file
 * 3. /path/to/file 这种情况好像可以处理
 */
function resolvePath(config: Record<string, any>, wechatAlias: Record<string, any>) {
  const { usingComponents } = config
  if (!usingComponents) return
  Object.keys(usingComponents).forEach(compKey => {
    const path = usingComponents[compKey]
    let modifiedPath = path
    if (/^[a-zA-Z]/.test(path)) {
      modifiedPath = `./${path}`
    } else {
      modifiedPath = resolveJsonAlias(path, wechatAlias)
    }
    usingComponents[compKey] = modifiedPath
  })
}

function resolveJsonAlias(path: string, wechatAlias: Record<string, any>) {
  for (const [pattern, replacement] of Object.entries(wechatAlias)) {
    if (path.startsWith(pattern.split('/*')[0])) {
      // 替换路径
      const newPath = path.replace(pattern.split('/*')[0], replacement.split('/*')[0])
      return newPath
    }
  }
  return path
}
