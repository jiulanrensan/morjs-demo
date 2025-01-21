module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1737470303020, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.wPageToComponent = exports.aPageToComponent = exports.PageToComponent = exports.wPlugin = exports.aPlugin = exports.createPlugin = exports.enhancePage = exports.createPage = exports.registerComponentAdapters = exports.wComponent = exports.aComponent = exports.enhanceComponent = exports.createComponent = exports.registerPageAdapters = exports.wPage = exports.aPage = exports.registerAppAdapters = exports.wApp = exports.aApp = exports.createApp = void 0;
var app_1 = require("./app");
Object.defineProperty(exports, "aApp", { enumerable: true, get: function () { return app_1.aApp; } });
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return app_1.createApp; } });
Object.defineProperty(exports, "registerAppAdapters", { enumerable: true, get: function () { return app_1.registerAppAdapters; } });
Object.defineProperty(exports, "wApp", { enumerable: true, get: function () { return app_1.wApp; } });
var component_1 = require("./component");
Object.defineProperty(exports, "aComponent", { enumerable: true, get: function () { return component_1.aComponent; } });
Object.defineProperty(exports, "createComponent", { enumerable: true, get: function () { return component_1.createComponent; } });
Object.defineProperty(exports, "enhanceComponent", { enumerable: true, get: function () { return component_1.enhanceComponent; } });
Object.defineProperty(exports, "registerComponentAdapters", { enumerable: true, get: function () { return component_1.registerComponentAdapters; } });
Object.defineProperty(exports, "wComponent", { enumerable: true, get: function () { return component_1.wComponent; } });
var page_1 = require("./page");
Object.defineProperty(exports, "aPage", { enumerable: true, get: function () { return page_1.aPage; } });
Object.defineProperty(exports, "createPage", { enumerable: true, get: function () { return page_1.createPage; } });
Object.defineProperty(exports, "enhancePage", { enumerable: true, get: function () { return page_1.enhancePage; } });
Object.defineProperty(exports, "registerPageAdapters", { enumerable: true, get: function () { return page_1.registerPageAdapters; } });
Object.defineProperty(exports, "wPage", { enumerable: true, get: function () { return page_1.wPage; } });
var pageToComponent_1 = require("./pageToComponent");
Object.defineProperty(exports, "aPageToComponent", { enumerable: true, get: function () { return pageToComponent_1.aPageToComponent; } });
Object.defineProperty(exports, "PageToComponent", { enumerable: true, get: function () { return pageToComponent_1.PageToComponent; } });
Object.defineProperty(exports, "wPageToComponent", { enumerable: true, get: function () { return pageToComponent_1.wPageToComponent; } });
var plugin_1 = require("./plugin");
Object.defineProperty(exports, "aPlugin", { enumerable: true, get: function () { return plugin_1.aPlugin; } });
Object.defineProperty(exports, "createPlugin", { enumerable: true, get: function () { return plugin_1.createPlugin; } });
Object.defineProperty(exports, "wPlugin", { enumerable: true, get: function () { return plugin_1.wPlugin; } });
var init_1 = require("./utils/init");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return init_1.init; } });
require("./utils/polyfill");
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./app":1737470303021,"./component":1737470303027,"./page":1737470303029,"./pageToComponent":1737470303031,"./plugin":1737470303032,"./utils/init":1737470303023,"./utils/polyfill":1737470303033}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303021, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.wApp = exports.aApp = exports.registerAppAdapters = exports.createApp = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
var constants_1 = require("./utils/constants");
var init_1 = require("./utils/init");
var invokeOriginalFunction_1 = require("./utils/invokeOriginalFunction");
// 跨端支持的应用运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
/* MOR_APP_POLYFILL_IMPORT_REPLACER */ '';
// 转端适配器
var APP_ADAPTERS = [];
// 初始化标记
var IS_INITIALIZED = false;
// 全局应用事件
var APP_EVENT_MAPPINGS = {
    onPageNotFound: 'appOnPageNotFound',
    onUnhandledRejection: 'appOnUnhandledRejection'
};
/**
 * 注入 app 生命周期 hook
 * @param appOptions 小程序 app 初始化 options
 */
function hookAppLifeCycle(appOptions) {
    var _a, _b, _c;
    /**
     * 调用 hook
     * @param hookName hook名字
     */
    var invokeHook = function (hookName) {
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (_a = this.$morHooks[hookName]).call.apply(_a, tslib_1.__spreadArray([this], args, false));
        };
    };
    /**
     * 调用事件通知
     * @param eventName 事件标识
     */
    var invokeEvent = function (eventName) {
        return function (arg) {
            if (this.$event) {
                this.$event.emit("".concat(constants_1.MOR_EVENT_PREFIX).concat(eventName), arg);
            }
        };
    };
    appOptions.onLaunch = (0, api_1.compose)([
        invokeHook('appOnLaunch'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onLaunch', appOptions)
    ]);
    appOptions.onShow = (0, api_1.compose)([
        invokeHook('appOnShow'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onShow', appOptions),
        invokeEvent('appOnShow')
    ]);
    appOptions.onHide = (0, api_1.compose)([
        invokeHook('appOnHide'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onHide', appOptions),
        invokeEvent('appOnHide')
    ]);
    appOptions.onError = (0, api_1.compose)([
        invokeHook('appOnError'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onError', appOptions)
    ]);
    // 这里的事件可能会改变小程序本身的行为, 故这里单独处理
    for (var eventName in APP_EVENT_MAPPINGS) {
        var hookName = APP_EVENT_MAPPINGS[eventName];
        if (hookName &&
            (appOptions[eventName] || ((_c = (_b = (_a = appOptions.$morHooks) === null || _a === void 0 ? void 0 : _a[hookName]) === null || _b === void 0 ? void 0 : _b.isUsed) === null || _c === void 0 ? void 0 : _c.call(_b)))) {
            appOptions[eventName] = (0, api_1.compose)([
                invokeHook(hookName),
                (0, invokeOriginalFunction_1.invokeOriginalFunction)(eventName, appOptions)
            ]);
        }
    }
}
/**
 * 注册 App
 */
function createApp(options, 
/**
 * 运行时 Solution 支持
 */
solution, 
/**
 * 拓展参数
 */
extend) {
    api_1.logger.time('createApp-init');
    // 配置 globalApp 的时候不检查多实例的问题
    // 原因： 允许插件或分包工程使用模拟 App
    //       这种情况下一个小程序会出现多个 App 初始化
    if (!(extend === null || extend === void 0 ? void 0 : extend.globalApp)) {
        if (IS_INITIALIZED) {
            api_1.logger.error('App 有且只能执行一次!');
            return;
        }
        else {
            IS_INITIALIZED = true;
        }
    }
    var appOptions = tslib_1.__assign({}, options);
    api_1.logger.time('app-init-solution');
    var _a = (0, init_1.init)(solution), $hooks = _a.$hooks, pluginsNames = _a.pluginsNames;
    api_1.logger.timeEnd('app-init-solution');
    if (extend === null || extend === void 0 ? void 0 : extend.onHooksCreated) {
        if (typeof extend.onHooksCreated !== 'function') {
            api_1.logger.error('onHooksCreated 必须是函数, 请检查 App 的 extends 配置');
            return;
        }
        extend.onHooksCreated($hooks);
    }
    // 添加到 App 实例中
    appOptions.$morHooks = $hooks;
    appOptions.$morPluginsNames = pluginsNames;
    // 触发 appOnConstruct hook, 兼容旧版本当 appOnConstruct 不存在时用 appOnInit 兜底
    var appOnConstruct = $hooks.appOnConstruct || $hooks.appOnInit;
    appOnConstruct.call(appOptions, appOptions);
    // 生命周期 hook
    api_1.logger.time('app-hook-lifetimes');
    hookAppLifeCycle(appOptions);
    api_1.logger.timeEnd('app-hook-lifetimes');
    // 跨端支持的应用运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    /* MOR_APP_POLYFILL_INVOKE_REPLACER */ '';
    // 执行 app 适配器初始化
    if (APP_ADAPTERS === null || APP_ADAPTERS === void 0 ? void 0 : APP_ADAPTERS.length) {
        APP_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initApp) === 'function') {
                adapter.initApp(appOptions);
            }
            else {
                api_1.logger.error("adapter.initApp \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    api_1.logger.timeEnd('app-init');
    // 使用 extend.globalApp 替代 App
    // 用于 插件和分包模式下的 App 构造函数模拟
    if (extend === null || extend === void 0 ? void 0 : extend.globalApp) {
        if (typeof extend.globalApp !== 'function') {
            api_1.logger.error('globalApp 必须是函数, 请检查 App 的 extends 配置');
            return;
        }
        return extend.globalApp(appOptions);
    }
    else {
        return App(appOptions);
    }
}
exports.createApp = createApp;
/**
 * 注册应用转端适配器
 * @param adapters - 应用转端适配器
 */
function registerAppAdapters(adapters) {
    APP_ADAPTERS.push.apply(APP_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerAppAdapters = registerAppAdapters;
/**
 * 注册支付宝小程序 App
 */
exports.aApp = createApp;
/**
 * 注册微信小程序 App
 */
exports.wApp = createApp;
//# sourceMappingURL=app.js.map
}, function(modId) { var map = {"./utils/constants":1737470303022,"./utils/init":1737470303023,"./utils/invokeOriginalFunction":1737470303026}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303022, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ON_HIDE_EVENT = exports.APP_ON_SHOW_EVENT = exports.MOR_EVENT_METHOD_PREFIX = exports.MOR_EVENT_PREFIX = void 0;
/**
 * mor 事件名称前缀
 */
exports.MOR_EVENT_PREFIX = '$mor:';
/**
 * mor 注入的事件方法前缀
 */
exports.MOR_EVENT_METHOD_PREFIX = "".concat(exports.MOR_EVENT_PREFIX, "event:");
/**
 * 监听 app 事件名称
 */
exports.APP_ON_SHOW_EVENT = "".concat(exports.MOR_EVENT_PREFIX, "appOnShow");
exports.APP_ON_HIDE_EVENT = "".concat(exports.MOR_EVENT_PREFIX, "appOnHide");
//# sourceMappingURL=constants.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303023, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var api_1 = require("@morjs/api");
var contextPlugin_1 = require("../plugins/contextPlugin");
var eventPlugin_1 = require("../plugins/eventPlugin");
var IS_DEFAULT_HOOKS_USED = false;
/**
 * 初始化, 创建 $hooks 及应用 solutions
 * @param solution 解决方案
 */
function init(solution) {
    var solutions = [
        function () {
            return {
                plugins: [new eventPlugin_1.EventPlugin(), new contextPlugin_1.ContextPlugin()]
            };
        }
    ].concat((0, api_1.asArray)(solution));
    var $hooks = IS_DEFAULT_HOOKS_USED
        ? (0, api_1.createHooks)('initWithSolutions')
        : api_1.hooks;
    IS_DEFAULT_HOOKS_USED = true;
    var pluginsNames = (0, api_1.applySolutions)($hooks, solutions);
    return {
        $hooks: $hooks,
        pluginsNames: pluginsNames
    };
}
exports.init = init;
//# sourceMappingURL=init.js.map
}, function(modId) { var map = {"../plugins/contextPlugin":1737470303024,"../plugins/eventPlugin":1737470303025}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303024, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextPlugin = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
/**
 * context 插件
 */
var ContextPlugin = /** @class */ (function () {
    function ContextPlugin() {
        var _this = this;
        this.pluginName = 'MorContextPlugin';
        this.apply = function (hooks) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var $plugin = _this;
            hooks.appOnInit.tap(_this.pluginName, function (appOptions) {
                if (appOptions.$context) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $context 的赋值，防止出现不可预知的问题。');
                }
            });
            hooks.appOnLaunch.tap(_this.pluginName, function (options) {
                var query = tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) || {}));
                this.$context = { appQuery: query };
            });
            hooks.pageOnInit.tap(_this.pluginName, function (pageOptions) {
                if (pageOptions.$context) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $context 的赋值，防止出现不可预知的问题。');
                }
            });
            hooks.pageOnLoad.tap(_this.pluginName, function (query) {
                var _a, _b;
                var appQuery = {};
                if (typeof getApp !== 'undefined' && ((_a = getApp()) === null || _a === void 0 ? void 0 : _a.$context)) {
                    appQuery = ((_b = getApp().$context) === null || _b === void 0 ? void 0 : _b.appQuery) || {};
                }
                this.$context = {
                    pageQuery: query,
                    appQuery: appQuery
                };
            });
        };
    }
    return ContextPlugin;
}());
exports.ContextPlugin = ContextPlugin;
//# sourceMappingURL=contextPlugin.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303025, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPlugin = void 0;
var api_1 = require("@morjs/api");
// 默认 event 使用标记
var IS_DEFAULT_EVENT_USED = false;
/**
 * event 插件
 */
var EventPlugin = /** @class */ (function () {
    function EventPlugin() {
        var _this = this;
        this.pluginName = 'MorEventPlugin';
        this.apply = function (hooks) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var $plugin = _this;
            // 优先使用全局 event
            var $event = IS_DEFAULT_EVENT_USED
                ? (0, api_1.createEvent)('createByMorEventPlugin')
                : api_1.event;
            IS_DEFAULT_EVENT_USED = true;
            // app 注入 $event
            hooks.appOnInit.tap(_this.pluginName, function (appOptions) {
                if (appOptions.$event) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $event 的赋值，防止出现不可预知的问题。');
                }
                appOptions.$event = $event;
            });
            // 由于存在非 createApp 初始化的情况，appOnLaunch 的时候补偿加一下
            hooks.appOnLaunch.tap(_this.pluginName, function () {
                if (!this.$event)
                    this.$event = $event;
            });
            // 页面注入 $event
            hooks.pageOnInit.tap(_this.pluginName, function (pageOptions) {
                if (pageOptions.$event) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $event 的赋值，防止出现不可预知的问题。');
                }
                pageOptions.$event = $event;
            });
        };
    }
    return EventPlugin;
}());
exports.EventPlugin = EventPlugin;
//# sourceMappingURL=eventPlugin.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303026, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeOriginalFunction = void 0;
var tslib_1 = require("tslib");
/**
 * 调用原本的生命周期函数
 * @param fnName 事件名
 * @param obj 事件方法来源
 * @param shouldDeleteProperty 是否移除属性, 一些生命周期函数需要保存后并移除, 以避免重复触发
 */
var invokeOriginalFunction = function (fnName, obj, shouldDeleteProperty) {
    if (shouldDeleteProperty === void 0) { shouldDeleteProperty = false; }
    var originalFn = obj[fnName];
    if (shouldDeleteProperty && obj && fnName && fnName in obj) {
        delete obj[fnName];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (originalFn && typeof originalFn === 'function') {
            return originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
        }
    };
};
exports.invokeOriginalFunction = invokeOriginalFunction;
//# sourceMappingURL=invokeOriginalFunction.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303027, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.wComponent = exports.aComponent = exports.registerComponentAdapters = exports.createComponent = exports.enhanceComponent = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
var constants_1 = require("./utils/constants");
var invokeHook_1 = require("./utils/invokeHook");
var invokeOriginalFunction_1 = require("./utils/invokeOriginalFunction");
// 跨端支持的组件运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
/* MOR_COMPONENT_POLYFILL_IMPORT_REPLACER */ '';
// 转端适配器
var COMPONENT_ADAPTERS = [];
// eslint-disable-next-line @typescript-eslint/no-empty-function
var emptyFn = function () { };
/**
 * hook 组件生命周期
 */
function hookComponentLifeCycle(componentOptions, needsToHookPageLifetimes, sourceType, invokeComponentHooks) {
    if (invokeComponentHooks === void 0) { invokeComponentHooks = true; }
    var isAlipaySource = sourceType === api_1.SOURCE_TYPE.ALIPAY;
    /**
     * 设置基础信息
     */
    var makeBaseInfo = function () {
        if (!this.$morId)
            this.$morId = String((0, api_1.generateId)());
    };
    /**
     * 做 pageLifetimes 的事件绑定
     * @param this 当前组件实例
     */
    var registerPageLifetimes = function () {
        var _a;
        // 这里检查 getCurrentPages 是否存在，防止导致整个应用崩溃
        // 目的是部分小程序页面转 H5 时，缺少完整的小程序 runtime polyfill 而直接报错
        if (typeof getCurrentPages === 'undefined') {
            api_1.logger.error('未发现 getCurrentPages 方法, 无法自动获取当前页面实例, pageLifetimes 相关事件注册失败');
            return;
        }
        var $event = (0, api_1.getSharedProperty)('$event', this);
        var allPages = getCurrentPages() || [];
        // 在当前组件中保存 所在页面的标记
        var pageFlag = (this.$morCurrentPageFlag =
            (_a = allPages[allPages.length - 1]) === null || _a === void 0 ? void 0 : _a.$morPageFlag);
        if (!pageFlag || !$event) {
            api_1.logger.warn('当前运行环境缺乏 $event 或 $morPageFlag 支持, ' +
                '请检查页面是否采用了 createPage/aPage/wPage 以及 App 是否初始化正确');
            return;
        }
        // 避免不重复添加
        if (this.$morPageLifetimesIsHooked)
            return;
        this.$morPageOnShow = this.$morPageOnShow.bind(this);
        this.$morPageOnHide = this.$morPageOnHide.bind(this);
        this.$morPageOnResize = this.$morPageOnResize.bind(this);
        $event.once("$mor:pageOnReady:".concat(pageFlag), this.$morPageOnShow);
        $event.on("$mor:pageOnShow:".concat(pageFlag), this.$morPageOnShow);
        $event.on("$mor:pageOnHide:".concat(pageFlag), this.$morPageOnHide);
        $event.on("$mor:pageOnResize:".concat(pageFlag), this.$morPageOnResize);
        this.$morPageLifetimesIsHooked = true;
    };
    /**
     * 去除pageLifetime的事件绑定
     */
    var unregisterPageLifetimes = function () {
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!this.$morCurrentPageFlag)
            return;
        var pageFlag = this.$morCurrentPageFlag;
        $event.off("$mor:pageOnReady:".concat(pageFlag), this.$morPageOnShow);
        $event.off("$mor:pageOnShow:".concat(pageFlag), this.$morPageOnShow);
        $event.off("$mor:pageOnHide:".concat(pageFlag), this.$morPageOnHide);
        $event.off("$mor:pageOnResize:".concat(pageFlag), this.$morPageOnResize);
    };
    /**
     * 增加 $eventListener 事件绑定
     * @param this 当前组件实例
     */
    var addEventListeners = function () {
        var _this = this;
        var _a, _b;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.$morEventListenerNames) === null || _b === void 0 ? void 0 : _b.length))
            return;
        // 在当前组件实例中添加 事件
        this.data.$morEventListenerNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            _this[morEventName] = _this[morEventName].bind(_this);
            $event.on(eventName, _this[morEventName]);
        });
    };
    /**
     * 去除 $eventListener 事件绑定
     */
    var removeEventListeners = function () {
        var _this = this;
        var _a, _b;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.$morEventListenerNames) === null || _b === void 0 ? void 0 : _b.length))
            return;
        this.data.$morEventListenerNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            $event.off(eventName, _this[morEventName]);
        });
    };
    var lifetimes = isAlipaySource
        ? componentOptions
        : componentOptions.lifetimes;
    // 支付宝 DSL 支持
    if (isAlipaySource) {
        // onInit
        lifetimes.onInit = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnInit') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onInit', lifetimes)
        ]);
        // didMount
        componentOptions.didMount = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            makeBaseInfo,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentDidMount') : emptyFn,
            addEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('didMount', lifetimes)
        ]);
        // didUnmount
        componentOptions.didUnmount = (0, api_1.compose)([
            needsToHookPageLifetimes ? unregisterPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentDidUnmount') : emptyFn,
            removeEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('didUnmount', componentOptions)
        ]);
        // onError
        componentOptions.onError = (0, api_1.compose)([
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnError') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onError', componentOptions)
        ]);
    }
    // 微信 DSL 支持
    else {
        // created
        lifetimes.created = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnCreated') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('created', lifetimes)
        ]);
        // attached
        lifetimes.attached = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            makeBaseInfo,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnAttached') : emptyFn,
            addEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('attached', lifetimes)
        ]);
        // detached
        lifetimes.detached = (0, api_1.compose)([
            needsToHookPageLifetimes ? unregisterPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnDetached') : emptyFn,
            removeEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('detached', lifetimes)
        ]);
        // error
        lifetimes.error = (0, api_1.compose)([
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnError') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('error', lifetimes)
        ]);
    }
}
/**
 * 增加 pageLifetimes 的相关方法注入
 */
function hookPageLifetimes(componentOptions, needsToHookPageLifetimes) {
    if (!needsToHookPageLifetimes)
        return;
    var pageLifetimes = componentOptions.pageLifetimes || {};
    var originalPageOnShow = pageLifetimes.show;
    componentOptions.methods.$morPageOnShow = function () {
        if (originalPageOnShow) {
            originalPageOnShow.call(this);
        }
    };
    var originalPageOnHide = pageLifetimes.hide;
    componentOptions.methods.$morPageOnHide = function () {
        if (originalPageOnHide) {
            originalPageOnHide.call(this);
        }
    };
    var originalPageOnResize = pageLifetimes.resize;
    componentOptions.methods.$morPageOnResize = function () {
        if (originalPageOnResize) {
            originalPageOnResize.call(this);
        }
    };
    delete componentOptions.pageLifetimes;
}
/**
 * 注入 $eventListener 中对应的方法
 */
function hookEventListener(componentOptions) {
    if (componentOptions.$eventListener) {
        var eventNames = Object.keys(componentOptions.$eventListener);
        var data = componentOptions.data;
        data.$morEventListenerNames = eventNames;
        eventNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            componentOptions.methods[morEventName] =
                componentOptions.$eventListener[eventName];
        });
    }
}
/**
 * 确保自定义组件选项中必要的值存在
 */
function ensureDataAndMethodsAndLifetimes(options, sourceType) {
    if (!options.methods)
        options.methods = {};
    if (!options.data)
        options.data = {};
    if (!options.lifetimes)
        options.lifetimes = {};
    // 如果 微信DSL
    if (sourceType === api_1.SOURCE_TYPE.WECHAT) {
        // 微信中 lifetimes 中的优先级高于 options 中的方法
        var created = options.lifetimes.created || options.created;
        delete options.created;
        options.lifetimes.created = created;
        var attached = options.lifetimes.attached || options.attached;
        delete options.attached;
        options.lifetimes.attached = attached;
        var ready = options.lifetimes.ready || options.ready;
        delete options.ready;
        options.lifetimes.ready = ready;
        var moved = options.lifetimes.moved || options.moved;
        delete options.moved;
        options.lifetimes.moved = moved;
        var detached = options.lifetimes.detached || options.detached;
        delete options.detached;
        options.lifetimes.detached = detached;
        var error = options.lifetimes.error || options.error;
        delete options.error;
        options.lifetimes.error = error;
    }
}
// 支付宝小程序运行环境
var isAlipayTarget = (0, api_1.getEnv)() === api_1.ENV_TYPE.ALIPAY ||
    (0, api_1.getEnv)() === api_1.ENV_TYPE.DINGDING ||
    (0, api_1.getEnv)() === api_1.ENV_TYPE.TAOBAO;
var WECHAT_COMPONENT_LIFETIMES_METHODS = [
    'created',
    'attached',
    'ready',
    'moved',
    'detached',
    'error'
];
/**
 * 支付宝基础库 2.8.5 (2022-12-29) 起新增 lifetimes 定义段，
 * 支持 created、attached 等组件节点树维度的生命周期函数
 */
var ALIPAY_COMPONENT_LIFETIMES_METHODS = [
    'onInit',
    'deriveDataFromProps',
    'didMount',
    'didUpdate',
    'didUnmount',
    'onError'
].concat(WECHAT_COMPONENT_LIFETIMES_METHODS);
function getComponentLifetimesMethods(sourceType) {
    return sourceType === api_1.SOURCE_TYPE.WECHAT
        ? WECHAT_COMPONENT_LIFETIMES_METHODS
        : ALIPAY_COMPONENT_LIFETIMES_METHODS;
}
/**
 * 处理 mixins 或 behaviors
 *  - 声明周期方法会进行合并
 *  - methods 会使用最后声明的
 *  - 数据 会进行合并
 * @param componentOptions - Component 参数
 * @param mixinType - mixin 类型, 用于区分 mixin 和 behavior
 * @param sourceType - 源码类型
 */
function processMixinsOrBehaviors(componentOptions, mixinType, sourceType) {
    var _a;
    if (!((_a = componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions[mixinType]) === null || _a === void 0 ? void 0 : _a.length))
        return;
    var mixins = componentOptions[mixinType];
    delete componentOptions[mixinType];
    var lifetimesFunctions = {};
    var componentLifetimesMethods = getComponentLifetimesMethods(sourceType);
    // 合并 mixins
    function processMixins(mixins, 
    // 是否是组件的直接 mixins
    isComponentDirectMixins) {
        return mixins.reduce(function (prev, curr) {
            var _a;
            if (typeof curr !== 'object') {
                api_1.logger.error("\u65E0\u6548\u7684 ".concat(mixinType, ": "), curr, '已跳过');
                return prev;
            }
            var result = tslib_1.__assign({}, prev);
            if (mixinType === 'behaviors') {
                // 如果是组件直接使用的 behaviors
                // 需要执行 definitionFilter 方法
                if (isComponentDirectMixins && curr.definitionFilter) {
                    curr.definitionFilter(componentOptions);
                }
                // 处理 内嵌 behaviors
                if ((_a = curr === null || curr === void 0 ? void 0 : curr[mixinType]) === null || _a === void 0 ? void 0 : _a.length) {
                    var childMixins = curr === null || curr === void 0 ? void 0 : curr[mixinType];
                    delete curr[mixinType];
                    result = processMixins(tslib_1.__spreadArray([result], childMixins, true), false);
                }
            }
            // 合并 lifetimes, lifetimes 中的函数优先级高
            var current = tslib_1.__assign(tslib_1.__assign({}, curr), (curr.lifetimes || {}));
            Object.keys(current).forEach(function (name) {
                // 不处理 定义段函数
                if (name === 'definitionFilter')
                    return;
                // 合并 数据
                // 如 props/properties/data/methods
                if (typeof current[name] === 'object') {
                    // 对象类型还可能包含数组，对数组做单独处理
                    if (Array.isArray(curr[name])) {
                        result[name] = tslib_1.__spreadArray(tslib_1.__spreadArray([], (result[name] || []), true), curr[name], true);
                    }
                    else
                        result[name] = tslib_1.__assign(tslib_1.__assign({}, result[name]), current[name]);
                }
                // 合并 方法
                else if (typeof current[name] === 'function') {
                    var isLifetimeFn = componentLifetimesMethods.indexOf(name) !== -1;
                    if (isLifetimeFn) {
                        lifetimesFunctions[name] = lifetimesFunctions[name] || [];
                        lifetimesFunctions[name].push(current[name]);
                    }
                    // 非 lifetime method 只生效最后一个
                    else {
                        if (typeof result[name] === 'function') {
                            api_1.logger.warn("".concat(mixinType, " \u4E2D\u91CD\u590D\u5B9A\u4E49\u65B9\u6CD5, \u5C06\u751F\u6548\u6700\u540E\u58F0\u660E\u7684"), name);
                        }
                        result[name] = current[name];
                    }
                }
                // 其他的 赋值
                else {
                    result[name] = current[name];
                }
            });
            return result;
        }, {});
    }
    var merged = processMixins(mixins, true);
    // 合并普通数据或方法
    Object.keys(merged).forEach(function (name) {
        if (name in componentOptions) {
            if (typeof merged[name] === 'object') {
                var currType = typeof componentOptions[name];
                if (currType !== 'object') {
                    api_1.logger.warn("".concat(name, " \u5728 ").concat(mixinType, " \u4E2D\u5B9A\u4E49\u4E3A object, \u4F46\u662F\u5728\u5F53\u524D Component \u4E3A").concat(currType));
                    return;
                }
                componentOptions[name] = tslib_1.__assign(tslib_1.__assign({}, merged[name]), componentOptions[name]);
            }
        }
        else {
            componentOptions[name] = merged[name];
        }
    });
    // 合并 生命周期 函数
    Object.keys(lifetimesFunctions).forEach(function (name) {
        var _a;
        var originalFn = ((_a = componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions.lifetimes) === null || _a === void 0 ? void 0 : _a[name]) || componentOptions[name];
        componentOptions[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var _a = 0, _b = lifetimesFunctions[name]; _a < _b.length; _a++) {
                    var fn = _b[_a];
                    fn.call.apply(fn, tslib_1.__spreadArray([this], args, false));
                }
            }
            catch (err) {
                api_1.logger.error("".concat(mixinType, " \u51FD\u6570 ").concat(name, " \u62A5\u9519"), err);
            }
            if (originalFn)
                originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
        };
        componentOptions.lifetimes[name] = componentOptions[name];
    });
}
/**
 * 增强 Component 组件
 * @param options - 小程序组件配置
 * @param sourceType - 小程序组件源码类型, 编译时由 Mor 自动填充
 * @param features - 功能特性配置
 */
function enhanceComponent(options, sourceType, features) {
    if (features === void 0) { features = {}; }
    api_1.logger.time('component-init');
    if (!sourceType) {
        api_1.logger.warn("createComponent \u7F3A\u5C11 sourceType \u53EF\u80FD\u4F1A\u5BFC\u81F4\u5C0F\u7A0B\u5E8F\u7EC4\u4EF6\u521D\u59CB\u5316\u9519\u8BEF");
    }
    var componentOptions = tslib_1.__assign({}, options);
    var $morHooks = (0, api_1.getSharedProperty)('$morHooks', options);
    if (!$morHooks) {
        api_1.logger.warn('createComponent 依赖于 $morHooks 的初始化, 请检查配置');
        return componentOptions;
    }
    // 确保 data 属性 和 methods 属性
    ensureDataAndMethodsAndLifetimes(componentOptions, sourceType);
    // 处理 mixins
    processMixinsOrBehaviors(componentOptions, 'mixins', sourceType);
    // 仅非支付宝DSL且目标为支付宝小程序运行环境需要处理 behaviors
    if (sourceType === api_1.SOURCE_TYPE.WECHAT && isAlipayTarget) {
        processMixinsOrBehaviors(componentOptions, 'behaviors', sourceType);
    }
    // 触发 onConstruct, 兼容旧版本当 componentOnConstruct 不存在时用 componentOnInit 兜底
    if (features.invokeComponentHooks !== false) {
        var componentOnConstruct = $morHooks.componentOnConstruct || $morHooks.componentOnInit;
        componentOnConstruct.call(componentOptions, componentOptions);
    }
    // 是否需要添加 页面生命周期 支持，目前仅 支付宝及支付宝相关小程序运行环境 下需要
    var needsToHookPageLifetimes = componentOptions.pageLifetimes && isAlipayTarget;
    // 添加 生命周期 hook
    hookComponentLifeCycle(componentOptions, needsToHookPageLifetimes, sourceType, features.invokeComponentHooks !== false);
    // 添加 页面生命周期监听
    hookPageLifetimes(componentOptions, needsToHookPageLifetimes);
    // 添加 $eventListener 支持
    hookEventListener(componentOptions);
    // 跨端支持的组件运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    /* MOR_COMPONENT_POLYFILL_INVOKE_REPLACER */ '';
    // 执行 component 适配器初始化
    if (COMPONENT_ADAPTERS === null || COMPONENT_ADAPTERS === void 0 ? void 0 : COMPONENT_ADAPTERS.length) {
        COMPONENT_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initComponent) === 'function') {
                adapter.initComponent(componentOptions);
            }
            else {
                api_1.logger.error("adapter.initComponent \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    api_1.logger.timeEnd('component-init');
    return componentOptions;
}
exports.enhanceComponent = enhanceComponent;
/**
 * Component 组件注册
 * @param options - 小程序组件配置
 * @param sourceType - 小程序组件源码类型, 编译时由 Mor 自动填充
 */
function createComponent(options, sourceType) {
    api_1.logger.time('component-init');
    var componentOptions = enhanceComponent(options, sourceType);
    api_1.logger.timeEnd('component-init');
    return Component(componentOptions);
}
exports.createComponent = createComponent;
/**
 * 注册组件转端适配器
 * @param adapters - 组件转端适配器
 */
function registerComponentAdapters(adapters) {
    COMPONENT_ADAPTERS.push.apply(COMPONENT_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerComponentAdapters = registerComponentAdapters;
/**
 * 支付宝 Component 组件注册
 * @param options - 小程序组件配置
 */
function aComponent(options) {
    return createComponent(options, api_1.SOURCE_TYPE.ALIPAY);
}
exports.aComponent = aComponent;
/**
 * 微信 Component 组件注册
 * @param options - 小程序组件配置
 */
function wComponent(options) {
    return createComponent(options, api_1.SOURCE_TYPE.WECHAT);
}
exports.wComponent = wComponent;
//# sourceMappingURL=component.js.map
}, function(modId) { var map = {"./utils/constants":1737470303022,"./utils/invokeHook":1737470303028,"./utils/invokeOriginalFunction":1737470303026}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303028, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.invokeHook = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
/**
 * 调用 hook
 * @param hookName hook 名字
 */
var invokeHook = function (hookName) {
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var hook = (_a = (0, api_1.getSharedProperty)('$morHooks', this)) === null || _a === void 0 ? void 0 : _a[hookName];
        if (typeof (hook === null || hook === void 0 ? void 0 : hook.call) === 'function') {
            hook.call.apply(hook, tslib_1.__spreadArray([this], args, false));
        }
        else {
            api_1.logger.error("".concat(hookName, " \u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 hook"));
        }
    };
};
exports.invokeHook = invokeHook;
//# sourceMappingURL=invokeHook.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303029, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.wPage = exports.aPage = exports.registerPageAdapters = exports.createPage = exports.enhancePage = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
var constants_1 = require("./utils/constants");
var invokeHook_1 = require("./utils/invokeHook");
var invokeOriginalFunction_1 = require("./utils/invokeOriginalFunction");
var isPromise_1 = require("./utils/isPromise");
// 跨端支持的页面运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
/* MOR_PAGE_POLYFILL_IMPORT_REPLACER */ '';
// 转端适配器
var PAGE_ADAPTERS = [];
/**
 * 处理 Page 的生命周期
 */
function hookPageLifeCycle(pageOptions, sourceType) {
    /**
     * 增加 appLifetimes 的事件监听
     *
     * 使用方法如下:
     * ```
     * createPage({
     *   appLifetimes: {
     *     show() {}
     *     hide() {}
     *   }
     * })
     * ```
     */
    var registerAppLifetimes = function () {
        var appLifetimes = this.appLifetimes;
        if (!appLifetimes)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event) {
            return api_1.logger.warn('createPage 中 appLifetimes 的运行依赖 $event，请检查配置');
        }
        // app show 支持
        if (appLifetimes.show) {
            if (typeof appLifetimes.show === 'function') {
                appLifetimes.show = appLifetimes.show.bind(this);
                $event.on(constants_1.APP_ON_SHOW_EVENT, appLifetimes.show);
            }
            else {
                api_1.logger.warn('appLifetimes 的 show 方法必须是 function');
            }
        }
        // app hide 支持
        if (appLifetimes.hide) {
            if (typeof appLifetimes.hide === 'function') {
                appLifetimes.hide = appLifetimes.hide.bind(this);
                $event.on(constants_1.APP_ON_HIDE_EVENT, appLifetimes.hide);
            }
            else {
                api_1.logger.warn('appLifetimes 的 hide 方法必须是 function');
            }
        }
    };
    /**
     * 取消 appLifetimes 的事件监听
     */
    var unregisterAppLifetimes = function () {
        var appLifetimes = this.appLifetimes;
        if (!appLifetimes)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (appLifetimes.show)
            $event.off(constants_1.APP_ON_SHOW_EVENT, appLifetimes.show);
        if (appLifetimes.hide)
            $event.off(constants_1.APP_ON_HIDE_EVENT, appLifetimes.hide);
    };
    /**
     * 调用事件通知
     * @param eventName 事件标识
     */
    var invokeEvent = function (eventName) {
        return function (arg) {
            var $event = (0, api_1.getSharedProperty)('$event', this);
            if ($event && this.$morPageFlag) {
                $event.emit("$mor:".concat(eventName, ":").concat(this.$morPageFlag), arg);
            }
        };
    };
    /**
     * 增加 $eventListener 的事件监听
     */
    var addEventListeners = function () {
        var _this = this;
        var eventListener = this.$eventListener;
        if (!eventListener)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        Object.keys(eventListener).forEach(function (eventName) {
            /**
             * 事件需要 bind this，否则实例并非一致
             * 事件如果绑定在 $eventListener 对象上，而非直接在 this 对象上
             * 会有隐藏 bug，导致 appx 底层框架在事件内调用 setData 时判断失效
             */
            _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)] =
                eventListener[eventName].bind(_this);
            $event.on(eventName, _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)]);
        });
    };
    /**
     * 去除 $eventListener 的事件监听
     */
    var removeEventListeners = function () {
        var _this = this;
        var eventListener = this.$eventListener;
        if (!eventListener)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        Object.keys(eventListener).forEach(function (eventName) {
            $event.off(eventName, _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)]);
        });
    };
    /**
     *  确保必要的标示存在
     */
    var ensureViewIdExistance = function () {
        if (!('$viewId' in this))
            this.$viewId = (0, api_1.generateId)();
        this.$morPageFlag = String(this.$viewId);
    };
    pageOptions.onLoad = (0, api_1.compose)([
        ensureViewIdExistance,
        (0, invokeHook_1.invokeHook)('pageOnLoad'),
        addEventListeners,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onLoad', pageOptions),
        registerAppLifetimes
    ]);
    pageOptions.onReady = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnReady'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onReady', pageOptions),
        invokeEvent('pageOnReady')
    ]);
    pageOptions.onShow = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnShow'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onShow', pageOptions),
        invokeEvent('pageOnShow')
    ]);
    pageOptions.onHide = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnHide'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onHide', pageOptions),
        invokeEvent('pageOnHide')
    ]);
    pageOptions.onUnload = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnUnload'),
        removeEventListeners,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onUnload', pageOptions),
        unregisterAppLifetimes
    ]);
    // resize 支持
    // 区分支付宝和微信的 onResize 支持
    if (sourceType === api_1.SOURCE_TYPE.ALIPAY) {
        pageOptions.events = pageOptions.events || {};
        var events = pageOptions.events;
        events.onResize = (0, api_1.compose)([
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onResize', pageOptions.events),
            invokeEvent('pageOnResize')
        ]);
    }
    else {
        pageOptions.onResize = (0, api_1.compose)([
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onResize', pageOptions),
            invokeEvent('pageOnResize')
        ]);
    }
}
// 通用
var PAGE_METHOD_NAMES = {
    onLoad: {},
    onShow: {},
    onHide: {},
    onReady: {},
    onUnload: {},
    onPullDownRefresh: {},
    onReachBottom: {},
    /**
     * 支付宝和微信表现不同
     * - 支付宝支持 promise, 这里直接对 promise 的结果进行合并
     * - 微信通过 { promise } 来获取异步结果, 且 3s 自动超时使用缺省内容, 这里仅做对象合并
     */
    onShareAppMessage: {
        r: function (previous, current) {
            if (previous == null)
                return current;
            if (current == null)
                return previous;
            if ((0, isPromise_1.isPromise)(previous) || (0, isPromise_1.isPromise)(current)) {
                return Promise.resolve(previous).then(function (p) {
                    return Promise.resolve(current).then(function (c) {
                        if (p == null)
                            return c;
                        if (c == null)
                            return p;
                        return tslib_1.__assign(tslib_1.__assign({}, p), c);
                    });
                });
            }
            else {
                return tslib_1.__assign(tslib_1.__assign({}, previous), current);
            }
        }
    },
    onPageScroll: {}
};
// 微信小程序
var WECHAT_METHOD_NAMES = tslib_1.__assign(tslib_1.__assign({}, PAGE_METHOD_NAMES), { onShareTimeline: {
        r: function (previous, current) {
            if (previous == null)
                return current;
            if (current == null)
                return previous;
            return tslib_1.__assign(tslib_1.__assign({}, previous), current);
        }
    }, onResize: {}, onAddToFavorites: {} });
// 支付宝小程序
var ALIPAY_METHOD_NAMES = tslib_1.__assign(tslib_1.__assign({}, PAGE_METHOD_NAMES), { onTitleClick: {}, onOptionMenuClick: {}, onPopMenuClick: {}, onPullIntercept: {}, onTabItemTap: {} });
function getPageMethodNames(sourceType) {
    return sourceType === api_1.SOURCE_TYPE.WECHAT
        ? WECHAT_METHOD_NAMES
        : ALIPAY_METHOD_NAMES;
}
/**
 * 实现 createPage 的 mixins 机制
 * @param pageOptions
 */
function processMixins(pageOptions, sourceType) {
    var _a;
    if (!((_a = pageOptions === null || pageOptions === void 0 ? void 0 : pageOptions.mixins) === null || _a === void 0 ? void 0 : _a.length))
        return;
    var pageMethodNames = getPageMethodNames(sourceType);
    var mixins = pageOptions.mixins;
    delete pageOptions.mixins;
    var protoFns = {};
    var merged = mixins.reduce(function (prev, curr) {
        if (typeof curr !== 'object') {
            api_1.logger.error('无效的 mixin: ', curr, '已跳过');
            return prev;
        }
        var result = tslib_1.__assign({}, prev);
        Object.keys(curr).forEach(function (name) {
            // 合并 数据
            if (typeof curr[name] === 'object') {
                // 对象类型还可能包含数组，对数组做单独处理
                if (Array.isArray(curr[name])) {
                    result[name] = tslib_1.__spreadArray(tslib_1.__spreadArray([], (result[name] || []), true), curr[name], true);
                }
                else
                    result[name] = tslib_1.__assign(tslib_1.__assign({}, result[name]), curr[name]);
            }
            // 合并 方法
            else if (typeof curr[name] === 'function') {
                var isProtoFn = name in pageMethodNames;
                if (isProtoFn) {
                    protoFns[name] = protoFns[name] || [];
                    protoFns[name].push(curr[name]);
                }
                // 非 proto method 只生效最后一个
                else {
                    if (typeof result[name] === 'function') {
                        api_1.logger.warn('mixins 中重复定义方法，将生效最后声明的', name);
                    }
                    result[name] = curr[name];
                }
            }
            // 其他的 赋值
            else {
                result[name] = curr[name];
            }
        });
        return result;
    }, {});
    Object.keys(merged).forEach(function (name) {
        if (name in pageOptions) {
            if (typeof merged[name] === 'object') {
                var currType = typeof pageOptions[name];
                if (currType !== 'object') {
                    api_1.logger.warn("".concat(name, "\u5728 mixins \u4E2D\u5B9A\u4E49\u4E3A object, \u4F46\u662F\u5728\u5F53\u524D Page \u4E3A").concat(currType));
                    return;
                }
                pageOptions[name] = tslib_1.__assign(tslib_1.__assign({}, merged[name]), pageOptions[name]);
            }
        }
        else {
            pageOptions[name] = merged[name];
        }
    });
    // 处理 proto 方法的合并
    Object.keys(protoFns).forEach(function (name) {
        var originalFn = pageOptions[name];
        // 返回值
        var fnConfig = pageMethodNames[name];
        var result;
        pageOptions[name] = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var _c = 0, _d = protoFns[name]; _c < _d.length; _c++) {
                    var fn = _d[_c];
                    var r = fn.call.apply(fn, tslib_1.__spreadArray([this], args, false));
                    result = (_a = fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r) === null || _a === void 0 ? void 0 : _a.call(fnConfig, result, r);
                }
            }
            catch (err) {
                api_1.logger.error('mixins 函数报错', err);
            }
            if (originalFn) {
                var r = originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
                result = (_b = fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r) === null || _b === void 0 ? void 0 : _b.call(fnConfig, result, r);
            }
            if (fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r)
                return result;
        };
    });
}
/**
 * 增强页面功能: 注入 adapters/hooks、转换声明周期等
 */
function enhancePage(options, sourceType) {
    if (!sourceType) {
        api_1.logger.warn("createPage \u7F3A\u5C11 sourceType \u53EF\u80FD\u4F1A\u5BFC\u81F4\u5C0F\u7A0B\u5E8F\u9875\u9762\u521D\u59CB\u5316\u9519\u8BEF");
    }
    var $morHooks = (0, api_1.getSharedProperty)('$morHooks', options);
    var pageOptions = tslib_1.__assign({}, options);
    if (!$morHooks) {
        api_1.logger.warn('createPage 依赖 $morHooks，请检查配置');
        return options;
    }
    // mixins 支持
    processMixins(pageOptions, sourceType);
    // 触发 pageOnConstruct hook, 兼容旧版本当 pageOnConstruct 不存在时用 pageOnInit 兜底
    var pageOnConstruct = $morHooks.pageOnConstruct || $morHooks.pageOnInit;
    pageOnConstruct.call(pageOptions, pageOptions);
    // 添加页面生命周期 hook
    hookPageLifeCycle(pageOptions, sourceType);
    // 跨端支持的页面运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    /* MOR_PAGE_POLYFILL_INVOKE_REPLACER */ '';
    // 执行 page 适配器初始化
    if (PAGE_ADAPTERS === null || PAGE_ADAPTERS === void 0 ? void 0 : PAGE_ADAPTERS.length) {
        PAGE_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initPage) === 'function') {
                adapter.initPage(pageOptions);
            }
            else {
                api_1.logger.error("adapter.initPage \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    return pageOptions;
}
exports.enhancePage = enhancePage;
/**
 * 注册 Page 函数
 */
function createPage(options, sourceType) {
    api_1.logger.time('page-init');
    var pageOptions = enhancePage(options, sourceType);
    api_1.logger.timeEnd('page-init');
    return Page(pageOptions);
}
exports.createPage = createPage;
/**
 * 注册页面转端适配器
 * @param adapters - 页面转端适配器
 */
function registerPageAdapters(adapters) {
    PAGE_ADAPTERS.push.apply(PAGE_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerPageAdapters = registerPageAdapters;
/**
 * 支付宝 Page 页面注册
 * @param options - 小程序页面配置
 */
function aPage(options) {
    return createPage(options, api_1.SOURCE_TYPE.ALIPAY);
}
exports.aPage = aPage;
/**
 * 微信 Page 页面注册
 * @param options - 小程序页面配置
 */
function wPage(options) {
    return createPage(options, api_1.SOURCE_TYPE.WECHAT);
}
exports.wPage = wPage;
//# sourceMappingURL=page.js.map
}, function(modId) { var map = {"./utils/constants":1737470303022,"./utils/invokeHook":1737470303028,"./utils/invokeOriginalFunction":1737470303026,"./utils/isPromise":1737470303030}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303030, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
function isPromise(obj) {
    return (!!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function');
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303031, function(require, module, exports) {

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.wPageToComponent = exports.aPageToComponent = exports.PageToComponent = void 0;
var api_1 = require("@morjs/api");
var component_1 = require("./component");
var page_1 = require("./page");
var invokeOriginalFunction_1 = require("./utils/invokeOriginalFunction");
var COMPONENT_LIFETIME_MAPPINGS = {
    onLoad: (_a = {},
        _a[api_1.SOURCE_TYPE.ALIPAY] = 'onInit',
        _a[api_1.SOURCE_TYPE.WECHAT] = 'attached',
        _a),
    onReady: (_b = {},
        _b[api_1.SOURCE_TYPE.ALIPAY] = 'didMount',
        _b[api_1.SOURCE_TYPE.WECHAT] = 'ready',
        _b),
    onUnload: (_c = {},
        _c[api_1.SOURCE_TYPE.ALIPAY] = 'didUnmount',
        _c[api_1.SOURCE_TYPE.WECHAT] = 'detached',
        _c)
};
var COMPONENT_PAGE_LIFETIME_MAPPINGS = {
    onShow: 'show',
    onHide: 'hide',
    onResize: 'resize'
};
/**
 * 将页面作为组件使用, 仅供特殊场景下的使用
 * 不保证完全的兼容性
 *
 * 转换页面配置为组件配置
 *
 * @param pageOptions - 页面配置
 * @param sourceType - 源码类型
 * @param features - 功能配置
 * @returns 组件配置
 */
function PageToComponent(pageOptions, sourceType, features) {
    var _a;
    if (features === void 0) { features = {}; }
    // 页面增强（含转端逻辑）
    var opts = (0, page_1.enhancePage)(pageOptions, sourceType);
    // 直接透传的属性
    var data = opts.data || {};
    var observers = opts.observers || {};
    // 需要插入到 this 的数据
    var thisData = {};
    // 组件方法
    var methods = {};
    // 组件生命周期
    var lifetimes = {};
    // 页面生命周期
    var pageLifetimes = {};
    var isAlipaySource = sourceType === api_1.SOURCE_TYPE.ALIPAY;
    // 兼容支付宝
    if (isAlipaySource && typeof ((_a = opts === null || opts === void 0 ? void 0 : opts.events) === null || _a === void 0 ? void 0 : _a.onResize) === 'function') {
        pageLifetimes['resize'] = opts.events.onResize;
        // 其他事件组件不支持, 直接移除
        delete opts.events;
    }
    // 遍历每一个属性逐个分配
    for (var key in opts) {
        var value = opts[key];
        if (key === 'data')
            continue;
        if (key === 'observers')
            continue;
        if (key === 'methods') {
            Object.assign(methods, value || {});
            continue;
        }
        if (key === 'pageLifetimes') {
            Object.assign(pageLifetimes, value || {});
            continue;
        }
        if (key === 'lifetimes') {
            Object.assign(lifetimes, value || {});
            continue;
        }
        if (typeof value === 'function') {
            switch (key) {
                // 组件生命周期对齐
                case 'onLoad':
                case 'onReady':
                case 'onUnload':
                    lifetimes[COMPONENT_LIFETIME_MAPPINGS[key][sourceType]] = value;
                    break;
                // 页面生命周期对齐
                case 'onShow':
                case 'onHide':
                case 'onResize':
                    pageLifetimes[COMPONENT_PAGE_LIFETIME_MAPPINGS[key]] = value;
                    break;
                // 支付宝或微信原生组件生命周期
                case 'onInit':
                case 'didMount':
                case 'didUnmount':
                case 'created':
                case 'attached':
                case 'ready':
                case 'detached':
                    lifetimes[key] = value;
                    break;
                // 其他函数配置为方法
                default:
                    methods[key] = value;
                    break;
            }
        }
        // 其他属性直接添加到 thisData
        else {
            thisData[key] = value;
        }
    }
    // 转换出来的组件
    var componentOptions = {
        data: data,
        observers: observers,
        methods: methods,
        pageLifetimes: pageLifetimes
    };
    // 合并 lifetimes
    Object.assign(componentOptions, lifetimes);
    // 注入 thisData 到 组件 this 上下文中
    function injectThisData() {
        Object.assign(this, thisData);
    }
    // 挂载 thisData
    var hookByLifetime = isAlipaySource ? 'onInit' : 'created';
    componentOptions[hookByLifetime] = (0, api_1.compose)([
        injectThisData,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)(hookByLifetime, componentOptions)
    ]);
    // 组件增强（含转端逻辑）
    return (0, component_1.enhanceComponent)(componentOptions, sourceType, {
        // 默认为 false
        invokeComponentHooks: features.invokeComponentHooks == null
            ? false
            : features.invokeComponentHooks
    });
}
exports.PageToComponent = PageToComponent;
/**
 * 支付宝 Page 转组件辅助函数
 * @param options - 小程序页面配置
 * @param features - 功能开关
 * @returns 返回组件配置
 */
function aPageToComponent(options, features) {
    if (features === void 0) { features = {}; }
    return PageToComponent(options, api_1.SOURCE_TYPE.ALIPAY, features);
}
exports.aPageToComponent = aPageToComponent;
/**
 * 微信 Page 页面转组件辅助函数
 * @param options - 小程序页面配置
 * @param features - 功能开关
 * @returns 返回组件配置
 */
function wPageToComponent(options, features) {
    if (features === void 0) { features = {}; }
    return PageToComponent(options, api_1.SOURCE_TYPE.WECHAT, features);
}
exports.wPageToComponent = wPageToComponent;
//# sourceMappingURL=pageToComponent.js.map
}, function(modId) { var map = {"./component":1737470303027,"./page":1737470303029,"./utils/invokeOriginalFunction":1737470303026}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303032, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.wPlugin = exports.aPlugin = exports.createPlugin = void 0;
var tslib_1 = require("tslib");
var api_1 = require("@morjs/api");
/**
 * 插件构造函数
 * @param options - 插件选项
 * @param options.getApp - 插件使用的 getApp 构造函数
 * @returns Mor 小程序插件对象 (用于和宿主小程序交换数据或能力)
 */
function createPlugin(pluginOptions) {
    var getApp = (pluginOptions || {}).getApp;
    if (typeof getApp === 'undefined') {
        api_1.logger.error('插件入口必须传 getApp');
        return;
    }
    delete pluginOptions.getApp;
    var app = getApp();
    var plugin = tslib_1.__assign(tslib_1.__assign({ getApp: getApp, $isMorPlugin: true }, pluginOptions), { internalInit: function (options) {
            var $hostEvent = (options !== null && options !== void 0 ? options : {}).$event;
            // 宿主的 event
            if (!this.$hostEvent && $hostEvent) {
                this.$hostEvent = $hostEvent;
                var app_1 = this.getApp();
                app_1.$hostEvent = $hostEvent;
            }
        }, morInit: function (extend) {
            var app = this.getApp();
            if (!app.$host)
                app.$host = {};
            Object.keys(extend).forEach(function (name) {
                app.$host[name] = extend[name];
            });
        } });
    if (app.$event)
        plugin.$pluginEvent = app.$event;
    return plugin;
}
exports.createPlugin = createPlugin;
/**
 * 支付宝插件构造函数
 */
function aPlugin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return createPlugin.apply(void 0, args);
}
exports.aPlugin = aPlugin;
/**
 * 微信插件构造函数
 */
function wPlugin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return createPlugin.apply(void 0, args);
}
exports.wPlugin = wPlugin;
//# sourceMappingURL=plugin.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1737470303033, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("@morjs/api");
(function morPolyfill() {
    try {
        Promise.prototype.finally =
            Promise.prototype.finally ||
                function morPolyfillPromiseFinally(onFinally) {
                    var isFunction = typeof onFinally === 'function';
                    return this.then(isFunction
                        ? function (value) {
                            return Promise.resolve(onFinally()).then(function () {
                                return value;
                            });
                        }
                        : onFinally, isFunction
                        ? function (reason) {
                            return Promise.resolve(onFinally()).then(function () {
                                throw reason;
                            });
                        }
                        : onFinally);
                };
    }
    catch (err) {
        api_1.logger.error('polyfill', err);
    }
})();
//# sourceMappingURL=polyfill.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1737470303020);
})()
//miniprogram-npm-outsideDeps=["tslib","@morjs/api"]
//# sourceMappingURL=index.js.map