/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/index.js":
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
/***/ (() => {

eval("var backgroundPort = chrome.runtime.connect({\n  name: 'content-background'\n});\nfunction handleNavigation(url) {\n  backgroundPort.postMessage({\n    type: 'navigation',\n    url: url\n  });\n}\nwindow.addEventListener('DOMContentLoaded', function () {\n  handleNavigation(window.location.href);\n});\nwindow.addEventListener('popstate', function () {\n  handleNavigation(window.location.href);\n});\nwindow.addEventListener('hashchange', function () {\n  handleNavigation(window.location.href);\n});\nvar observer = new MutationObserver(function () {\n  handleNavigation(window.location.href);\n});\nobserver.observe(document.documentElement, {\n  childList: true,\n  subtree: true\n});\n\n//# sourceURL=webpack://chrome-time-tracker/./src/content/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/content/index.js"]();
/******/ 	
/******/ })()
;