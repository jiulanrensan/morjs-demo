"use strict";
require('./mor.i.js');
(my["mor_modules"] = my["mor_modules"] || []).push([["app"],{

/***/ "./adapters/adaptersToAlipay.ts":
/*!**************************************!*\
  !*** ./adapters/adaptersToAlipay.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "adaptersToAlipay": function() { return /* binding */ adaptersToAlipay; }
/* harmony export */ });
/* unused harmony exports addDefaultGlobalFields, optionsAddDefaultFields */
/* harmony import */ var _morjs_runtime_mini_lib_common_behaviorOrMixin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @morjs/runtime-mini/lib/common/behaviorOrMixin */ "../node_modules/@morjs/runtime-mini/lib/common/behaviorOrMixin.js");
/* harmony import */ var _morjs_runtime_mini__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @morjs/runtime-mini */ "../node_modules/@morjs/runtime-mini/esm/index.js");
/* harmony import */ var _morjs_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @morjs/api */ "../node_modules/@morjs/api/esm/api.js");
/* harmony import */ var _morjs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @morjs/core */ "../node_modules/@morjs/core/esm/component.js");
/* harmony import */ var _morjs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @morjs/core */ "../node_modules/@morjs/core/esm/page.js");
/**
 * 运行时适配
 */




function adaptersToAlipay() {
    (0,_morjs_runtime_mini__WEBPACK_IMPORTED_MODULE_0__.initAdapters)({
        sourceType: 'wechat',
        target: 'alipay',
        createApi: _morjs_api__WEBPACK_IMPORTED_MODULE_1__.createApi,
        registerComponentAdapters: _morjs_core__WEBPACK_IMPORTED_MODULE_2__.registerComponentAdapters,
        registerPageAdapters: _morjs_core__WEBPACK_IMPORTED_MODULE_3__.registerPageAdapters
    });
    addDefaultGlobalFields();
}
function addDefaultGlobalFields() {
    // @ts-ignore
    global.Behavior = _morjs_runtime_mini_lib_common_behaviorOrMixin__WEBPACK_IMPORTED_MODULE_4__.Behavior;
    /**
     * 神策sdk有使用 __wxConfig __wxAppCode__
     */
    Object.assign(global, {
        __wxConfig: {},
        __wxAppCode__: {}
    });
}
/**
 * 微信小程序的生命周期方法的入参里会有字段
 * query
 * referrerInfo
 * 支付宝没有，要添加默认值，避免报错
 */
function optionsAddDefaultFields(options) {
    if (!options)
        return options;
    const { qurey, referrerInfo } = options;
    return Object.assign(options, {
        query: qurey ? qurey : {},
        referrerInfo: referrerInfo ? referrerInfo : {}
    });
}


/***/ }),

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _adapters_adaptersToAlipay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adapters/adaptersToAlipay */ "./adapters/adaptersToAlipay.ts");
var __MOR_APP__ = (__webpack_require__(/*! @morjs/core */ "../node_modules/@morjs/core/esm/index.js").createApp);

var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/@morjs/api/esm/index.js").mor);

// app.ts
// global.Symbol = Symbol
// global.Map = Map
// global.Set = Set

(0,_adapters_adaptersToAlipay__WEBPACK_IMPORTED_MODULE_0__.adaptersToAlipay)();
__MOR_APP__({
    globalData: {},
    onLaunch() {
        __MOR_API__.setStorageSync('logs', [1, 2, 3, 4, 5]);
        // 展示本地存储能力
        const logs = __MOR_API__.getStorageSync('logs') || [];
        console.log('logs', logs);
        const name = __MOR_API__.getStorageSync('name') || [];
        console.log('name alipay', name);
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./app.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.js.map