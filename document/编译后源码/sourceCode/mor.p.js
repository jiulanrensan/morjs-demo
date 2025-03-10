/**
 * 配置文件
 */
var appConfig = {
  "pages": [
    "pages/index/index"
  ],
  "subPackages": [
    {
      "root": "sourceSubPackage",
      "pages": [
        "index"
      ]
    }
  ],
  "tabBar": {
    "custom": true,
    "list": [
      {
        "pagePath": "pages/index/index"
      }
    ]
  },
  "window": {
    "navigationBarTextStyle": "black",
    "navigationStyle": "custom"
  },
  "usingComponents": {
    "pagoda-custom-tab-bar": "/components/customTabBar/index"
  },
  "resolveAlias": {
    "~/*": "/*"
  },
  "sitemapLocation": "sitemap.json",
  "globalObjectMode": "enable",
  "requirePolyfill": true
};
my.MOR_APP_CONFIG = appConfig;
export default appConfig;