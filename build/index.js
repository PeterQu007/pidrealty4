/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./src/CMA.js":
/*!********************!*\
  !*** ./src/CMA.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var WPDataTable = /*#__PURE__*/function () {
  function WPDataTable(table, cmaType) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, WPDataTable);

    this.table = table;
    this.cmaType = cmaType;
    this.tableID = $j(table).attr('data-wpdatatable_id');
    var is_mobile = false;

    if ($j('#pid-mobile').css('display') == 'none') {
      is_mobile = true;
    }

    this.is_mobile = is_mobile;
    var pathArray = window.location.pathname.split("/");
    var lastItem = pathArray.pop();

    if (lastItem == "") {
      lastItem = pathArray.pop();
    }

    if (lastItem != "cn") {
      this.events();
    }

    switch (this.cmaType) {
      case "active":
        //attached
        this.evaluateButton1();
        this.evaluateButton2();
        this.startOver();
        break;

      case "sold":
        //detached
        this.evaluateSoldButton1();
        this.evaluateSoldButton2();
        this.startOverSold();
        break;
    }
  } // events


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(WPDataTable, [{
    key: "events",
    value: function events() {
      var _this = this;

      var config = {
        attributes: false,
        childList: true,
        subtree: true
      };

      var callback = function callback(mutationsList, observer) {
        var _iterator = _createForOfIteratorHelper(mutationsList),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mutation = _step.value;

            if (mutation.type === "childList") {
              observer.disconnect();
              setTimeout(function () {
                _this.get_aggregates();

                _this.table_events();

                setTimeout(function () {
                  _this.evaluateByMarketPrice('active');

                  _this.evaluateByBCAChange('active');

                  _this.evaluateByMarketPrice('sold');

                  _this.evaluateByBCAChange('sold');
                }, 2000);
              }, 5000);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };

      var observer = new MutationObserver(callback);
      observer.observe(this.table, config);
    }
  }, {
    key: "table_events",
    value: function table_events() {
      var rows = this.table.querySelectorAll('tr');
      rows.forEach(function (row) {
        return row.addEventListener('click', function (e) {
          // console.log(e);
          var row = $j(e.target.parentNode);
          row.toggleClass('pid_clicked_table_row');
        });
      });
    }
  }, {
    key: "get_aggregates",
    value: function get_aggregates() {
      var colTotalPrice = 3;
      var colPricePerSF = 6;
      var colBCAChange = 4;
      var colBCALandValuePSF = 9;
      var colBCAHouseValuePSF = 10;
      var colBCATotalValuePSF = 11;

      switch (this.tableID) {
        case "34":
          colTotalPrice = 4;
          colPricePerSF = 6;
          colBCAChange = 5;
          this.setSummaryCMACell(34, "max", 4, this.cmaType); // total price

          this.setSummaryCMACell(34, "min", 4, this.cmaType);
          this.setSummaryCMACell(34, "avg", 4, this.cmaType);
          this.setSummaryCMACell(34, "max", 6, this.cmaType); // price per sf

          this.setSummaryCMACell(34, "min", 6, this.cmaType);
          this.setSummaryCMACell(34, "avg", 6, this.cmaType);
          this.setSummaryCMACell(34, "max", 5, this.cmaType); // bca change

          this.setSummaryCMACell(34, "min", 5, this.cmaType);
          this.setSummaryCMACell(34, "avg", 5, this.cmaType);
          break;

        case "35":
          colBCAChange = this.is_mobile ? 3 : 4;
          colBCALandValuePSF = this.is_mobile ? 7 : 11;
          colBCAHouseValuePSF = this.is_mobile ? 8 : 12;
          this.setSummaryCMACell(35, "max", colBCAChange, this.cmaType); // BCA Change

          this.setSummaryCMACell(35, "min", colBCAChange, this.cmaType);
          this.setSummaryCMACell(35, "avg", colBCAChange, this.cmaType);
          this.setSummaryCMACell(35, "max", colBCALandValuePSF, this.cmaType); // BCA Land Value per sqft

          this.setSummaryCMACell(35, "min", colBCALandValuePSF, this.cmaType);
          this.setSummaryCMACell(35, "avg", colBCALandValuePSF, this.cmaType);
          this.setSummaryCMACell(35, "max", colBCAHouseValuePSF, this.cmaType); // BCA Land Value per sqft

          this.setSummaryCMACell(35, "min", colBCAHouseValuePSF, this.cmaType);
          this.setSummaryCMACell(35, "avg", colBCAHouseValuePSF, this.cmaType);
      } // Check if need to hide Chinese Columns


      var xTD = $j('td[data-column_header="City_Name_CN"]');

      if (xTD.length > 0) {
        xTD.addClass("pid_wpdatatable_hidden_column");
      }
    }
  }, {
    key: "evaluateButton1",
    value: function evaluateButton1() {
      var _this2 = this;

      // PER Active Listings
      var buttonEvaluate = $j("#pid_cma_evaluate_submit");
      buttonEvaluate.click(function (e) {
        _this2.evaluateByMarketPrice('active');
      });
    }
  }, {
    key: "evaluateByMarketPrice",
    value: function evaluateByMarketPrice(cmaType) {
      var maxPricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_max") : "#pid_cma_".concat(cmaType, "_land_price_per_square_feet_max");
      var avgPricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_avg") : "#pid_cma_".concat(cmaType, "_land_price_per_square_feet_avg");
      var minPricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_min") : "#pid_cma_".concat(cmaType, "_land_price_per_square_feet_min");
      var maxImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_max") : "#pid_cma_".concat(cmaType, "_improve_price_per_square_feet_max");
      var avgImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_avg") : "#pid_cma_".concat(cmaType, "_improve_price_per_square_feet_avg");
      var minImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_".concat(cmaType, "_price_per_square_feet_min") : "#pid_cma_".concat(cmaType, "_improve_price_per_square_feet_min");
      var avgBCAChangePercentageCellLabel = this.tableID == 34 ? "" : "#pid_cma_".concat(cmaType, "_bca_change_perc_avg");
      var floorAreaCellLabel = "#pid_cma_total_floor_area";
      var landSizeCellLabel = "#pid_cma_total_land_size";
      var bcaTotalValueCellLabel = "#pid_cma_bca_total_value";
      var maxPrice = 0;
      var avgPrice = 0;
      var minPrice = 0;
      var maxImprovePrice = 0;
      var avgImprovePrice = 0;
      var minImprovePrice = 0;
      var maxPricePF = parseFloat($j(maxPricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var avgPricePF = parseFloat($j(avgPricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var minPricePF = parseFloat($j(minPricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var maxImprovePricePF = parseFloat($j(maxImprovePricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var avgImprovePricePF = parseFloat($j(avgImprovePricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var minImprovePricePF = parseFloat($j(minImprovePricePFCellLabel).text().trim().replace("$", "").replace(",", "").replace("%", ""));
      var floorArea = parseFloat($j(floorAreaCellLabel).text().trim().replace(",", ""));
      var landSize = parseFloat($j(landSizeCellLabel).text().trim().replace(",", ""));
      var bcaTotalValue = parseFloat($j(bcaTotalValueCellLabel).text().trim().replace(",", "").replace("$", ""));
      var avgBCAChangePercentage = parseFloat($j(avgBCAChangePercentageCellLabel).text().trim().replace(",", "").replace("%", ""));

      switch (this.tableID) {
        case "34":
          //attached
          maxPrice = maxPricePF * floorArea;
          avgPrice = avgPricePF * floorArea;
          minPrice = minPricePF * floorArea;
          break;

        case "35":
          //detached
          maxPrice = maxPricePF * landSize * (100 + avgBCAChangePercentage) / 100;
          avgPrice = avgPricePF * landSize * (100 + avgBCAChangePercentage) / 100;
          minPrice = minPricePF * landSize * (100 + avgBCAChangePercentage) / 100;
          maxImprovePrice = maxImprovePricePF * floorArea * (100 + avgBCAChangePercentage) / 100;
          avgImprovePrice = avgImprovePricePF * floorArea * (100 + avgBCAChangePercentage) / 100;
          minImprovePrice = minImprovePricePF * floorArea * (100 + avgBCAChangePercentage) / 100;
          maxPrice += maxImprovePrice;
          avgPrice += avgImprovePrice;
          minPrice += minImprovePrice;
          break;
      }

      var cmaMaxPrice = $j("#pid_market_".concat(cmaType, "_value_max"));
      var cmaAvgPrice = $j("#pid_market_".concat(cmaType, "_value_avg"));
      var cmaMinPrice = $j("#pid_market_".concat(cmaType, "_value_min")); // Create our number formatter.

      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      cmaMinPrice.text("------");
      cmaAvgPrice.text("------");
      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));

      if (bcaTotalValue < avgPrice * 1.1) {
        cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      }

      if (bcaTotalValue < minPrice) {
        cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
      } // show value-price-ratio gauge


      var rangeMax = maxPrice - minPrice;
      var subjectPrice = parseInt($j("#subject-".concat(cmaType, "-price-id")).attr('value'));
      var rangeSubjectVal = maxPrice - subjectPrice;
      var rangeAvg = maxPrice - avgPrice;
      var canvasNo = cmaType == 'active' ? 1 : 3;
      this.drawValuePriceRationGauge(0, rangeAvg, rangeMax, rangeSubjectVal, canvasNo);
    }
  }, {
    key: "evaluateSoldButton1",
    value: function evaluateSoldButton1() {
      var _this3 = this;

      var buttonEvaluate = $j("#pid_cma_sold_evaluate_submit");
      buttonEvaluate.click(function (e) {
        _this3.evaluateByMarketPrice('sold');
      });
    }
  }, {
    key: "evaluateButton2",
    value: function evaluateButton2() {
      var _this4 = this;

      var buttonEvaluate = $j("#pid_cma_evaluate_by_bca_submit");
      buttonEvaluate.click(function (e) {
        _this4.evaluateByBCAChange('active');
      });
    }
  }, {
    key: "evaluateByBCAChange",
    value: function evaluateByBCAChange(cmaType) {
      var bcaTotalValueCellLabel = "#pid_cma_bca_total_value";
      var maxPricePSFCellLabel = "#pid_cma_".concat(cmaType, "_bca_change_perc_max");
      var avgPricePSFCellLabel = "#pid_cma_".concat(cmaType, "_bca_change_perc_avg");
      var minPricePSFCellLabel = "#pid_cma_".concat(cmaType, "_bca_change_perc_min");
      var cmaMaxPriceCellLabel = "#pid_market_".concat(cmaType, "_value_max_2"); // get target cell

      var cmaAvgPriceCellLabel = "#pid_market_".concat(cmaType, "_value_avg_2");
      var cmaMinPriceCellLabel = "#pid_market_".concat(cmaType, "_value_min_2");
      var bcaTotalValue = parseFloat($j(bcaTotalValueCellLabel).text().trim().replace(/,/g, "").replace("$", ""));
      var maxPricePF = parseFloat($j(maxPricePSFCellLabel).text().trim().replace("$", "").replace(/,/g, "").replace("%", ""));
      var avgPricePF = parseFloat($j(avgPricePSFCellLabel).text().trim().replace("$", "").replace(/,/g, "").replace("%", ""));
      var minPricePF = parseFloat($j(minPricePSFCellLabel).text().trim().replace("$", "").replace(/,/g, "").replace("%", ""));
      var maxPrice = (100 + maxPricePF) / 100 * bcaTotalValue;
      var avgPrice = (100 + avgPricePF) / 100 * bcaTotalValue;
      var minPrice = (100 + minPricePF) / 100 * bcaTotalValue;
      var cmaMaxPrice = $j(cmaMaxPriceCellLabel); // get target cell

      var cmaAvgPrice = $j(cmaAvgPriceCellLabel);
      var cmaMinPrice = $j(cmaMinPriceCellLabel); // Create our number formatter.

      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0))); // show value-price-ratio gauge

      var rangeMax = maxPrice - minPrice;
      var subjectPrice = parseInt($j("#subject-".concat(cmaType, "-price-id")).attr('value'));
      var rangeSubjectVal = maxPrice - subjectPrice;
      var rangeAvg = maxPrice - avgPrice;
      var canvasNo = cmaType == 'active' ? 2 : 4;
      this.drawValuePriceRationGauge(0, rangeAvg, rangeMax, rangeSubjectVal, canvasNo);
    }
  }, {
    key: "evaluateSoldButton2",
    value: function evaluateSoldButton2() {
      var _this5 = this;

      var buttonEvaluate = $j("#pid_cma_sold_evaluate_by_bca_submit");
      buttonEvaluate.click(function (e) {
        _this5.evaluateByBCAChange('sold');
      });
    }
  }, {
    key: "startOver",
    value: function startOver() {
      var _this6 = this;

      var buttonEvaluate = $j("#pid_cma_evaluate_start_over");
      buttonEvaluate.click(function (e) {
        _this6.resetCMAResult('active');

        resetGauge(1);
        resetGauge(2);
      });
    }
  }, {
    key: "startOverSold",
    value: function startOverSold() {
      var _this7 = this;

      var buttonEvaluate = $j("#pid_cma_sold_evaluate_start_over");
      buttonEvaluate.click(function (e) {
        _this7.resetCMAResult('sold');

        resetGauge(3);
        resetGauge(4);
      });
    }
  }, {
    key: "resetCMAResult",
    value: function resetCMAResult(cmaType) {
      var cmaMaxPrice = $j("#pid_market_".concat(cmaType, "_value_max"));
      var cmaAvgPrice = $j("#pid_market_".concat(cmaType, "_value_avg"));
      var cmaMinPrice = $j("#pid_market_".concat(cmaType, "_value_min"));
      cmaMaxPrice.text("$");
      cmaAvgPrice.text("$");
      cmaMinPrice.text("$");
      var cmaMaxPrice2 = $j("#pid_market_".concat(cmaType, "_value_max_2"));
      var cmaAvgPrice2 = $j("#pid_market_".concat(cmaType, "_value_avg_2"));
      var cmaMinPrice2 = $j("#pid_market_".concat(cmaType, "_value_min_2"));
      cmaMaxPrice2.text("$");
      cmaAvgPrice2.text("$");
      cmaMinPrice2.text("$");
    }
  }, {
    key: "drawValuePriceRationGauge",
    value: function drawValuePriceRationGauge(min, avg, max, val, canvasNo) {
      var gaugeColor = '#6FADCF';

      if (val > avg) {
        gaugeColor = '#00FF55'; // green
      } else {
        gaugeColor = '#FF2A2A'; // red
      }

      var opts = {
        angle: 0.15,
        // The span of the gauge arc
        lineWidth: 0.36,
        // The line thickness
        radiusScale: 1,
        // Relative radius
        pointer: {
          length: 0.6,
          // // Relative to gauge radius
          strokeWidth: 0.035,
          // The thickness
          color: '#000000' // Fill color

        },
        limitMax: false,
        // If false, max value increases automatically if value > maxValue
        limitMin: false,
        // If true, the min value of the gauge will be fixed
        colorStart: gaugeColor,
        // Colors
        colorStop: gaugeColor,
        //'#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',
        // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true // High resolution support

      };
      var target = document.getElementById("cma-value-price-ratio-gauge-".concat(canvasNo)); // your canvas element
      //clear target canvas

      var chartContext = target.getContext("2d");
      var width = target.width;
      var height = target.height;
      chartContext.clearRect(0, 0, width, height);
      var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!

      gauge.maxValue = max; // set max gauge value

      gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0

      gauge.animationSpeed = 32; // set animation speed (32 is default value)

      gauge.set(val); // set actual value
    } // methods

    /**
     * Set the CMA Summary Cells As Per WPDATATABLE's Summary Info
     * .wdt-sum-cell,  /* for totals
     * .wdt-avg-cell,  /* for average
     * .wdt-min-cell,  /* for minimum
     * .wdt-max-cell,  /* for maximum
     * @parameters:
     * aggregateName: From Different Table Colomn, e.g Total Price / Price Per Square Feet
     * aggregateType: Max / Min / Ave
     */

  }, {
    key: "setSummaryCMACell",
    value: function setSummaryCMACell() {
      var tableID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 34;
      var aggregateType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "max";
      var aggregateNameColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
      var cmaType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "active";
      var colBCAChange = this.is_mobile ? 3 : 4;
      var colBCALandValuePSF = this.is_mobile ? 7 : 11;
      var colBCAHouseValuePSF = this.is_mobile ? 8 : 12;
      var xTableHeading2 = $j("#pid_cma_".concat(cmaType, "_listings"));
      var xTables = xTableHeading2.next().find("table[data-wpdatatable_id=".concat(tableID, "]"));

      if (xTables.length > 0) {
        var xTable = xTables[0];
        var aggr_price_cell = $j(xTable).find("td.wdt-".concat(aggregateType, "-cell"))[aggregateNameColumn];

        if (aggr_price_cell && aggr_price_cell !== 0) {
          var aggr_price = aggr_price_cell.innerText.toLowerCase().replace("".concat(aggregateType), "").replace('最大值:', '').replace('最小值:', '').replace('平均值:', '').replace("=", "").replace(".00", "").replace(",", "").trim();
          aggr_price = parseFloat(aggr_price);

          if (aggr_price > 1000) {
            aggr_price = aggr_price.toFixed(0);
          } else {
            aggr_price = aggr_price.toFixed(1);
          }

          var cell_id = ""; // cell_id is defined in the single-cma.php file

          switch (tableID) {
            case 34:
              //attached property
              switch (aggregateNameColumn) {
                case 4:
                  // total price
                  cell_id = "pid_cma_".concat(cmaType, "_price");
                  break;

                case 5:
                  // BCA Change%
                  cell_id = "pid_cma_".concat(cmaType, "_bca_change_perc");
                  break;

                case 6:
                  // price per square feet
                  cell_id = "pid_cma_".concat(cmaType, "_price_per_square_feet");
                  break;
              }

              break;

            case 35:
              //detached property
              switch (aggregateNameColumn) {
                case colBCAChange:
                  // BCA Change%
                  cell_id = "pid_cma_".concat(cmaType, "_bca_change_perc");
                  break;

                case colBCALandValuePSF:
                  // price per square feet
                  cell_id = "pid_cma_".concat(cmaType, "_land_price_per_square_feet");
                  break;

                case colBCAHouseValuePSF:
                  // price per square feet
                  cell_id = "pid_cma_".concat(cmaType, "_improve_price_per_square_feet");
                  break;
              }

              break;
          }

          var pid_aggr_cell = $j("#".concat(cell_id, "_").concat(aggregateType.toLowerCase()));

          switch (tableID) {
            case 34:
              //attached property
              if (aggregateNameColumn == 5) {
                pid_aggr_cell.text(aggr_price + "%"); // Write the aggregate number to the correct PID_CMA_CELL
              } else {
                pid_aggr_cell.text("$" + parseFloat(aggr_price).toLocaleString()); // Write the aggregate number to the correct PID_CMA_CELL
              }

              break;

            case 35:
              //detached property
              if (aggregateNameColumn == colBCAChange) {
                pid_aggr_cell.text(aggr_price + "%"); // Write the aggregate number to the correct PID_CMA_CELL
              } else {
                pid_aggr_cell.text("$" + parseFloat(aggr_price).toLocaleString()); // Write the aggregate number to the correct PID_CMA_CELL
              }

              break;
          }
        }
      }
    }
  }, {
    key: "hiddenColumn",
    value: function hiddenColumn() {
      this.htmlCityNameCN.addClass("pid_wpdatatable_hidden_column");
    }
  }]);

  return WPDataTable;
}();

/* harmony default export */ __webpack_exports__["default"] = (WPDataTable);

/***/ }),

/***/ "./src/CanvasImage.js":
/*!****************************!*\
  !*** ./src/CanvasImage.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var CanvasImage = /*#__PURE__*/function () {
  function CanvasImage(canvasID, marketSection) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CanvasImage);

    this.btnDraw = document.getElementById("create_".concat(canvasID));
    this.drawingContainer = document.getElementById("canvas_drawing_".concat(canvasID));
    this.marketSection = marketSection;
    this.chartType = "";
    this.updateChartCommunities();
    this.chartCanvasID = canvasID;
    this.drawCanvas = document.getElementById(this.chartCanvasID);
    this.propertyTypeSelect = document["pidMarketForm_".concat(canvasID)]["Property_Type_".concat(canvasID)];
    this.chartTypeSelect = document["pidMarketForm_ChartType_".concat(canvasID)]["Chart_Type_".concat(canvasID)];
    this.monthSelect = document["pidMarketForm_Time_".concat(canvasID)]["Stats_month_".concat(canvasID)];
    this.YearSelect = document["pidMarketForm_Time_".concat(canvasID)]["Stats_Year_".concat(canvasID)];
    var shareButtonLabel = $j("#share-button-title").text(),
        propertyTitle = "Market Report 2020"
    /* $(".single-property-title, .rh_page__title").text(),*/
    ,
        propertyThumbnail = $j(".only-for-print img").attr("src"),
        descriptionTextLength = 100,
        // Description Test Lenght for Social Media
    descriptionTextLabel = "HPI Chart URL"; // Label for URL you'd like to share via email

    this.socialDefaultConfig = {
      title: propertyTitle,
      image: propertyThumbnail,
      description: "Great Vancouver Real Estate Chart",
      ui: {
        flyout: $j("body").hasClass("rtl") ? "bottom center" : "bottom center" // button_text: shareButtonLabel

      },
      networks: {
        email: {
          title: propertyTitle,
          description: "Great Vancouver Real Estate Chart" + "%0A%0A" + descriptionTextLabel + ": " + window.location.href
        }
      },
      postID: null
    };
    this.RegisterSocialButtons.call(this, jQuery);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CanvasImage, [{
    key: "RegisterSocialButtons",
    value: function RegisterSocialButtons($) {
      "use strict";

      var _this = this;

      this.socialShare = new Share(".share-this-chart", this.socialDefaultConfig);
      this.socialDefaultConfig = JSON.parse(JSON.stringify(this.socialShare.config));
      this.share_button = $($(".share-this-chart")[0]); // share div element(bottom one)

      this.share_icon = $("#social-share-chart"); // share link (upper one)
      // add click events

      this.share_icon.on("click", function (e) {
        e.preventDefault(); // LIVE CODE:: bypass social post

        if (_this.socialShare.config.url.indexOf("/ss") >= 0) {
          _this.socialShare.toggle();

          return;
        } // Create a new market chart post, modify socialShare config data


        _this.postCanvasToURL(function (pid) {
          var newConfig = _this.socialShare.config;
          newConfig.url = pid_Data.siteurl + "/ss".concat(pid, "/");
          newConfig.networks.twitter.url = newConfig.url;
          newConfig.networks.facebook.url = newConfig.url;
          var subTitle = pid_Data.language == "en" ? " Real Estate Home Price Chart" : "房地产价格走势图";
          newConfig.description = _this.chartCommunities.join(" | ") + subTitle;
          newConfig.networks.twitter.description = newConfig.description;
          _this.socialShare.config = newConfig;

          _this.socialShare.toggle();
        });
      });
      this.share_button.on("click", function (e) {
        e.preventDefault(); // LIVE CODE:: bypass social post

        if (_this.socialShare.config.url.indexOf("/ss") >= 0) {
          return;
        } // Create a new market chart post, modify socialShare config data


        _this.postCanvasToURL(function (pid) {
          var newConfig = _this.socialShare.config;
          newConfig.url = pid_Data.siteurl + "/ss".concat(pid, "/");
          newConfig.networks.twitter.url = newConfig.url;
          newConfig.networks.facebook.url = newConfig.url;
          var subTitle = pid_Data.language == "en" ? " Real Estate Home Price Chart" : "房地产价格走势图";
          newConfig.description = _this.chartCommunities.join(" | ") + subTitle;
          newConfig.networks.twitter.description = newConfig.description;
          _this.socialShare.config = newConfig;
        }); // this.postDivToCanvasURL((pid) => {
        //   let newConfig = this.socialShare.config;
        //   newConfig.url = pid_Data.siteurl + `/ss${pid}/`;
        //   newConfig.networks.twitter.url = newConfig.url;
        //   newConfig.networks.facebook.url = newConfig.url;
        //   this.socialShare.config = newConfig;
        // });

      });
    }
  }, {
    key: "postCanvasToURL",
    value: function postCanvasToURL(callback) {
      // Convert canvas image to Base64
      this.drawCanvas = document.getElementById(this.chartCanvasID);
      var img64 = this.drawCanvas.toDataURL();
      console.log("Blob");
      var img = document.createElement("img");
      img.src = img64;
      img.classList.add("inspiry-qr-code");
      var oldImg = this.drawingContainer.querySelector("img");

      if (oldImg) {
        oldImg.remove();
      }

      this.drawingContainer.append(img);
      this.uploadImage(img64, callback);
    }
  }, {
    key: "postDivToCanvasURL",
    value: function postDivToCanvasURL(callback) {
      var _this2 = this;

      html2canvas(document.querySelector("#capture"), {
        // removeContainer: false,
        // canvas: document.getElementById("capturechartjsdrawing"),
        allowTaint: true
      }).then(function (canvas) {
        _this2.drawCanvas = canvas;

        var img64 = _this2.drawCanvas.toDataURL();

        var img = document.createElement("img");
        img.src = img64;
        img.classList.add("inspiry-qr-code");

        var oldImg = _this2.drawingContainer.querySelector("img");

        if (oldImg) {
          oldImg.remove();
        }

        _this2.drawingContainer.append(img);

        _this2.drawingContainer.append(canvas);

        _this2.uploadImage(img64, callback);
      });
    }
  }, {
    key: "updateChartCommunities",
    value: function updateChartCommunities() {
      var marketSection = this.marketSection;
      var nbhSection = null;
      var nbhNames = {};
      var nbhNames_tmp = {};

      if (marketSection.indexOf("_sub_markets_") < 0) {
        // for main market
        nbhSection = $j(marketSection);
        var theLabel = $j('label[for="' + nbhSection.attr("id") + '"]')[0]; // nbhNames_tmp = JSON.parse(nbhSection.attr("nbhnames"));
        // nbhNames[[Object.keys(nbhNames_tmp)[0]]] = Object.values(nbhNames_tmp)[0];

        nbhNames["nbhCode"] = theLabel.innerText; // label's innerText could be localed
      } else {
        // for sub market compare
        nbhSection = $j(marketSection).find('input[type="hidden"]');
        var nbhSelected = $j(marketSection).find("label");
        var nbhCodes = "";

        for (var i = 0; i < nbhSection.length; i++) {
          var nbhSelect = $j(nbhSelected[i]).attr("showchart");

          if (nbhSelect != "yes") {
            continue;
          }

          var nbhCode = $j(nbhSection[i]).attr("nbhcodes");
          var nbhName = JSON.parse($j(nbhSection[i]).attr("nbhnames"));
          nbhCodes = nbhCodes + " " + nbhCode;
          nbhNames[nbhCode] = nbhName[nbhCode];
        }

        nbhCodes = nbhCodes.trim().split(" ").join(", ");
      }

      this.chartCommunities = Object.values(nbhNames);
      this.chartType = nbhSection.attr("name");
    }
  }, {
    key: "uploadImage",
    value: function uploadImage(img64, callback) {
      // Use WP Ajax Module
      var uploadUrl = pid_Data.siteurl + "/wp-admin/admin-ajax.php"; // AJAX handler
      // Use external Ajax Module
      // if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
      //   uploadUrl =
      //     pid_Data.siteurl +
      //     "/wp-content/themes/realhomes-child-3/db/uploadImageFile.php";
      // } else {
      //   uploadUrl =
      //     pid_Data.siteurl +
      //     "/wp-content/themes/realhomes-child-3/db/uploadImageFile.php";
      // }

      var file_data = this.dataURItoBlob(img64);
      var imageFile = new File([file_data], "uploadImage.png"); // Select Property Type Events

      this.updateChartCommunities(); // Update the Communities

      var rads = this.propertyTypeSelect;
      var propertyDescription = "";

      for (var i = 0; i < rads.length; i++) {
        var rad = rads[i];

        if (rad.type == "radio" && rad.checked) {
          propertyDescription = rad.value; // only show the english value

          break;
        } else if (rad.type == "checkbox") {
          propertyDescription = rad.checked ? rad.labels[0].innerText : "";
        }
      } // Select Chart Type


      var chartDescription = "";
      var radsChartType = this.chartTypeSelect;

      for (var i = 0; i < radsChartType.length; i++) {
        var _rad = radsChartType[i];

        if (_rad.type == "radio" && _rad.checked) {
          chartDescription = _rad.value; // only show the english value
        }
      }

      var form_data = new FormData();
      form_data.append("fileToUpload", imageFile);
      form_data.append("action", "uploadimage"); // action will be used by wp-ajax call, go to a associated function

      form_data.append("chartParams", JSON.stringify({
        PropertyType: propertyDescription,
        Years: "2020",
        ChartType: chartDescription,
        // dollar or percentage
        Communities: JSON.stringify(this.chartCommunities)
      }));
      $j.ajax({
        url: uploadUrl,
        // point to server-side PHP script
        dataType: "text",
        // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: "post",
        success: function success(php_script_response) {
          // alert(php_script_response); // display response from the PHP script, if any
          php_script_response = php_script_response.split(",")[0];
          callback(php_script_response);
        }
      });
    }
  }, {
    key: "blobToFile",
    value: function blobToFile(theBlob, fileName) {
      //A Blob() is almost a File() - it's just missing the two properties below which we will add
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    }
  }, {
    key: "dataURItoBlob",
    value: function dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = atob(dataURI.split(",")[1]);else byteString = unescape(dataURI.split(",")[1]); // separate out the mime component

      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // write the bytes of the string to a typed array

      var ia = new Uint8Array(byteString.length);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {
        type: mimeString
      });
    }
  }]);

  return CanvasImage;
}();

/* harmony default export */ __webpack_exports__["default"] = (CanvasImage);

/***/ }),

/***/ "./src/PIDChart.js":
/*!*************************!*\
  !*** ./src/PIDChart.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CanvasImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CanvasImage */ "./src/CanvasImage.js");
/* harmony import */ var _SubMarkets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SubMarkets */ "./src/SubMarkets.js");





var pidChart = /*#__PURE__*/function () {
  function pidChart(chartCanvasID) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, pidChart);

    // this.vw = Math.max(
    //   document.documentElement.clientWidth || 0,
    //   window.innerWidth || 0
    // );
    // this.vh = Math.max(
    //   document.documentElement.clientHeight || 0,
    //   window.innerHeight || 0
    // );
    this.vw = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().width;
    this.vh = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().height;
    this.activeClass = "metabox__blog-home-link-active";
    this.nonActiveClass = "metabox__blog-home-link";
    this.chartCanvasID = chartCanvasID;
    this.chartCommunities = [];
    this.chartType = "";
    this.Years = [2019, 2020];
    this.Month = 1;
    this.nbhLabel = "";
    this.canvasImage = null;
    this.htmlShareLink = $j('#pid_chart_share_link');
    this.htmlShareInput = $j('#pid_chart_share_input');
    this.chartColors2 = ["rgba(178, 32, 37, 0.95)", // red
    "rgba(255, 205, 86, 0.95)", // orange
    "rgba(75, 192, 192, 0.95)", // yellow
    "rgba(255, 159, 64, 0.95)", // green
    "rgba(54, 162, 235, 0.95)", // blue
    "rgba(153, 102, 255, 0.95)", // purple
    "rgba(204,0,102, 0.95)", // purple2
    "rgba(128,128,128, 0.95)", // grey
    "rgba(128,0,0, 0.95)", // maroon
    "rgba(85,107,47, 0.95)", // dark_olive_green
    "rgba(178, 32, 37, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 205, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(54, 162, 235, 0.75)", "rgba(153, 102, 255, 0.75)", "rgba(204,0,102, 0.75)", "rgba(128,128,128, 0.75)", "rgba(128,0,0, 0.75)", "rgba(85,107,47, 0.75)", "rgba(178, 32, 37, 0.5)", "rgba(255, 159, 64, 0.5)", "rgba(255, 205, 86, 0.5)", "rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)", "rgba(153, 102, 255, 0.5)", "rgba(204,0,102, 0.5)", "rgba(128,128,128, 0.5)", "rgba(128,0,0, 0.5)", "rgba(85,107,47, 0.5)", "rgba(178, 32, 37, 0.25)", "rgba(255, 159, 64, 0.25)", "rgba(255, 205, 86, 0.25)", "rgba(75, 192, 192, 0.25)", "rgba(54, 162, 235, 0.25)", "rgba(153, 102, 255, 0.25)", "rgba(204,0,102, 0.25)", "rgba(128,128,128, 0.25)", "rgba(128,0,0, 0.25)", "rgba(85,107,47, 0.25)", "rgba(178, 32, 37, 0.15)", "rgba(255, 159, 64, 0.15)", "rgba(255, 205, 86, 0.15)", "rgba(75, 192, 192, 0.15)", "rgba(54, 162, 235, 0.15)", "rgba(153, 102, 255, 0.15)", "rgba(204,0,102, 0.15)", "rgba(128,128,128, 0.15)", "rgba(128,0,0, 0.15)", "rgba(85,107,47, 0.15)"];
    var marketSection = "";
    this.PropertyTypeSelect = document["pidMarketForm_".concat(chartCanvasID)]["Property_Type_".concat(chartCanvasID)];
    this.YearSelect = document["pidMarketForm_Time_".concat(chartCanvasID)]["Stats_Year_".concat(chartCanvasID)];
    this.Years = [];
    var yearArray = Array.from(this.YearSelect);
    yearArray.forEach(function (y) {
      if (y.checked) {
        _this.Years.push(y.value);
      }
    });
    this.MonthSelect = document["pidMarketForm_Time_".concat(chartCanvasID)]["Stats_month_".concat(chartCanvasID)];
    this.Month = parseInt(this.MonthSelect.value);
    this.ChartTypeSelect = document["pidMarketForm_ChartType_".concat(chartCanvasID)]["Chart_Type_".concat(chartCanvasID)];
    this.LocationForm = document["pidMarketForm_location_".concat(chartCanvasID)];
    this.Locations = this.LocationForm["nbh_group_location_".concat(chartCanvasID)]; // get all input elements

    var inputLabels = this.LocationForm.getElementsByTagName("label"); // get all input labels
    // if active class exit, show its chart
    // if active class does not exit, show the first chart

    var activeLocation = Array.from(inputLabels).filter(function (element, index) {
      return $j(element).hasClass(_this.activeClass);
    });
    var activeIndex = 0;

    if (activeLocation.length == 1) {
      activeIndex = Array.from(inputLabels).indexOf(activeLocation[0]);
    }

    marketSection = "#" + $j(this.Locations[activeIndex]).attr("id"); // use first label for start chart

    this.marketSection = marketSection; // Keep the Section ID

    $j(inputLabels[activeIndex]).addClass(this.activeClass);
    this.neighborhoodCodes = $j(marketSection).attr("nbhcodes");
    this.neighborhoodNames = JSON.parse($j(marketSection).attr("nbhnames"));
    this.prepareCanvas(this.neighborhoodNames.length);
    this.configChart([], this.chartColors2);
    this.getChartData(marketSection);
    this.events();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(pidChart, [{
    key: "events",
    value: function events() {
      var _this2 = this;

      // start over button event
      var startOver = document.getElementById("form_footer_button_".concat(this.chartCanvasID));
      startOver.addEventListener("click", function () {
        console.log("start over clicked");
        var subMarketContainer = $j("#pid_sub_markets_fieldset_" + _this2.chartCanvasID); // subMarketContainer.children().remove();

        var filter = document.getElementById("filter_subMarket_".concat(_this2.chartCanvasID));
        filter.value = "";
        subMarketContainer.find("label").attr("showchart", "no").removeClass("pid_sub_select pid_sub_market_filtered");
        $j(_this2.Locations[0]).click();
        $j(_this2.LocationForm.getElementsByTagName("label")).removeClass(_this2.activeClass);
        $j(_this2.LocationForm.getElementsByTagName("label")[0]).addClass(_this2.activeClass);
      }); // Filter applied

      var filter = document.getElementById("filter_subMarket_".concat(this.chartCanvasID));
      filter.addEventListener("keyup", function (e) {
        console.log("filter pressed");
        var filterText = e.target.value;
        var subMarketContainer = $j("#pid_sub_markets_fieldset_" + _this2.chartCanvasID);
        subMarketContainer.find("label").removeClass("pid_sub_market_filtered");

        if (filterText !== "") {
          subMarketContainer.find("label").filter(function (index, node) {
            return $j(node).text().toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
          }).addClass("pid_sub_market_filtered");
        }
      }); // Select Property Type Events

      var rads = this.PropertyTypeSelect;

      for (var i = 0; i < rads.length; i++) {
        rads[i].addEventListener("change", function (e) {
          // uncheck Group by Types
          if (e.target.type == "radio") {
            // last emlement is the By Hood Group checkbox
            rads[rads.length - 1].checked = false;
          } // read the radio value, rebuilt the share link


          var paramDwell = e.target.value;

          _this2.htmlShareInput.val(_this2.buildShareLink('dwell', paramDwell));

          _this2.updateChart(e);
        });
      } // Select Stats Year Events


      var checkboxes = this.YearSelect;

      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", function (e) {
          console.log("checkbox clicked!");
          _this2.Years = [];
          var chkBoxes = _this2.YearSelect;
          var paramYears = '';

          for (var i = 0; i < chkBoxes.length; i++) {
            if (chkBoxes[i].checked) {
              _this2.Years.push(parseInt(chkBoxes[i].value));

              paramYears += chkBoxes[i].value + ',';
            }
          } // remove the last ',' from paramYears


          paramYears = paramYears.slice(0, -1); // rebuild the share link

          _this2.htmlShareInput.val(_this2.buildShareLink('year', paramYears));

          var activeClass = _this2.activeClass;

          var inputLabels = _this2.LocationForm.getElementsByTagName("label");

          for (var i = 0; i < inputLabels.length; i++) {
            if (inputLabels[i].className.indexOf(activeClass) >= 0) {
              var inputID = $j(inputLabels[i]).attr("for");
              $j("#" + inputID).trigger("click");
            }
          }
        });
      } // Select Stats Month Events


      var monthSelect = this.MonthSelect;
      monthSelect.addEventListener("change", function (e) {
        console.log("month changed!");
        _this2.Month = e.target.value; // rebuild the share link with new month value

        _this2.htmlShareInput.val(_this2.buildShareLink('month', _this2.Month));

        var activeClass = _this2.activeClass;

        var inputLabels = _this2.LocationForm.getElementsByTagName("label");

        for (var i = 0; i < inputLabels.length; i++) {
          if (inputLabels[i].className.indexOf(activeClass) >= 0) {
            var inputID = $j(inputLabels[i]).attr("for");
            $j("#" + inputID).trigger("click");
          }
        }
      }); // Select Chart Type Events

      var radsChartType = this.ChartTypeSelect;

      for (var i = 0; i < radsChartType.length; i++) {
        radsChartType[i].addEventListener("change", function (e) {
          // this.updateChart(e);
          console.log("Chart Type Changed");
          _this2.Years = [];
          var chkBoxes = _this2.YearSelect;
          var paramYears = "";

          for (var i = 0; i < chkBoxes.length; i++) {
            if (chkBoxes[i].checked) {
              _this2.Years.push(parseInt(chkBoxes[i].value));

              paramYears += chkBoxes[i].value + ',';
            }
          } // trim last , of paramYears


          paramYears = paramYears.slice(0, -1);

          _this2.htmlShareInput.val(_this2.buildShareLink('year', paramYears));

          _this2.htmlShareInput.val(_this2.buildShareLink('chart', e.target.value == 'percentage' ? 'perc' : 'dollar'));

          var activeClass = _this2.activeClass;

          var inputLabels = _this2.LocationForm.getElementsByTagName("label");

          for (var i = 0; i < inputLabels.length; i++) {
            if (inputLabels[i].className.indexOf(activeClass) >= 0) {
              var inputID = $j(inputLabels[i]).attr("for");
              $j("#" + inputID).trigger("click");
              return;
            }
          }

          _this2.prepareCanvas();

          _this2.configChart([], _this2.chartColors2);

          _this2.getChartData_Compare("#pid_sub_markets_fieldset_" + _this2.chartCanvasID);
        });
      } // add location labels event (inputLables are for city/district/community lables)


      var inputLabels = this.LocationForm.getElementsByTagName("label");

      for (var i = 0; i < inputLabels.length; i++) {
        inputLabels[i].addEventListener("click", function (e) {
          // GET the Label's (e.target) associated Input: document.getElementById(e.target.htmlFor)
          console.log("label clicked:", e.target);
          _this2.nbhLabel = e.target.innerText; // this does not work with Chinese Labels, have to add an attribute slug for the Label

          _this2.nbhLabel = e.target.getAttribute("slug"); // $nbhLabelForInput = document.getElementById(e.target.htmlFor);

          var inputLabels = e.target.parentElement.querySelectorAll("label");
          var nonActiveClass = _this2.nonActiveClass;

          for (var _i = 0; _i < inputLabels.length; _i++) {
            inputLabels[_i].classList.add(nonActiveClass);
          }

          var activeClass = _this2.activeClass;
          inputLabels.forEach(function (label, index) {
            if (label.innerText != e.target.innerText) {
              label.classList.remove(activeClass);
            }
          });
          $j(e.target).toggleClass(activeClass);
          var inputID = $j(e.target).attr("for");
          var subMarketContainer = $j("#pid_sub_markets_fieldset_" + _this2.chartCanvasID); // show charts of the main label

          if (subMarketContainer.find("label.pid_sub_market_label_heading").filter(function (index, node) {
            return $j(node).text() === e.target.innerText;
          }).length == 0) {
            // if has not show sub market labels, add labels and show sub market select panel
            $j("#" + inputID).trigger("click"); // creat the subMarkets panel, only the panel, sub labels have to be added later

            var subMarkets = new _SubMarkets__WEBPACK_IMPORTED_MODULE_3__["default"](_this2.chartCanvasID, e.target.getAttribute("slug") //cannot use e.target.innerText as label ID if in Chinese version
            );
          } else {
            if ($j(e.target).hasClass(activeClass)) {
              $j("#" + inputID).trigger("click");
              return;
            }

            _this2.prepareCanvas();

            _this2.configChart([], _this2.chartColors2);

            _this2.getChartData_Compare("#pid_sub_markets_fieldset_" + _this2.chartCanvasID);
          } // get the sub market codes and names


          var nbhCodes = $j("#" + inputID).attr("nbhcodes").split(",");
          var nbhNames = JSON.parse($j("#" + inputID).attr("nbhnames")); // Add leading lable for the sub areas
          // ADD the sub_market_label
          // ADD click event to draw charts to each label

          for (var i = 0; i < nbhCodes.length; i++) {
            var inputLabel = nbhNames[nbhCodes[i]]; // set label to nbh names, Best Practice should be nbh codes;

            var subInputID = inputID + "_" + nbhCodes[i];
            var labelClass = "pid_sub_market_label";

            if (i == 0 && _this2.chartCanvasID.indexOf("_1") < 0) {
              labelClass = "pid_sub_market_label_heading";
            }

            var objNbhName = {};
            objNbhName[nbhCodes[i]] = nbhNames[nbhCodes[i]];
            var nbhName = JSON.stringify(objNbhName);
            var subMarketLabel = $j("<label class=\"".concat(labelClass, "\" slug=\"").concat(inputLabel, "\" showchart=\"no\" for=\"").concat(subInputID, "\">").concat(inputLabel, "</label>"));
            var labelExisted = $j("#".concat(subInputID));

            if (labelExisted.length > 0) {
              continue;
            }

            var subMarketInput = $j("<input type=\"hidden\" id=\"".concat(subInputID, "\" name=\"nbh_sub_market\" nbhcodes=\"").concat(nbhCodes[i], "\" nbhnames='").concat(nbhName, "'>"));
            subMarkets.labelContainer.append(subMarketLabel);
            subMarkets.labelContainer.append(subMarketInput); // add subMarket Labels events

            subMarketLabel.on("click", function (e) {
              var thisLabel = $j(e.target);
              var msg = thisLabel.attr("for");
              console.log("subMarket:: ", msg);
              thisLabel.toggleClass("pid_sub_select"); // main market labels remove active class

              var inputLabels = _this2.LocationForm.getElementsByTagName("label");

              _this2.nbhLabel = e.target.innerText; // this does not work for chinese labels

              _this2.nbhLabel = e.target.getAttribute("slug"); // temperally change to slug, Best Practice should use nbh codes
              // $nbhLabelForInput = document.getElementById(e.target.htmlFor);

              $j(inputLabels).removeClass(_this2.activeClass);

              if (thisLabel.hasClass("pid_sub_select")) {
                thisLabel.attr("showchart", "yes");
              } else {
                thisLabel.attr("showchart", "no");
              }

              _this2.prepareCanvas(nbhNames.length);

              _this2.configChart([], _this2.chartColors2);

              _this2.getChartData_Compare("#pid_sub_markets_fieldset_" + _this2.chartCanvasID);
            });
          }
        });
      }

      var inputs = this.Locations;

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("click", function (e) {
          var thisInput = $j(e.target);
          console.log("input clicked:", e.target);
          var marketSection = "#" + thisInput.attr("id");
          _this2.neighborhoodCodes = $j(marketSection).attr("nbhcodes");
          console.log(_this2.neighborhoodCodes);
          _this2.neighborhoodNames = JSON.parse($j(marketSection).attr("nbhnames"));
          console.log(_this2.neighborhoodNames);

          _this2.prepareCanvas(_this2.neighborhoodNames.length);

          _this2.configChart([], _this2.chartColors2);

          _this2.getChartData(marketSection);
        });
      }
    }
  }, {
    key: "prepareCanvas",
    value: function prepareCanvas() {
      this.vw = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().width;
      this.vh = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().height;
      this.chartDataSets_All = [];
      this.chartDataSets_Detached = [];
      this.chartDataSets_Townhouse = [];
      this.chartDataSets_Apartment = [];
      this.chartDataSets_GroupByNbh = [];
      this.pidChart = {};
      this.chartConfig = {};
      var chartCanvas = document.getElementById(this.chartCanvasID);
      this.chartCanvas = chartCanvas;
      var chartContext = chartCanvas.getContext("2d");
      var width = chartCanvas.width;
      var height = chartCanvas.height;
      chartContext.clearRect(0, 0, width, height);
      var canvasContainer = $j("#canvas_wrapper_" + this.chartCanvasID);
      chartCanvas.remove();
      var canvasNew = '<canvas id="' + this.chartCanvasID + '" height="400px !important" , width="400"></canvas>';
      canvasContainer.append(canvasNew);
      var canvas = document.querySelector("#" + this.chartCanvasID);
      canvas.hidden = true;
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = this.vw * 0.9;
      var ctxHeight = ctx.canvas.width / 16 * 9; // if on mobile device, and location are more than 10, double the height

      switch (true) {
        case ctx.canvas.width < 500:
          ctx.canvas.height = ctx.canvas.width * 0.8;
          break;

        case ctx.canvas.width < 1100:
          ctx.canvas.height = ctx.canvas.width * 0.7;
          break;

        default:
          ctx.canvas.height = ctxHeight; // 400;

          break;
      }

      this.ctx = ctx;
    }
  }, {
    key: "prepareCanvasSize",
    value: function prepareCanvasSize() {
      var chartLines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      this.vw = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().width;
      this.vh = document.getElementsByClassName("rh_page__main")[0].getBoundingClientRect().height;
      var canvas = document.querySelector("#" + this.chartCanvasID);
      canvas.hidden = true;
      var ctx = canvas.getContext("2d");
      ctx.canvas.width = this.vw * 0.9;
      var ctxHeight = ctx.canvas.width / 16 * 9; // if on mobile device, and location are more than 10, double the height

      switch (true) {
        case ctx.canvas.width < 500:
          switch (true) {
            case chartLines < 4:
              ctx.canvas.height = ctxHeight;
              break;

            case chartLines >= 4 && chartLines < 8:
              ctx.canvas.height = ctxHeight * 1.2;
              break;

            default:
              ctx.canvas.height = ctxHeight * 1.5;
              break;
          }

          break;

        case ctx.canvas.width < 1100:
          ctx.canvas.height = chartLines > 14 ? ctx.canvas.width * 0.9 : ctxHeight;
          break;

        default:
          ctx.canvas.height = 19 ? ctx.canvas.width * 0.8 : undefined; // 400;

          break;
      }

      this.ctx = ctx;
      this.chartConfig.options.legend.maxSize.height = ctx.canvas.height * 0.2;
    }
  }, {
    key: "configChart",
    value: function configChart(dataSets, colors) {
      var self = this;

      if (dataSets.length == 0) {
        var codes = this.neighborhoodCodes.split(",");

        for (var i = 0; i < codes.length; i++) {
          dataSets.push({
            label: "",
            data: {}
          });
        }
      } //set up datasets for the chart


      var chartDataSets = [];

      for (var i = 0; i < dataSets.length; i++) {
        chartDataSets.push({
          label: dataSets[i].label,
          fill: false,
          backgroundColor: colors[i],
          //
          borderColor: colors[i],
          data: dataSets[i].data
        });
      }

      var defaultOptions = {
        global: {
          defaultFontFamily: "Helvetica"
        }
      };
      var config = {
        type: "line",
        data: {
          datasets: chartDataSets
        },
        options: {
          title: {
            display: false,
            text: ""
          },
          legend: {
            maxSize: {
              height: 80
            },
            position: "bottom",
            labels: {
              // This more specific font property overrides the global property
              fontFamily: "Helvetica"
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: "interpolate",
            //"index",
            intersect: false
          },
          plugins: {
            crosshair: {
              line: {
                color: "#F66",
                // crosshair line color
                width: 1 // crosshair line width

              },
              sync: {
                enabled: false,
                group: 1,
                // chart group
                suppressTooltips: false
              },
              zoom: {
                enabled: false,
                // enable zooming
                zoomboxBackgroundColor: "rgba(66,133,244,0.2)",
                // background color of zoom box
                zoomboxBorderColor: "#48F",
                // border color of zoom box
                zoomButtonText: "Reset Zoom",
                // reset zoom button text
                zoomButtonClass: "reset-zoom" // reset zoom button class

              },
              callbacks: {
                beforeZoom: function beforeZoom(start, end) {
                  // called before zoom, return false to prevent zoom
                  return true;
                },
                afterZoom: function afterZoom(start, end) {
                  setTimeout(function () {
                    chart6.data.datasets[0].data = generate(start, end);
                    chart6.update();
                  }, 1000);
                }
              }
            }
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          scales: {
            xAxes: [{
              type: "time",
              time: {
                unit: "quarter",
                displayFormats: {
                  quarter: "YY[Q]Q"
                }
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: self.ChartTypeSelect.value == "dollar" ? "House Value" + (self.vw < 500 ? "(million dollars)" : "(dollars)") : "Change %"
              },
              fontFamily: "monospaced",
              ticks: {
                callback: function callback(value, index, values) {
                  var newValue = "";

                  if (self.ChartTypeSelect.value == "dollar") {
                    if (self.vw < 500) {
                      newValue = value / 1000000;
                    } else {
                      newValue = "$" + value / 1000 + "K";
                    }
                  }

                  if (self.ChartTypeSelect.value == "percentage") {
                    newValue = value + "%";
                  }

                  return newValue;
                }
              }
            }]
          }
        },
        defaults: defaultOptions
      };
      this.chartConfig = {};
      this.chartConfig = config;
    }
  }, {
    key: "updateChart",
    value: function updateChart(e) {
      var _this3 = this;

      console.log(e.target.value); //property type value

      console.log(this.pidChart);

      switch (e.target.value.toLowerCase().trim()) {
        case "all":
        case "detached":
        case "townhouse":
        case "apartment":
        case "condo":
          this.configChart(this["chartDataSets_".concat(e.target.value.trim())], this.chartColors2);
          break;

        default:
          if (e.target.checked) {
            // remove radios check marks
            var rads = this.PropertyTypeSelect;

            for (var i = 0; i < rads.length - 1; i++) {
              rads[i].checked = false; // uncheck the radios, but do not keep the checkbox for nbh group
            } // do chart


            var firstNbh = this.chartDataSets_GroupByNbh[0][0];
            var chartDataSets = this.chartDataSets_GroupByNbh.filter(function (nbhSet) {
              return nbhSet[0] == firstNbh;
            }).map(function (nbhSet) {
              return nbhSet[1];
            });
            this.configChart(chartDataSets, this.chartColors2);
          } else {
            Array.from(this.PropertyTypeSelect).filter(function (rad) {
              return rad.checked;
            }).map(function (rad) {
              _this3.configChart(_this3["chartDataSets_".concat(rad.value)], _this3.chartColors2);
            });
          }

          break;
      }

      this.pidChart.config = this.chartConfig;
      this.pidChart.update();

      if ($j("#".concat(this.chartCanvasID)).length > 0) {
        if (this.canvasImage == null) {
          this.canvasImage = new _CanvasImage__WEBPACK_IMPORTED_MODULE_2__["default"](this.chartCanvasID);
        } else {
          // reset socialShare config
          this.canvasImage.socialShare.config = JSON.parse(JSON.stringify(this.canvasImage.socialDefaultConfig));
        }
      }

      this.drawCanvas = document.getElementById(this.chartCanvasID);
    }
  }, {
    key: "removeData",
    value: function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach(function (dataset) {
        dataset.data.pop();
      });
      chart.update();
    }
  }, {
    key: "addData",
    value: function addData(chart, label, data) {
      chart.data.labels.push(label); // chart.data.datasets.forEach(dataset => {
      //   dataset.data.push(data);
      // });

      data.forEach(function (dataSet) {
        return chart.data.datasets.push(dataSet);
      });
      chart.update();
      console.log(chart.data.datasets);
    } // copyTextToClipboard(text) {
    //   if (!navigator.clipboard) {
    //     // this.fallbackCopyTextToClipboard(text);
    //     return;
    //   }
    //   navigator.clipboard.writeText(text).then(
    //     function () {
    //       console.log("Async: Copying to clipboard was successful!");
    //     },
    //     function (err) {
    //       console.error("Async: Could not copy text: ", err);
    //     }
    //   );
    // }
    // fallbackCopyTextToClipboard(text) {
    //   Clipboard.copy(text);
    //   return;
    // }

  }, {
    key: "buildShareLink",
    value: function buildShareLink(paramName, paramValue) {
      // twitter and facebook does not support get params, change & to +
      paramValue = paramValue.toLowerCase();
      var shareLink = this.htmlShareInput.val();
      var shareLinkRegex = /https?:\/\/([a-z0-9A-Z\.-]+\/)+/;
      var dwellRegex = /dwell=[a-z]+/;
      var chartRegex = /chart=[a-z]+/;
      var yearRegex = /y=[\d,]+/;
      var monthRegex = /mh=[\d]{1,2}/;
      var mainShareLink = shareLinkRegex.test(shareLink) ? shareLink.match(shareLinkRegex)[0] : '';
      var paramDwell = dwellRegex.test(shareLink) ? shareLink.match(dwellRegex)[0] : 'dwell=all';
      var paramChart = chartRegex.test(shareLink) ? '$' + shareLink.match(chartRegex)[0] : '';
      var paramYear = yearRegex.test(shareLink) ? '$' + shareLink.match(yearRegex)[0] : '';
      var paramMonth = monthRegex.test() ? '$' + shareLink.match(monthRegex)[0] : '';

      switch (paramName) {
        case 'dwell':
          paramValue = paramValue == 'on' ? 'groupbynbh' : paramValue; // if 'on', then By Hood Checkbox is selected

          paramDwell = "dwell=".concat(paramValue);
          break;

        case 'chart':
          paramChart = "$chart=".concat(paramValue);
          break;

        case 'year':
          paramYear = "$y=".concat(paramValue);
          break;

        case 'month':
          paramMonth = "$mh=".concat(paramValue);
          break;
      }

      var newMainShareLink = mainShareLink + "?".concat(paramDwell).concat(paramChart).concat(paramYear).concat(paramMonth); // this.copyTextToClipboard(newMainShareLink);

      this.htmlShareLink.attr("href", newMainShareLink);
      return newMainShareLink;
    }
  }, {
    key: "getChartData",
    value: function getChartData(marketSection) {
      var nbhSection = $j(marketSection);
      var nbhCodes = nbhSection.attr("nbhcodes");
      this.chartCommunities = Object.values(JSON.parse(nbhSection.attr("nbhnames")));
      this.chartType = nbhSection.attr("name");

      if (this.canvasImage) {
        this.canvasImage.marketSection = marketSection;
      }

      var years = JSON.stringify(this.Years);
      var month = this.Month;
      console.log(nbhCodes);
      var self = this;
      var chartDataUrl = "";

      switch (self.ChartTypeSelect.value) {
        case "dollar":
          if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData.php";
          } else {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData.php";
          }

          break;

        case "percentage":
          if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
          } else {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
          }

          break;
      }

      $j.ajax({
        url: chartDataUrl,
        method: "get",
        data: {
          Neighborhood_IDs: nbhCodes,
          Years: years,
          Month: month
        },
        dataType: "JSON",
        success: function success(res) {
          res.forEach(function (dataSet) {
            var xPropertyType = dataSet["property_Type"].trim();
            var xData = {
              label: self.neighborhoodNames[dataSet["nbr_ID"].trim()],
              data: dataSet["nbr_Data"]
            }; // add dataset group by nbh

            var yNeighborhood = self.neighborhoodNames[dataSet["nbr_ID"].trim()];
            var yData = {
              label: self.neighborhoodNames[dataSet["nbr_ID"].trim()] + "_" + xPropertyType,
              data: dataSet["nbr_Data"]
            };

            switch (yNeighborhood) {
              default:
                self.chartDataSets_GroupByNbh.push([yNeighborhood, yData]);
                break;
            }

            switch (xPropertyType) {
              case "All":
                self.chartDataSets_All.push(xData);
                break;

              case "Detached":
                self.chartDataSets_Detached.push(xData);
                break;

              case "Townhouse":
                self.chartDataSets_Townhouse.push(xData);
                break;

              case "Apartment":
                self.chartDataSets_Apartment.push(xData);
                break;
            }
          });
          var rads = self.PropertyTypeSelect;
          var chkGroupByNbh = Array.from(self.PropertyTypeSelect).filter(function (rad) {
            return rad.value == "on";
          })[0].checked;

          if (chkGroupByNbh) {
            var thisNbh = self.nbhLabel ? self.nbhLabel : self.chartDataSets_GroupByNbh[0][0];
            var chartDataSets = self.chartDataSets_GroupByNbh.filter(function (nbhSet) {
              return nbhSet[0] == thisNbh;
            }).map(function (nbhSet) {
              return nbhSet[1];
            });
            self.configChart(chartDataSets, self.chartColors2);
          } else {
            for (var i = 0; i < rads.length; i++) {
              var radValue = rads[i].value;
              var radChecked = rads[i].checked;

              if (radChecked) {
                switch (radValue) {
                  case "All":
                    self.configChart(self.chartDataSets_All, self.chartColors2);
                    break;

                  case "Detached":
                    self.configChart(self.chartDataSets_Detached, self.chartColors2);
                    break;

                  case "Townhouse":
                    self.configChart(self.chartDataSets_Townhouse, self.chartColors2);
                    break;

                  case "Apartment":
                    self.configChart(self.chartDataSets_Apartment, self.chartColors2);
                    break;
                }

                break;
              }
            }
          }

          self.prepareCanvasSize(self.chartConfig.data.datasets.length);
          self.drawChart(self.chartConfig);
        }
      });
    }
  }, {
    key: "getChartData_Compare",
    value: function getChartData_Compare(marketSection) {
      // marketSection = 'pid_sub_market'
      if (this.canvasImage) {
        this.canvasImage.marketSection = marketSection;
      }

      var nbhSection = $j(marketSection).find('input[type="hidden"]');
      var nbhSelected = $j(marketSection).find("label");
      var nbhCodes = "";
      var nbhNames = {};

      for (var i = 0; i < nbhSection.length; i++) {
        var nbhSelect = $j(nbhSelected[i]).attr("showchart");

        if (nbhSelect != "yes") {
          continue;
        }

        var nbhCode = $j(nbhSection[i]).attr("nbhcodes");
        var nbhName = JSON.parse($j(nbhSection[i]).attr("nbhnames"));
        nbhCodes = nbhCodes + " " + nbhCode;
        nbhNames[nbhCode] = nbhName[nbhCode];
      }

      nbhCodes = nbhCodes.trim().split(" ").join(", ");
      console.log("".concat(nbhCodes, " & ").concat(nbhNames));
      var years = JSON.stringify(this.Years);
      var month = this.Month;
      console.log(nbhCodes);
      var self = this;
      var chartDataUrl = "";

      switch (self.ChartTypeSelect.value) {
        case "dollar":
          if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData.php";
          } else {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData.php";
          }

          break;

        case "percentage":
          if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
          } else {
            chartDataUrl = pid_Data.siteurl + "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
          }

          break;
      }

      $j.ajax({
        url: chartDataUrl,
        method: "get",
        data: {
          Neighborhood_IDs: nbhCodes,
          Years: years,
          Month: month
        },
        dataType: "JSON",
        success: function success(res) {
          res.forEach(function (dataSet) {
            var xPropertyType = dataSet["property_Type"].trim();
            var xData = {
              label: nbhNames[dataSet["nbr_ID"].trim()],
              data: dataSet["nbr_Data"]
            }; // add dataset group by nbh

            var yNeighborhood = self.neighborhoodNames[dataSet["nbr_ID"].trim()];
            var yData = {
              label: self.neighborhoodNames[dataSet["nbr_ID"].trim()] + "_" + xPropertyType,
              data: dataSet["nbr_Data"]
            };

            switch (yNeighborhood) {
              default:
                self.chartDataSets_GroupByNbh.push([yNeighborhood, yData]);
                break;
            }

            switch (xPropertyType) {
              case "All":
                self.chartDataSets_All.push(xData);
                break;

              case "Detached":
                self.chartDataSets_Detached.push(xData);
                break;

              case "Townhouse":
                self.chartDataSets_Townhouse.push(xData);
                break;

              case "Apartment":
                self.chartDataSets_Apartment.push(xData);
                break;
            }
          }); // self.chartDataSets = res;
          // console.log("ajax");
          // console.log(self.chartDataSets_All);

          var rads = self.PropertyTypeSelect;
          var chkGroupByNbh = Array.from(self.PropertyTypeSelect).filter(function (rad) {
            return rad.value == "on";
          })[0].checked;

          if (chkGroupByNbh) {
            var chartDataSets = self.chartDataSets_GroupByNbh.map(function (nbhSet) {
              return nbhSet[1];
            });
            self.configChart(chartDataSets, self.chartColors2);
          } else {
            for (var i = 0; i < rads.length; i++) {
              var radValue = rads[i].value;
              var radChecked = rads[i].checked;

              if (radChecked) {
                switch (radValue) {
                  case "All":
                    self.configChart(self.chartDataSets_All, self.chartColors2);
                    break;

                  case "Detached":
                    self.configChart(self.chartDataSets_Detached, self.chartColors2);
                    break;

                  case "Townhouse":
                    self.configChart(self.chartDataSets_Townhouse, self.chartColors2);
                    break;

                  case "Apartment":
                    self.configChart(self.chartDataSets_Apartment, self.chartColors2);
                    break;
                }

                break;
              }
            }
          }

          self.prepareCanvasSize(self.chartConfig.data.datasets.length);
          self.drawChart(self.chartConfig);
        }
      });
    }
  }, {
    key: "drawChart",
    value: function drawChart(config) {
      // console.log(ctx);
      console.log(config); //var ctx = $j("#lineChart");
      // change Chartjs default font family

      var origAfterFit = Chart.Legend.prototype.afterFit;

      Chart.Legend.prototype.afterFit = function () {
        origAfterFit.call(this);

        if (this.options && this.options.maxSize) {
          var maxSize = this.options.maxSize;

          if (maxSize.height !== undefined) {
            this.height = Math.min(this.height, maxSize.height);
            this.minSize.height = Math.min(this.minSize.height, this.height);
          }

          if (maxSize.width !== undefined) {
            this.width = Math.min(this.width, maxSize.width);
            this.minSize.width = Math.min(this.minSize.width, this.width);
          }
        }
      };

      Chart.defaults.global.defaultFontFamily = "Montserrat";
      Chart.defaults.global.elements.line.fill = false;
      this.pidChart = new Chart(this.ctx, config);
      this.chartCanvas.hidden = false;

      if ($j("#".concat(this.chartCanvasID)).length > 0) {
        if (this.canvasImage == null) {
          this.canvasImage = new _CanvasImage__WEBPACK_IMPORTED_MODULE_2__["default"](this.chartCanvasID, this.marketSection);
        } else {
          // reset socialShare config
          this.canvasImage.socialShare.config = JSON.parse(JSON.stringify(this.canvasImage.socialDefaultConfig));
        }
      }

      this.drawCanvas = document.getElementById(this.chartCanvasID);
    }
  }]);

  return pidChart;
}();

/* harmony default export */ __webpack_exports__["default"] = (pidChart);

/***/ }),

/***/ "./src/SubMarkets.js":
/*!***************************!*\
  !*** ./src/SubMarkets.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



var SubMarkets = /*#__PURE__*/function () {
  function SubMarkets(chartCanvasID, labelID) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SubMarkets);

    labelID = labelID.split(" ").join("_"); // remove special characters in the label, eg. 素里(Surrey)

    labelID = labelID.replace("(", "").replace(")", "");
    var btnCloseContainerHtml = "\n          <div id='pid_sub_market_".concat(chartCanvasID, "_").concat(labelID, "' class='pid_sub_market_hidden'>\n            <input class=\"pid_sub_market_close\" id=\"pid_sub_market_close_").concat(chartCanvasID, "_").concat(labelID, "\" type='button' value='X'>\n          </div>\n    "); // this.btnClose = $j("#pid_sub_market_close_" + chartCanvasID);

    var btnCloseContainer = $j(btnCloseContainerHtml);
    this.formContainer = $j("#pid_sub_markets_fieldset_" + chartCanvasID);
    this.formContainer.append(btnCloseContainer);
    this.btnClose = $j("#pid_sub_market_close_".concat(chartCanvasID, "_").concat(labelID));
    this.containerID = "#pid_sub_market_".concat(chartCanvasID, "_").concat(labelID);
    this.labelContainer = $j(this.containerID);
    this.removeClass();
    this.events();
  } // events:


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SubMarkets, [{
    key: "events",
    value: function events() {
      var _this = this;

      this.btnClose.on("click", function () {
        console.log("clicked");
        var containerID = _this.containerID;
        var htmlLabels = $j("".concat(containerID, " label"));
        htmlLabels.remove();
        var htmlInputs = $j("".concat(containerID, " input[name='nbh_sub_market']"));
        htmlInputs.remove(); // this.labelContainer.addClass("pid_sub_market_hidden");

        _this.labelContainer.remove();
      });
    } // methods:

  }, {
    key: "removeClass",
    value: function removeClass() {
      this.labelContainer.removeClass("pid_sub_market_hidden");
    }
  }]);

  return SubMarkets;
}();

/* harmony default export */ __webpack_exports__["default"] = (SubMarkets);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PIDChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PIDChart */ "./src/PIDChart.js");
/* harmony import */ var _CMA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CMA */ "./src/CMA.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



$j(document).ready(function () {
  if ($j("#lineChart").length > 0) {//var chart = new pidChart("lineChart");
  }

  if ($j("#line_chart_1").length > 0) {
    var chart1 = new _PIDChart__WEBPACK_IMPORTED_MODULE_0__["default"]("line_chart_1");
  }

  if ($j("#line_chart_2").length > 0) {
    var chart2 = new _PIDChart__WEBPACK_IMPORTED_MODULE_0__["default"]("line_chart_2");
  }

  if ($j("#line_chart_3").length > 0) {
    var chart3 = new _PIDChart__WEBPACK_IMPORTED_MODULE_0__["default"]("line_chart_3");
  }

  var tableHeadings = document.getElementsByClassName("pid_cma_listing_tables");
  var wpDTs = [];
  var cmaType = "";

  var _iterator = _createForOfIteratorHelper(tableHeadings),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var tableHeading = _step.value;

      switch (tableHeading.id) {
        case "pid_cma_active_listings":
          cmaType = "active";
          break;

        case "pid_cma_sold_listings":
          cmaType = "sold";
          break;
      } // find heading's next sibling div, get the table inside the div


      var tables = $j(tableHeading.nextElementSibling).find("table"); // if tables exist, there will be only one table

      if (tables.length > 0) {
        var table = tables[0];
        wpDTs.push(new _CMA__WEBPACK_IMPORTED_MODULE_1__["default"](table, cmaType));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  resetGauge(1);
  resetGauge(2);
  resetGauge(3);
  resetGauge(4);
});

/***/ })

/******/ });
//# sourceMappingURL=index.js.map