/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/calender-box.js":
/*!****************************!*\
  !*** ./js/calender-box.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calender-setup.js */ \"./js/calender-setup.js\");\n\n\nfunction openCalender() {\n  document.querySelector(\".calender-picker\").classList.remove(\"close-calender\");\n}\n\nfunction displayCalenderGrid() {\n  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();\n  // check events by this day\n  var HijriConfiguration = returnHijriConfiguration(date);\n  var yearNumber = HijriConfiguration.hijriYear % 210;\n  var firstDayOfYear = _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.daysFormat[_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.century[yearNumber]];\n  var currentMonthHijri = _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.getCurrentMonthHijri();\n  var firstDayNumOfMonth = (_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.countOfMonthDays(HijriConfiguration.hijriMonth - 1, yearNumber) + parseInt(firstDayOfYear.count)) % 7; // calculate the first weekDay of month\n  // Display information about date\n\n  if (document.getElementById(\"theDate\")) {\n    document.getElementById(\"theDate\").textContent = \"\".concat(_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.months[HijriConfiguration.hijriMonth], \" \").concat(HijriConfiguration.hijriYear);\n  } // Loop of month days\n\n\n  if (document.querySelector(\".calender-list-grid-body\")) {\n    var dyesGrid = document.querySelector(\".calender-list-grid-body\");\n    dyesGrid.innerHTML = \"\";\n\n    for (var i = 1; i <= firstDayNumOfMonth; i++) {\n      dyesGrid.innerHTML += \"<span class=\\\"empty\\\"></span>\";\n    }\n\n    for (var _i = 1; _i <= _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.countDayOfMonth(HijriConfiguration.hijriMonth, yearNumber); _i++) {\n      var _hijri = new HijriDate(HijriConfiguration.hijriYear, HijriConfiguration.hijriMonth, _i);\n\n      var gregorian = _hijri.toGregorian();\n\n      var GregorianDateIncrement = new Date(gregorian);\n\n      if (_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.getCurrentDateHijri() === _i && HijriConfiguration.hijriMonth == currentMonthHijri) {\n        dyesGrid.innerHTML += \"<span data-current_date=\\\"\".concat(GregorianDateIncrement, \"\\\" class=\\\"active\\\">\").concat(_i, \" <em> \").concat(GregorianDateIncrement.getDate(), \" </em>  </span>\");\n      } else {\n        dyesGrid.innerHTML += \"<span data-current_date=\\\"\".concat(GregorianDateIncrement, \"\\\">\").concat(_i, \" <em> \").concat(GregorianDateIncrement.getDate(), \" </em>  </span>\");\n      }\n    }\n\n    for (var _i2 = 1; _i2 <= 35 - (firstDayNumOfMonth + _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.countDayOfMonth(HijriConfiguration.hijriMonth, yearNumber)); _i2++) {\n      dyesGrid.innerHTML += \"<span class=\\\"empty\\\"></span>\";\n    }\n  }\n} // Go Prev [ Month - year - day]\n\n\nfunction goPrev() {\n  var HIJRI_CONFIGURATION = returnHijriConfiguration(_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate);\n  var date = new Date(_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate);\n  var theNewDate = date;\n  HIJRI_CONFIGURATION.hijriMonth -= 1;\n  theNewDate = date.setDate(date.getDate() - _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.countDayOfMonth(HIJRI_CONFIGURATION.hijriMonth + 1, _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.getCurrentYearHijri()));\n  displayCalenderGrid(theNewDate);\n  _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate = new Date(theNewDate);\n\n  if (_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.currentHijriDate == new Date(theNewDate).toLocaleDateString(\"ar-SA\")) {\n    document.getElementById(\"today\").classList.add(\"hide\");\n  } else {\n    document.getElementById(\"today\").classList.remove(\"hide\");\n  }\n}\n\nfunction goNext() {\n  var HIJRI_CONFIGURATION = returnHijriConfiguration(_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate);\n  var date = new Date(_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate);\n  var theNewDate = date;\n  HIJRI_CONFIGURATION.hijriMonth += 1;\n  theNewDate = date.setDate(date.getDate() + _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.countDayOfMonth(HIJRI_CONFIGURATION.hijriMonth, _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.getCurrentYearHijri()));\n  displayCalenderGrid(theNewDate);\n\n  if (_calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.currentHijriDate == new Date(theNewDate).toLocaleDateString(\"ar-SA\")) {\n    document.getElementById(\"today\").classList.add(\"hide\");\n  } else {\n    document.getElementById(\"today\").classList.remove(\"hide\");\n  }\n\n  _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate = new Date(theNewDate);\n}\n\nfunction returnHijriConfiguration(date) {\n  var gregorianDate = new Date(date);\n  var hijri = gregorianDate.toHijri();\n  return {\n    // hijriMonth: parseInt(Calender.a2e(dateHijri.split(\"/\")[1])),\n    // hijriDayNum: parseInt(Calender.a2e(dateHijri.split(\"/\")[0])),\n    // hijriYear: parseInt(Calender.a2e(dateHijri.split(\"/\")[2])),\n    hijriMonth: hijri._month,\n    hijriDayNum: hijri._date,\n    hijriYear: hijri._year\n  };\n}\n\nfunction enterYear() {\n  var year = document.getElementById(\"changeByYear\");\n  var hijri = new HijriDate(+year.value, 1, 1);\n  var gregorian = hijri.toGregorian();\n  displayCalenderGrid(gregorian);\n  _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate = gregorian;\n}\n\nfunction __today() {\n  document.getElementById(\"today\").classList.add(\"hide\");\n  displayCalenderGrid();\n  _calender_setup_js__WEBPACK_IMPORTED_MODULE_0__.theCurrentDate.gregorianDate = new Date();\n} // Events\n\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  displayCalenderGrid(); // display calender\n\n  document.getElementById(\"btnChangeByYear\").addEventListener(\"click\", enterYear); // change by years\n\n  document.getElementById(\"today\").addEventListener(\"click\", __today); // Back to today\n  // invoke go next and go prev\n\n  document.getElementById(\"goNext\").addEventListener(\"click\", goNext);\n  document.getElementById(\"goPrev\").addEventListener(\"click\", goPrev);\n  if (document.getElementById('dateChecker')) document.getElementById('dateChecker').addEventListener('click', openCalender);\n});\n\n//# sourceURL=webpack://fatimi-cal/./js/calender-box.js?");

/***/ }),

/***/ "./js/calender-setup.js":
/*!******************************!*\
  !*** ./js/calender-setup.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"a2e\": () => (/* binding */ a2e),\n/* harmony export */   \"century\": () => (/* binding */ century),\n/* harmony export */   \"countDayOfMonth\": () => (/* binding */ countDayOfMonth),\n/* harmony export */   \"countOfMonthDays\": () => (/* binding */ countOfMonthDays),\n/* harmony export */   \"daysFormat\": () => (/* binding */ daysFormat),\n/* harmony export */   \"displayListOfMonths\": () => (/* binding */ displayListOfMonths),\n/* harmony export */   \"e2a\": () => (/* binding */ e2a),\n/* harmony export */   \"evenMonth\": () => (/* binding */ evenMonth),\n/* harmony export */   \"getCentury\": () => (/* binding */ getCentury),\n/* harmony export */   \"leapYears\": () => (/* binding */ leapYears),\n/* harmony export */   \"months\": () => (/* binding */ months),\n/* harmony export */   \"oddMonth\": () => (/* binding */ oddMonth),\n/* harmony export */   \"theCurrentDate\": () => (/* binding */ theCurrentDate)\n/* harmony export */ });\nvar century = {\n  1: \"ه\",\n  2: \"ب\",\n  3: \"ز\",\n  4: \"د\",\n  5: \"ا\",\n  6: \"و\",\n  7: \"ج\",\n  8: \"ز\",\n  9: \"ه\",\n  10: \"ب\",\n  11: \"ز\",\n  12: \"د\",\n  13: \"ا\",\n  14: \"و\",\n  15: \"ج\",\n  16: \"ز\",\n  17: \"ه\",\n  18: \"ب\",\n  19: \"و\",\n  20: \"د\",\n  21: \"ا\",\n  22: \"و\",\n  23: \"ج\",\n  24: \"ز\",\n  25: \"ه\",\n  26: \"ب\",\n  27: \"و\",\n  28: \"د\",\n  29: \"ا\",\n  30: \"و\",\n  31: \"ج\",\n  32: \"ز\",\n  33: \"ه\",\n  34: \"ب\",\n  35: \"و\",\n  36: \"د\",\n  37: \"ا\",\n  38: \"ه\",\n  39: \"ج\",\n  40: \"ز\",\n  41: \"ه\",\n  42: \"ب\",\n  43: \"و\",\n  44: \"د\",\n  45: \"ا\",\n  46: \"ه\",\n  47: \"ج\",\n  48: \"ز\",\n  49: \"د\",\n  50: \"ب\",\n  51: \"و\",\n  52: \"د\",\n  53: \"ا\",\n  54: \"ه\",\n  55: \"ج\",\n  56: \"ز\",\n  57: \"د\",\n  58: \"ب\",\n  59: \"و\",\n  60: \"د\",\n  61: \"ا\",\n  62: \"ه\",\n  63: \"ج\",\n  64: \"ز\",\n  65: \"د\",\n  66: \"ب\",\n  67: \"و\",\n  68: \"ج\",\n  69: \"ا\",\n  70: \"ه\",\n  71: \"ج\",\n  72: \"ز\",\n  73: \"د\",\n  74: \"ب\",\n  75: \"و\",\n  76: \"ج\",\n  77: \"ا\",\n  78: \"ه\",\n  79: \"ب\",\n  80: \"ز\",\n  81: \"د\",\n  82: \"ب\",\n  83: \"و\",\n  84: \"ج\",\n  85: \"ا\",\n  86: \"ه\",\n  87: \"ب\",\n  88: \"ز\",\n  89: \"د\",\n  90: \"ب\",\n  91: \"و\",\n  92: \"ج\",\n  93: \"ا\",\n  94: \"ه\",\n  95: \"ب\",\n  96: \"ز\",\n  97: \"د\",\n  98: \"ا\",\n  99: \"و\",\n  100: \"ج\",\n  101: \"ا\",\n  102: \"ه\",\n  103: \"ب\",\n  104: \"ز\",\n  105: \"د\",\n  106: \"ا\",\n  107: \"و\",\n  108: \"ج\",\n  109: \"ز\",\n  110: \"ه\",\n  111: \"ب\",\n  112: \"ز\",\n  113: \"د\",\n  114: \"ا\",\n  115: \"و\",\n  116: \"ج\",\n  117: \"ز\",\n  118: \"ه\",\n  119: \"ب\",\n  120: \"ز\",\n  121: \"د\",\n  122: \"ا\",\n  123: \"و\",\n  124: \"ج\",\n  125: \"ز\",\n  126: \"ه\",\n  127: \"ب\",\n  128: \"و\",\n  129: \"د\",\n  130: \"ا\",\n  131: \"و\",\n  132: \"ج\",\n  133: \"ز\",\n  134: \"ه\",\n  135: \"ب\",\n  136: \"و\",\n  137: \"د\",\n  138: \"ا\",\n  139: \"ه\",\n  140: \"ج\",\n  141: \"ز\",\n  142: \"ه\",\n  143: \"ب\",\n  144: \"و\",\n  145: \"د\",\n  146: \"ا\",\n  147: \"ه\",\n  148: \"ج\",\n  149: \"ز\",\n  150: \"ه\",\n  151: \"ب\",\n  152: \"و\",\n  153: \"د\",\n  154: \"ا\",\n  155: \"ه\",\n  156: \"ج\",\n  157: \"ز\",\n  158: \"د\",\n  159: \"ب\",\n  160: \"و\",\n  161: \"د\",\n  162: \"ا\",\n  163: \"ه\",\n  164: \"ج\",\n  165: \"ز\",\n  166: \"د\",\n  167: \"ب\",\n  168: \"و\",\n  169: \"ج\",\n  170: \"ا\",\n  171: \"ه\",\n  172: \"ج\",\n  173: \"ز\",\n  174: \"د\",\n  175: \"ب\",\n  176: \"و\",\n  177: \"ج\",\n  178: \"ا\",\n  179: \"ه\",\n  180: \"ج\",\n  181: \"ز\",\n  182: \"د\",\n  183: \"ب\",\n  184: \"و\",\n  185: \"ج\",\n  186: \"ا\",\n  187: \"ه\",\n  188: \"ب\",\n  189: \"ز\",\n  190: \"د\",\n  191: \"ب\",\n  192: \"و\",\n  193: \"ج\",\n  194: \"ا\",\n  195: \"ه\",\n  196: \"ب\",\n  197: \"ز\",\n  198: \"د\",\n  199: \"ا\",\n  200: \"و\",\n  201: \"ج\",\n  202: \"ا\",\n  203: \"ه\",\n  204: \"ب\",\n  205: \"ز\",\n  206: \"د\",\n  207: \"ا\",\n  208: \"و\",\n  209: \"ج\",\n  210: \"ا\"\n}; // Every 30 years\n\nvar leapYears = [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29, 32, 35, 38, 40, 43, 46, 49, 51, 54, 57, 59, 62, 65, 68, 70, 73, 76, 79, 81, 84, 87, 89, 92, 95, 98, 100, 103, 106, 109, 111, 114, 117, 119, 122, 125, 128, 130, 133, 136, 139, 141, 144, 147, 149, 152, 155, 158, 160, 163, 166, 169, 171, 174, 177, 179, 182, 185, 188, 190, 193, 196, 199, 201, 204, 207, 209];\nvar daysFormat = {\n  ا: {\n    day: \"الاحد\",\n    count: 0\n  },\n  ب: {\n    day: \"الأثنين\",\n    count: 1\n  },\n  ج: {\n    day: \"الثلاثاء\",\n    count: 2\n  },\n  د: {\n    day: \"الأربعاء\",\n    count: 3\n  },\n  ه: {\n    day: \"الخميس\",\n    count: 4\n  },\n  و: {\n    day: \"الجمعة\",\n    count: 5\n  },\n  ز: {\n    day: \"السبت\",\n    count: 6\n  }\n}; //  const e2a = (s) => s.replace(/[0-9]/g, (d) => \"0123456789\".indexOf(d));\n\nvar e2a = function e2a(s) {\n  return s.replace(/\\d/g, function (d) {\n    return '٠١٢٣٤٥٦٧٨٩'[d];\n  });\n};\nvar a2e = function a2e(s) {\n  return s.replace(/[٠-٩]/g, function (d) {\n    return \"٠١٢٣٤٥٦٧٨٩\".indexOf(d);\n  });\n};\nvar oddMonth = 30;\nvar evenMonth = 29;\nvar months = {\n  1: \"محرم\",\n  2: \"صفر\",\n  3: \"ربيع الاول\",\n  4: \"ربيع الثاني\",\n  5: \"جمادي الاولي\",\n  6: \"جمادي الثاني\",\n  7: \"رجب\",\n  8: \"شبعان\",\n  9: \"شهر رمضان\",\n  10: \"شوال\",\n  11: \"ذو القعده\",\n  12: \"ذو الحجة\"\n};\nvar theCurrentDate = {\n  gregorianDate: new Date(),\n  currentHijriDate: new Date().toLocaleDateString(\"ar-SA\"),\n  getCurrentDateHijri: function getCurrentDateHijri() {\n    return parseInt(a2e(this.currentHijriDate.split(\"/\")[0]));\n  },\n  getCurrentMonthHijri: function getCurrentMonthHijri() {\n    return parseInt(a2e(this.currentHijriDate.split(\"/\")[1]));\n  },\n  getCurrentYearHijri: function getCurrentYearHijri() {\n    return parseInt(a2e(this.currentHijriDate.split(\"/\")[2]));\n  },\n  yearHijri: parseInt(a2e(new Date().toLocaleDateString(\"ar-SA\", {\n    year: 'numeric'\n  })))\n}; // Get the century for year\n\nfunction getCentury(year) {\n  switch (true) {\n    case year < 31:\n      return \"1\";\n      break;\n\n    case year > 30 && year < 61:\n      return \"2\";\n      break;\n\n    case year > 60 && year < 91:\n      return \"3\";\n      break;\n\n    case year > 90 && year < 121:\n      return \"4\";\n      break;\n\n    case year > 120 && year < 151:\n      return \"5\";\n      break;\n\n    case year > 150 && year < 181:\n      return \"6\";\n      break;\n\n    case year > 180 && year < 211:\n      return \"7\";\n      break;\n  }\n} // CountOfMonthDays\n\nfunction countDayOfMonth(month, yearNumber) {\n  if (month % 2 == 0) {\n    if (month == 12 && leapYears.includes(yearNumber)) return 30; // Year Is Leap\n    else return 29; // Even months\n  } else return 30; // odd months\n\n}\nfunction countOfMonthDays(monthCount, yearNumber) {\n  var result = 0;\n\n  for (var i = 1; i <= monthCount; i++) {\n    if (i % 2 == 0) {\n      if (i == 12 && leapYears.includes(yearNumber)) result += 30;else result += 29;\n    } else result += 30;\n  }\n\n  return result;\n}\nfunction displayListOfMonths() {\n  var listOfMonth = document.getElementById(\"listOfMonth\");\n  listOfMonth.innerHTML = \"\";\n\n  for (var _i = 0, _Object$keys = Object.keys(months); _i < _Object$keys.length; _i++) {\n    var month = _Object$keys[_i];\n    listOfMonth.innerHTML += \"<option value=\\\"\".concat(month, \"\\\">\").concat(months[month], \"</option>\");\n  }\n}\n\n//# sourceURL=webpack://fatimi-cal/./js/calender-setup.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/calender-box.js");
/******/ 	
/******/ })()
;