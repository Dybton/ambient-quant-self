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

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/***/ (() => {

eval("var trackedWebsites = [\"linkedin.com\", \"facebook.com\", \"youtube.com\"];\nvar timeSpent = trackedWebsites.reduce(function (acc, site) {\n  acc[site] = 0;\n  return acc;\n}, {});\nchrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {\n  if (changeInfo.status === 'complete') {\n    handleNavigation(tab.url);\n  }\n});\nvar currentSite = null;\nvar lastVisitedTime = null;\nfunction handleNavigation(url) {\n  var newSite = trackedWebsites.find(function (site) {\n    return url.includes(site);\n  });\n  if (currentSite) {\n    var timeSpentOnSite = Date.now() - lastVisitedTime;\n    timeSpent[currentSite] += timeSpentOnSite;\n  }\n  currentSite = newSite;\n  lastVisitedTime = Date.now();\n}\nchrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {\n  if (request.type === 'getTimeSpentData') {\n    sendResponse(timeSpent);\n  }\n});\n\n//# sourceURL=webpack://chrome-time-tracker/./src/background/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background/index.js"]();
/******/ 	
/******/ })()
;