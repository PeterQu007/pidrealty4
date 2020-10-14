/**
 * pid wpdatatable module
 */
class WPDataTable {
  constructor(table, cmaType) {
    this.table = table;
    this.cmaType = cmaType;
    this.tableID = $j(table).attr('data-wpdatatable_id');

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
          }, 5000);
          break;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(this.table, config);
  }

  table_events() {
    let rows = this.table.querySelectorAll('tr');
    rows.forEach(row => row.addEventListener('click', (e) => {
      // console.log(e);
      let row = $j(e.target.parentNode);
      row.toggleClass('pid_clicked_table_row');
    }))
  }

  get_aggregates() {
    let colTotalPrice = 3;
    let colPricePerSF = 6;
    let colBCAChange = 4;
    let colBCALandValue = 9;
    let colBCAHouseValue = 10;
    let colBCATotalValue = 11;
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
        colTotalPrice = 3;
        colBCAChange = 4;
        colBCALandValue = 9;
        colBCAHouseValue = 10;
        colBCATotalValue = 11;
        this.setSummaryCMACell(35, "max", 4, this.cmaType); // BCA Change
        this.setSummaryCMACell(35, "min", 4, this.cmaType);
        this.setSummaryCMACell(35, "avg", 4, this.cmaType);

        this.setSummaryCMACell(35, "max", 11, this.cmaType); // BCA Land Value per sqft
        this.setSummaryCMACell(35, "min", 11, this.cmaType);
        this.setSummaryCMACell(35, "avg", 11, this.cmaType);

        this.setSummaryCMACell(35, "max", 12, this.cmaType); // BCA Land Value per sqft
        this.setSummaryCMACell(35, "min", 12, this.cmaType);
        this.setSummaryCMACell(35, "avg", 12, this.cmaType);
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
      let maxPricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_max" : "#pid_cma_active_land_price_per_square_feet_max";
      let avgPricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_avg" : "#pid_cma_active_land_price_per_square_feet_avg";
      let minPricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_min" : "#pid_cma_active_land_price_per_square_feet_min";

      let maxImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_max" : "#pid_cma_active_improve_price_per_square_feet_max";
      let avgImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_avg" : "#pid_cma_active_improve_price_per_square_feet_avg";
      let minImprovePricePFCellLabel = this.tableID == 34 ? "#pid_cma_active_price_per_square_feet_min" : "#pid_cma_active_improve_price_per_square_feet_min";

      let avgBCAChangePercentageCellLabel = this.tableID == 34 ? "" : "#pid_cma_active_bca_change_perc_avg";

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
        $j(avgBCAChangePercentageCellLabel).text().trim().replace(",", "").replace("%", "")
      );

      switch (this.tableID) {
        case "34": //attached
          maxPrice = maxPricePF * floorArea;
          avgPrice = avgPricePF * floorArea;
          minPrice = minPricePF * floorArea;
          break;
        case "35": //detached
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
      let cmaMaxPrice = $j("#pid_market_value_max");
      let cmaAvgPrice = $j("#pid_market_value_avg");
      let cmaMinPrice = $j("#pid_market_value_min");
      // Create our number formatter.
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

      cmaMinPrice.text("------");
      cmaAvgPrice.text("------");
      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
      if (bcaTotalValue < avgPrice) {
        cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      }
      if (bcaTotalValue < minPrice) {
        cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
      }
    });
  }

  evaluateSoldButton1() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_submit");
    buttonEvaluate.click((e) => {
      let maxPricePF = parseFloat(
        $j("#pid_cma_sold_price_per_square_feet_max")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let avgPricePF = parseFloat(
        $j("#pid_cma_sold_price_per_square_feet_avg")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let minPricePF = parseFloat(
        $j("#pid_cma_sold_price_per_square_feet_min")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let floorArea = parseFloat(
        $j("#pid_cma_total_floor_area").text().trim().replace(",", "")
      );
      let maxPrice = maxPricePF * floorArea;
      let avgPrice = avgPricePF * floorArea;
      let minPrice = minPricePF * floorArea;
      let cmaMaxPrice = $j("#pid_market_sold_value_max");
      let cmaAvgPrice = $j("#pid_market_sold_value_avg");
      let cmaMinPrice = $j("#pid_market_sold_value_min");
      // Create our number formatter.
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
    });
  }

  evaluateButton2() {
    let buttonEvaluate = $j("#pid_cma_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      let bcaTotalValue = parseFloat(
        $j("#pid_cma_bca_total_value")
          .text()
          .trim()
          .replace(",", "")
          .replace("$", "")
      );
      let maxPricePF = parseFloat(
        $j("#pid_cma_active_bca_change_perc_max")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let avgPricePF = parseFloat(
        $j("#pid_cma_active_bca_change_perc_avg")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let minPricePF = parseFloat(
        $j("#pid_cma_active_bca_change_perc_min")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let maxPrice = ((100 + maxPricePF) / 100) * bcaTotalValue;
      let avgPrice = ((100 + avgPricePF) / 100) * bcaTotalValue;
      let minPrice = ((100 + minPricePF) / 100) * bcaTotalValue;
      let cmaMaxPrice = $j("#pid_market_value_max"); // get target cell
      let cmaAvgPrice = $j("#pid_market_value_avg");
      let cmaMinPrice = $j("#pid_market_value_min");
      // Create our number formatter.
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
    });
  }

  evaluateSoldButton2() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      let bcaTotalValue = parseFloat(
        $j("#pid_cma_bca_total_value")
          .text()
          .trim()
          .replace(",", "")
          .replace("$", "")
      );
      let maxPricePF = parseFloat(
        $j("#pid_cma_sold_bca_change_perc_max")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let avgPricePF = parseFloat(
        $j("#pid_cma_sold_bca_change_perc_avg")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let minPricePF = parseFloat(
        $j("#pid_cma_sold_bca_change_perc_min")
          .text()
          .trim()
          .replace("$", "")
          .replace(",", "")
          .replace("%", "")
      );
      let maxPrice = ((100 + maxPricePF) / 100) * bcaTotalValue;
      let avgPrice = ((100 + avgPricePF) / 100) * bcaTotalValue;
      let minPrice = ((100 + minPricePF) / 100) * bcaTotalValue;
      let cmaMaxPrice = $j("#pid_market_sold_value_max"); // get target cell
      let cmaAvgPrice = $j("#pid_market_sold_value_avg");
      let cmaMinPrice = $j("#pid_market_sold_value_min");
      // Create our number formatter.
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
    });
  }

  startOver() {
    let buttonEvaluate = $j("#pid_cma_evaluate_start_over");
    buttonEvaluate.click((e) => {
      let cmaMaxPrice = $j("#pid_market_value_max");
      let cmaAvgPrice = $j("#pid_market_value_avg");
      let cmaMinPrice = $j("#pid_market_value_min");
      cmaMaxPrice.text("$");
      cmaAvgPrice.text("$");
      cmaMinPrice.text("$");
    });
  }

  startOverSold() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_start_over");
    buttonEvaluate.click((e) => {
      let cmaMaxPrice = $j("#pid_market_sold_value_max");
      let cmaAvgPrice = $j("#pid_market_sold_value_avg");
      let cmaMinPrice = $j("#pid_market_sold_value_min");
      cmaMaxPrice.text("$");
      cmaAvgPrice.text("$");
      cmaMinPrice.text("$");
    });
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
          .replace("=", "")
          .replace(".00", "")
          .trim();
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
              case 4: // BCA Change%
                cell_id = `pid_cma_${cmaType}_bca_change_perc`;
                break;
              case 11: // price per square feet
                cell_id = `pid_cma_${cmaType}_land_price_per_square_feet`;
                break;
              case 12: // price per square feet
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
              pid_aggr_cell.text("$" + aggr_price); // Write the aggregate number to the correct PID_CMA_CELL
            }
            break;
          case 35: //detached property
            if (aggregateNameColumn == 4) {
              pid_aggr_cell.text(aggr_price + "%"); // Write the aggregate number to the correct PID_CMA_CELL
            } else {
              pid_aggr_cell.text("$" + aggr_price); // Write the aggregate number to the correct PID_CMA_CELL
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

export default { WPDataTable };

