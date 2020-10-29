class WPDataTable {
  constructor(table, cmaType) {
    this.table = table;
    this.cmaType = cmaType;
    this.tableID = $j(table).attr("data-wpdatatable_id");
    let is_mobile = false;
    if ($j("#pid-mobile").css("display") == "none") {
      is_mobile = true;
    }
    this.cmaReportType = $j("#cma_report_id").attr("value");
    this.is_mobile = is_mobile;
    let pathArray = window.location.pathname.split("/");
    let lastItem = pathArray.pop();
    if (lastItem == "") {
      lastItem = pathArray.pop();
    }
    if (lastItem != "cn") {
      this.events();
    }
    switch (this.cmaType) {
      case "active": //attached
        this.evaluateButton1();
        this.evaluateButton2();
        this.startOver();
        break;
      case "sold": //detached
        this.evaluateSoldButton1();
        this.evaluateSoldButton2();
        this.startOverSold();
        break;
    }
  }

  // events

  events() {
    const config = { attributes: false, childList: true, subtree: true };

    const callback = (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          observer.disconnect();
          setTimeout(() => {
            this.get_aggregates();
            this.table_events();
            setTimeout(() => {
              this.evaluateByMarketPrice("active");
              this.evaluateByBCAChange("active");
              this.evaluateByMarketPrice("sold");
              this.evaluateByBCAChange("sold");
            }, 2000);
          }, 5000);
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(this.table, config);
  }

  table_events() {
    let rows = this.table.querySelectorAll("tr");
    rows.forEach((row) =>
      row.addEventListener("click", (e) => {
        // console.log(e);
        let row = $j(e.target.parentNode);
        row.toggleClass("pid_clicked_table_row");
      })
    );
  }

  get_aggregates() {
    let colTotalPrice = 3;
    let colPricePerSF = 6;
    let colBCAChange = 4;
    let colBCALandValuePSF = 9;
    let colBCAHouseValuePSF = 10;
    let colBCATotalValuePSF = 11;
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
    }

    // Check if need to hide Chinese Columns
    let xTD = $j('td[data-column_header="City_Name_CN"]');

    if (xTD.length > 0) {
      xTD.addClass("pid_wpdatatable_hidden_column");
    }
  }

  evaluateButton1() {
    // PER Active Listings
    let buttonEvaluate = $j("#pid_cma_evaluate_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByMarketPrice("active");
    });
  }

  evaluateByMarketPrice(cmaType) {
    let maxPricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_max`
        : `#pid_cma_${cmaType}_land_price_per_square_feet_max`;
    let avgPricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_avg`
        : `#pid_cma_${cmaType}_land_price_per_square_feet_avg`;
    let minPricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_min`
        : `#pid_cma_${cmaType}_land_price_per_square_feet_min`;

    let maxImprovePricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_max`
        : `#pid_cma_${cmaType}_improve_price_per_square_feet_max`;
    let avgImprovePricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_avg`
        : `#pid_cma_${cmaType}_improve_price_per_square_feet_avg`;
    let minImprovePricePFCellLabel =
      this.tableID == 34
        ? `#pid_cma_${cmaType}_price_per_square_feet_min`
        : `#pid_cma_${cmaType}_improve_price_per_square_feet_min`;

    let avgBCAChangePercentageCellLabel =
      this.tableID == 34 ? "" : `#pid_cma_${cmaType}_bca_change_perc_avg`;

    let floorAreaCellLabel = "#pid_cma_total_floor_area";
    let landSizeCellLabel = "#pid_cma_total_land_size";
    let bcaTotalValueCellLabel = "#pid_cma_bca_total_value";

    let maxPrice = 0;
    let avgPrice = 0;
    let minPrice = 0;

    let maxImprovePrice = 0;
    let avgImprovePrice = 0;
    let minImprovePrice = 0;

    let maxPricePF = parseFloat(
      $j(maxPricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );
    let avgPricePF = parseFloat(
      $j(avgPricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );
    let minPricePF = parseFloat(
      $j(minPricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );

    let maxImprovePricePF = parseFloat(
      $j(maxImprovePricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );
    let avgImprovePricePF = parseFloat(
      $j(avgImprovePricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );
    let minImprovePricePF = parseFloat(
      $j(minImprovePricePFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(",", "")
        .replace("%", "")
    );

    let floorArea = parseFloat(
      $j(floorAreaCellLabel).text().trim().replace(",", "")
    );
    let landSize = parseFloat(
      $j(landSizeCellLabel).text().trim().replace(",", "")
    );
    let bcaTotalValue = parseFloat(
      $j(bcaTotalValueCellLabel).text().trim().replace(",", "").replace("$", "")
    );
    let avgBCAChangePercentage = parseFloat(
      $j(avgBCAChangePercentageCellLabel)
        .text()
        .trim()
        .replace(",", "")
        .replace("%", "")
    );

    switch (this.tableID) {
      case "34": //attached
        maxPrice = maxPricePF * floorArea;
        avgPrice = avgPricePF * floorArea;
        minPrice = minPricePF * floorArea;
        break;
      case "35": //detached
        maxPrice =
          (maxPricePF * landSize * (100 + avgBCAChangePercentage)) / 100;
        avgPrice =
          (avgPricePF * landSize * (100 + avgBCAChangePercentage)) / 100;
        minPrice =
          (minPricePF * landSize * (100 + avgBCAChangePercentage)) / 100;

        maxImprovePrice =
          (maxImprovePricePF * floorArea * (100 + avgBCAChangePercentage)) /
          100;
        avgImprovePrice =
          (avgImprovePricePF * floorArea * (100 + avgBCAChangePercentage)) /
          100;
        minImprovePrice =
          (minImprovePricePF * floorArea * (100 + avgBCAChangePercentage)) /
          100;

        maxPrice += maxImprovePrice;
        avgPrice += avgImprovePrice;
        minPrice += minImprovePrice;
        break;
    }
    let cmaMaxPrice = $j(`#pid_market_${cmaType}_value_max`);
    let cmaAvgPrice = $j(`#pid_market_${cmaType}_value_avg`);
    let cmaMinPrice = $j(`#pid_market_${cmaType}_value_min`);
    // Create our number formatter.
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    cmaMinPrice.text("------");
    cmaAvgPrice.text("------");
    cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
    if (bcaTotalValue < avgPrice * 1.1) {
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
    }
    if (bcaTotalValue < minPrice) {
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
    }

    // show value-price-ratio gauge
    let rangeMax = maxPrice - minPrice;
    let subjectPrice = 0;
    switch (this.cmaReportType) {
      case "CMA":
        let subjectPrice1 = parseInt(
          $j(`#subject-active-price-id`).attr("value")
        );
        let subjectPrice2 = parseInt(
          $j(`#subject-sold-price-id`).attr("value")
        );
        subjectPrice = (subjectPrice1 + subjectPrice2) / 2;
        break;
      default:
        subjectPrice = parseInt(
          $j(`#subject-${cmaType}-price-id`).attr("value")
        );
        break;
    }
    let rangeSubjectVal = maxPrice - subjectPrice;
    let rangeAvg = maxPrice - avgPrice;
    let canvasNo = cmaType == "active" ? 1 : 3;
    let gaugeColor = "";
    switch (this.cmaReportType) {
      case "CMA":
        rangeMax = maxPrice - minPrice;
        // subjectPrice = parseInt($j(`#subject-${cmaType}-price-id`).attr('value'));
        rangeSubjectVal = subjectPrice - minPrice;
        rangeAvg = avgPrice - minPrice;
        canvasNo = cmaType == "active" ? 1 : 3;
        gaugeColor = "#FF2A2A"; //red
        break;
      case "VPR":
        rangeMax = maxPrice - minPrice;
        subjectPrice = parseInt(
          $j(`#subject-${cmaType}-price-id`).attr("value")
        );
        rangeSubjectVal = maxPrice - subjectPrice;
        rangeAvg = maxPrice - avgPrice;
        canvasNo = cmaType == "active" ? 1 : 3;
        gaugeColor = "#00FF55"; //green
        break;
    }
    this.drawValuePriceRationGauge(
      0,
      rangeAvg,
      rangeMax,
      rangeSubjectVal,
      canvasNo,
      gaugeColor
    );
  }

  evaluateSoldButton1() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByMarketPrice("sold");
    });
  }

  evaluateButton2() {
    let buttonEvaluate = $j("#pid_cma_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByBCAChange("active");
    });
  }

  evaluateByBCAChange(cmaType) {
    let bcaTotalValueCellLabel = "#pid_cma_bca_total_value";
    let maxPricePSFCellLabel = `#pid_cma_${cmaType}_bca_change_perc_max`;
    let avgPricePSFCellLabel = `#pid_cma_${cmaType}_bca_change_perc_avg`;
    let minPricePSFCellLabel = `#pid_cma_${cmaType}_bca_change_perc_min`;

    let cmaMaxPriceCellLabel = `#pid_market_${cmaType}_value_max_2`; // get target cell
    let cmaAvgPriceCellLabel = `#pid_market_${cmaType}_value_avg_2`;
    let cmaMinPriceCellLabel = `#pid_market_${cmaType}_value_min_2`;

    let bcaTotalValue = parseFloat(
      $j(bcaTotalValueCellLabel)
        .text()
        .trim()
        .replace(/,/g, "")
        .replace("$", "")
    );
    let maxPricePF = parseFloat(
      $j(maxPricePSFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(/,/g, "")
        .replace("%", "")
    );
    let avgPricePF = parseFloat(
      $j(avgPricePSFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(/,/g, "")
        .replace("%", "")
    );
    let minPricePF = parseFloat(
      $j(minPricePSFCellLabel)
        .text()
        .trim()
        .replace("$", "")
        .replace(/,/g, "")
        .replace("%", "")
    );
    let maxPrice = ((100 + maxPricePF) / 100) * bcaTotalValue;
    let avgPrice = ((100 + avgPricePF) / 100) * bcaTotalValue;
    let minPrice = ((100 + minPricePF) / 100) * bcaTotalValue;
    let cmaMaxPrice = $j(cmaMaxPriceCellLabel); // get target cell
    let cmaAvgPrice = $j(cmaAvgPriceCellLabel);
    let cmaMinPrice = $j(cmaMinPriceCellLabel);
    // Create our number formatter.
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
    cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
    cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));

    // show value-price-ratio gauge
    let rangeMax = maxPrice - minPrice;
    let subjectPrice = 0;
    switch (this.cmaReportType) {
      case "CMA":
        let subjectPrice1 = parseInt(
          $j(`#subject-active-price-id`).attr("value")
        );
        let subjectPrice2 = parseInt(
          $j(`#subject-sold-price-id`).attr("value")
        );
        subjectPrice = (subjectPrice1 + subjectPrice2) / 2;
        // set BCA Change range
        let htmlBCAChange = $j("#bca_change_range");
        let bcaChange1 = parseFloat(
          ((subjectPrice1 - bcaTotalValue) / bcaTotalValue) * 100
        ).toFixed(2);
        let bcaChange2 = parseFloat(
          ((subjectPrice2 - bcaTotalValue) / bcaTotalValue) * 100
        ).toFixed(2);
        htmlBCAChange.text(`${bcaChange1}% - ${bcaChange2}%`);
        break;
      default:
        subjectPrice = parseInt(
          $j(`#subject-${cmaType}-price-id`).attr("value")
        );
        break;
    }
    let rangeSubjectVal = maxPrice - subjectPrice;
    let rangeAvg = maxPrice - avgPrice;
    let canvasNo = cmaType == "active" ? 2 : 4;
    let gaugeColor = "";
    switch (this.cmaReportType) {
      case "CMA":
        rangeMax = maxPrice - minPrice;
        // subjectPrice = parseInt($j(`#subject-${cmaType}-price-id`).attr('value'));
        rangeSubjectVal = subjectPrice - minPrice;
        rangeAvg = avgPrice - minPrice;
        canvasNo = cmaType == "active" ? 2 : 4;
        gaugeColor = "#FF2A2A"; //red
        break;
      case "VPR":
        rangeMax = maxPrice - minPrice;
        subjectPrice = parseInt(
          $j(`#subject-${cmaType}-price-id`).attr("value")
        );
        rangeSubjectVal = maxPrice - subjectPrice;
        rangeAvg = maxPrice - avgPrice;
        canvasNo = cmaType == "active" ? 2 : 4;
        gaugeColor = "#00FF55"; //green
        break;
    }

    this.drawValuePriceRationGauge(
      0,
      rangeAvg,
      rangeMax,
      rangeSubjectVal,
      canvasNo,
      gaugeColor
    );
  }

  evaluateSoldButton2() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByBCAChange("sold");
    });
  }

  startOver() {
    let buttonEvaluate = $j("#pid_cma_evaluate_start_over");
    buttonEvaluate.click((e) => {
      this.resetCMAResult("active");
      resetGauge(1);
      resetGauge(2);
    });
  }

  startOverSold() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_start_over");
    buttonEvaluate.click((e) => {
      this.resetCMAResult("sold");
      resetGauge(3);
      resetGauge(4);
    });
  }

  resetCMAResult(cmaType) {
    let cmaMaxPrice = $j(`#pid_market_${cmaType}_value_max`);
    let cmaAvgPrice = $j(`#pid_market_${cmaType}_value_avg`);
    let cmaMinPrice = $j(`#pid_market_${cmaType}_value_min`);
    cmaMaxPrice.text("$");
    cmaAvgPrice.text("$");
    cmaMinPrice.text("$");
    let cmaMaxPrice2 = $j(`#pid_market_${cmaType}_value_max_2`);
    let cmaAvgPrice2 = $j(`#pid_market_${cmaType}_value_avg_2`);
    let cmaMinPrice2 = $j(`#pid_market_${cmaType}_value_min_2`);
    cmaMaxPrice2.text("$");
    cmaAvgPrice2.text("$");
    cmaMinPrice2.text("$");
  }

  drawValuePriceRationGauge(min, avg, max, val, canvasNo, gaugeColor) {
    // let gaugeColor = "#6FADCF";
    if (val > avg) {
      gaugeColor = gaugeColor; // "#00FF55"; // green
    } else {
      gaugeColor = gaugeColor == "#00FF55" ? "#FF2A2A" : "#00FF55"; // red
    }

    var opts = {
      angle: 0.15, // The span of the gauge arc
      lineWidth: 0.36, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#000000", // Fill color
      },
      limitMax: false, // If false, max value increases automatically if value > maxValue
      limitMin: false, // If true, the min value of the gauge will be fixed
      colorStart: gaugeColor, // Colors
      colorStop: gaugeColor, //'#8FC0DA',    // just experiment with them
      strokeColor: "#E0E0E0", // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true, // High resolution support
    };
    let target = document.getElementById(
      `cma-value-price-ratio-gauge-${canvasNo}`
    ); // your canvas element
    //clear target canvas
    let chartContext = target.getContext("2d");
    let width = target.width;
    let height = target.height;
    chartContext.clearRect(0, 0, width, height);
    let gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = max; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(val); // set actual value
  }

  // methods

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
  setSummaryCMACell(
    tableID = 34,
    aggregateType = "max",
    aggregateNameColumn = 4,
    cmaType = "active"
  ) {
    let colBCAChange = this.is_mobile ? 3 : 4;
    let colBCALandValuePSF = this.is_mobile ? 7 : 11;
    let colBCAHouseValuePSF = this.is_mobile ? 8 : 12;
    let xTableHeading2 = $j(`#pid_cma_${cmaType}_listings`);
    let xTables = xTableHeading2
      .next()
      .find(`table[data-wpdatatable_id=${tableID}]`);
    if (xTables.length > 0) {
      let xTable = xTables[0];
      let aggr_price_cell = $j(xTable).find(`td.wdt-${aggregateType}-cell`)[
        aggregateNameColumn
      ];
      if (aggr_price_cell && aggr_price_cell !== 0) {
        let aggr_price = aggr_price_cell.innerText
          .toLowerCase()
          .replace(`${aggregateType}`, "")
          .replace("最大值:", "")
          .replace("最小值:", "")
          .replace("平均值:", "")
          .replace("=", "")
          .replace(".00", "")
          .replace(",", "")
          .trim();
        aggr_price = parseFloat(aggr_price);
        if (aggr_price > 1000) {
          aggr_price = aggr_price.toFixed(0);
        } else {
          aggr_price = aggr_price.toFixed(1);
        }
        let cell_id = ""; // cell_id is defined in the single-cma.php file
        switch (tableID) {
          case 34: //attached property
            switch (aggregateNameColumn) {
              case 4: // total price
                cell_id = `pid_cma_${cmaType}_price`;
                break;
              case 5: // BCA Change%
                cell_id = `pid_cma_${cmaType}_bca_change_perc`;
                break;
              case 6: // price per square feet
                cell_id = `pid_cma_${cmaType}_price_per_square_feet`;
                break;
            }
            break;
          case 35: //detached property
            switch (aggregateNameColumn) {
              case colBCAChange: // BCA Change%
                cell_id = `pid_cma_${cmaType}_bca_change_perc`;
                break;
              case colBCALandValuePSF: // price per square feet
                cell_id = `pid_cma_${cmaType}_land_price_per_square_feet`;
                break;
              case colBCAHouseValuePSF: // price per square feet
                cell_id = `pid_cma_${cmaType}_improve_price_per_square_feet`;
                break;
            }
            break;
        }
        let pid_aggr_cell = $j(`#${cell_id}_${aggregateType.toLowerCase()}`);
        switch (tableID) {
          case 34: //attached property
            if (aggregateNameColumn == 5) {
              pid_aggr_cell.text(aggr_price + "%"); // Write the aggregate number to the correct PID_CMA_CELL
            } else {
              pid_aggr_cell.text("$" + parseFloat(aggr_price).toLocaleString()); // Write the aggregate number to the correct PID_CMA_CELL
            }
            break;
          case 35: //detached property
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

  hiddenColumn() {
    this.htmlCityNameCN.addClass("pid_wpdatatable_hidden_column");
  }
}

export default WPDataTable;
