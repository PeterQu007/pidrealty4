import CanvasImage from './CanvasImage';
import SubMarkets from './SubMarkets';

class pidChart {
  constructor(chartCanvasID) {
    // this.vw = Math.max(
    //   document.documentElement.clientWidth || 0,
    //   window.innerWidth || 0
    // );
    // this.vh = Math.max(
    //   document.documentElement.clientHeight || 0,
    //   window.innerHeight || 0
    // );
    this.vw = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().width;
    this.vh = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().height;

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

    this.chartColors2 = [
      "rgba(178, 32, 37, 0.95)", // red
      "rgba(255, 205, 86, 0.95)", // orange
      "rgba(75, 192, 192, 0.95)", // yellow
      "rgba(255, 159, 64, 0.95)", // green
      "rgba(54, 162, 235, 0.95)", // blue
      "rgba(153, 102, 255, 0.95)", // purple
      "rgba(204,0,102, 0.95)", // purple2
      "rgba(128,128,128, 0.95)", // grey
      "rgba(128,0,0, 0.95)", // maroon
      "rgba(85,107,47, 0.95)", // dark_olive_green
      "rgba(178, 32, 37, 0.75)",
      "rgba(255, 159, 64, 0.75)",
      "rgba(255, 205, 86, 0.75)",
      "rgba(75, 192, 192, 0.75)",
      "rgba(54, 162, 235, 0.75)",
      "rgba(153, 102, 255, 0.75)",
      "rgba(204,0,102, 0.75)",
      "rgba(128,128,128, 0.75)",
      "rgba(128,0,0, 0.75)",
      "rgba(85,107,47, 0.75)",
      "rgba(178, 32, 37, 0.5)",
      "rgba(255, 159, 64, 0.5)",
      "rgba(255, 205, 86, 0.5)",
      "rgba(75, 192, 192, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(153, 102, 255, 0.5)",
      "rgba(204,0,102, 0.5)",
      "rgba(128,128,128, 0.5)",
      "rgba(128,0,0, 0.5)",
      "rgba(85,107,47, 0.5)",
      "rgba(178, 32, 37, 0.25)",
      "rgba(255, 159, 64, 0.25)",
      "rgba(255, 205, 86, 0.25)",
      "rgba(75, 192, 192, 0.25)",
      "rgba(54, 162, 235, 0.25)",
      "rgba(153, 102, 255, 0.25)",
      "rgba(204,0,102, 0.25)",
      "rgba(128,128,128, 0.25)",
      "rgba(128,0,0, 0.25)",
      "rgba(85,107,47, 0.25)",
      "rgba(178, 32, 37, 0.15)",
      "rgba(255, 159, 64, 0.15)",
      "rgba(255, 205, 86, 0.15)",
      "rgba(75, 192, 192, 0.15)",
      "rgba(54, 162, 235, 0.15)",
      "rgba(153, 102, 255, 0.15)",
      "rgba(204,0,102, 0.15)",
      "rgba(128,128,128, 0.15)",
      "rgba(128,0,0, 0.15)",
      "rgba(85,107,47, 0.15)",
    ];
    var marketSection = "";
    this.PropertyTypeSelect =
      document[`pidMarketForm_${chartCanvasID}`][
      `Property_Type_${chartCanvasID}`
      ];
    this.YearSelect =
      document[`pidMarketForm_Time_${chartCanvasID}`][
      `Stats_Year_${chartCanvasID}`
      ];
    this.Years = [];
    let yearArray = Array.from(this.YearSelect);
    yearArray.forEach((y) => {
      if (y.checked) {
        this.Years.push(y.value);
      }
    });
    this.MonthSelect =
      document[`pidMarketForm_Time_${chartCanvasID}`][
      `Stats_month_${chartCanvasID}`
      ];
    this.Month = parseInt(this.MonthSelect.value);
    this.ChartTypeSelect =
      document[`pidMarketForm_ChartType_${chartCanvasID}`][
      `Chart_Type_${chartCanvasID}`
      ];
    this.LocationForm = document[`pidMarketForm_location_${chartCanvasID}`];
    this.Locations = this.LocationForm[`nbh_group_location_${chartCanvasID}`]; // get all input elements
    let inputLabels = this.LocationForm.getElementsByTagName("label"); // get all input labels
    // if active class exit, show its chart
    // if active class does not exit, show the first chart
    let activeLocation = Array.from(inputLabels).filter((element, index) => {
      return $j(element).hasClass(this.activeClass);
    });
    let activeIndex = 0;
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

  events() {
    // start over button event
    var startOver = document.getElementById(
      `form_footer_button_${this.chartCanvasID}`
    );
    startOver.addEventListener("click", () => {
      console.log("start over clicked");
      let subMarketContainer = $j(
        "#pid_sub_markets_fieldset_" + this.chartCanvasID
      );
      // subMarketContainer.children().remove();
      var filter = document.getElementById(
        `filter_subMarket_${this.chartCanvasID}`
      );
      filter.value = "";
      subMarketContainer
        .find("label")
        .attr("showchart", "no")
        .removeClass("pid_sub_select pid_sub_market_filtered");
      $j(this.Locations[0]).click();
      $j(this.LocationForm.getElementsByTagName("label")).removeClass(
        this.activeClass
      );
      $j(this.LocationForm.getElementsByTagName("label")[0]).addClass(
        this.activeClass
      );
    });

    // Filter applied
    var filter = document.getElementById(
      `filter_subMarket_${this.chartCanvasID}`
    );
    filter.addEventListener("keyup", (e) => {
      console.log("filter pressed");
      let filterText = e.target.value;
      let subMarketContainer = $j(
        "#pid_sub_markets_fieldset_" + this.chartCanvasID
      );
      subMarketContainer.find("label").removeClass("pid_sub_market_filtered");
      if (filterText !== "") {
        subMarketContainer
          .find("label")
          .filter((index, node) => {
            return (
              $j(node).text().toLowerCase().indexOf(filterText.toLowerCase()) >=
              0
            );
          })
          .addClass("pid_sub_market_filtered");
      }
    });

    // Select Property Type Events
    var rads = this.PropertyTypeSelect;
    for (var i = 0; i < rads.length; i++) {
      rads[i].addEventListener("change", (e) => {
        // uncheck Group by Types
        if (e.target.type == "radio") {
          // last emlement is the By Hood Group checkbox
          rads[rads.length - 1].checked = false;
        }
        // read the radio value, rebuilt the share link
        let paramDwell = e.target.value;
        this.htmlShareInput.val(this.buildShareLink('dwell', paramDwell));
        this.updateChart(e);
      });
    }
    // Select Stats Year Events
    var checkboxes = this.YearSelect;
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("click", (e) => {
        console.log("checkbox clicked!");
        this.Years = [];
        let chkBoxes = this.YearSelect;
        let paramYears = '';
        for (var i = 0; i < chkBoxes.length; i++) {
          if (chkBoxes[i].checked) {
            this.Years.push(parseInt(chkBoxes[i].value));
            paramYears += chkBoxes[i].value + ',';
          }
        }
        // remove the last ',' from paramYears
        paramYears = paramYears.slice(0, -1);
        // rebuild the share link
        this.htmlShareInput.val(this.buildShareLink('year', paramYears));

        let activeClass = this.activeClass;
        let inputLabels = this.LocationForm.getElementsByTagName("label");
        for (var i = 0; i < inputLabels.length; i++) {
          if (inputLabels[i].className.indexOf(activeClass) >= 0) {
            let inputID = $j(inputLabels[i]).attr("for");
            $j("#" + inputID).trigger("click");
          }
        }
      });
    }
    // Select Stats Month Events
    var monthSelect = this.MonthSelect;
    monthSelect.addEventListener("change", (e) => {
      console.log("month changed!");
      this.Month = e.target.value;
      // rebuild the share link with new month value
      this.htmlShareInput.val(this.buildShareLink('month', this.Month));

      let activeClass = this.activeClass;
      let inputLabels = this.LocationForm.getElementsByTagName("label");
      for (var i = 0; i < inputLabels.length; i++) {
        if (inputLabels[i].className.indexOf(activeClass) >= 0) {
          let inputID = $j(inputLabels[i]).attr("for");
          $j("#" + inputID).trigger("click");
        }
      }
    });
    // Select Chart Type Events
    var radsChartType = this.ChartTypeSelect;
    for (var i = 0; i < radsChartType.length; i++) {
      radsChartType[i].addEventListener("change", (e) => {
        // this.updateChart(e);
        console.log("Chart Type Changed");
        this.Years = [];
        let chkBoxes = this.YearSelect;
        let paramYears = "";
        for (var i = 0; i < chkBoxes.length; i++) {
          if (chkBoxes[i].checked) {
            this.Years.push(parseInt(chkBoxes[i].value));
            paramYears += chkBoxes[i].value + ',';
          }
        }
        // trim last , of paramYears
        paramYears = paramYears.slice(0, -1);
        this.htmlShareInput.val(this.buildShareLink('year', paramYears));
        this.htmlShareInput.val(this.buildShareLink('chart', e.target.value == 'percentage' ? 'perc' : 'dollar'));

        let activeClass = this.activeClass;
        let inputLabels = this.LocationForm.getElementsByTagName("label");
        for (var i = 0; i < inputLabels.length; i++) {
          if (inputLabels[i].className.indexOf(activeClass) >= 0) {
            let inputID = $j(inputLabels[i]).attr("for");
            $j("#" + inputID).trigger("click");
            return;
          }
        }
        this.prepareCanvas();
        this.configChart([], this.chartColors2);
        this.getChartData_Compare(
          "#pid_sub_markets_fieldset_" + this.chartCanvasID
        );
      });
    }
    // add location labels event (inputLables are for city/district/community lables)
    var inputLabels = this.LocationForm.getElementsByTagName("label");
    for (var i = 0; i < inputLabels.length; i++) {
      inputLabels[i].addEventListener("click", (e) => {
        // GET the Label's (e.target) associated Input: document.getElementById(e.target.htmlFor)
        console.log("label clicked:", e.target);
        this.nbhLabel = e.target.innerText; // this does not work with Chinese Labels, have to add an attribute slug for the Label
        this.nbhLabel = e.target.getAttribute("slug");
        // $nbhLabelForInput = document.getElementById(e.target.htmlFor);
        let inputLabels = e.target.parentElement.querySelectorAll("label");
        let nonActiveClass = this.nonActiveClass;
        for (let i = 0; i < inputLabels.length; i++) {
          inputLabels[i].classList.add(nonActiveClass);
        }
        let activeClass = this.activeClass;
        inputLabels.forEach((label, index) => {
          if (label.innerText != e.target.innerText) {
            label.classList.remove(activeClass);
          }
        });
        $j(e.target).toggleClass(activeClass);
        let inputID = $j(e.target).attr("for");
        let subMarketContainer = $j(
          "#pid_sub_markets_fieldset_" + this.chartCanvasID
        );

        // show charts of the main label
        if (
          subMarketContainer
            .find(`label.pid_sub_market_label_heading`)
            .filter((index, node) => {
              return $j(node).text() === e.target.innerText;
            }).length == 0
        ) {
          // if has not show sub market labels, add labels and show sub market select panel
          $j("#" + inputID).trigger("click");
          // creat the subMarkets panel, only the panel, sub labels have to be added later
          var subMarkets = new SubMarkets(
            this.chartCanvasID,
            e.target.getAttribute("slug") //cannot use e.target.innerText as label ID if in Chinese version
          );
        } else {
          if ($j(e.target).hasClass(activeClass)) {
            $j("#" + inputID).trigger("click");
            return;
          }
          this.prepareCanvas();
          this.configChart([], this.chartColors2);

          this.getChartData_Compare(
            "#pid_sub_markets_fieldset_" + this.chartCanvasID
          );
        }

        // get the sub market codes and names
        let nbhCodes = $j("#" + inputID)
          .attr("nbhcodes")
          .split(",");
        let nbhNames = JSON.parse($j("#" + inputID).attr("nbhnames"));

        // Add leading lable for the sub areas

        // ADD the sub_market_label
        // ADD click event to draw charts to each label
        for (var i = 0; i < nbhCodes.length; i++) {
          let inputLabel = nbhNames[nbhCodes[i]]; // set label to nbh names, Best Practice should be nbh codes;
          let subInputID = inputID + "_" + nbhCodes[i];
          let labelClass = "pid_sub_market_label";
          if (i == 0 && this.chartCanvasID.indexOf("_1") < 0) {
            labelClass = "pid_sub_market_label_heading";
          }
          const objNbhName = {};
          objNbhName[nbhCodes[i]] = nbhNames[nbhCodes[i]];
          let nbhName = JSON.stringify(objNbhName);

          let subMarketLabel = $j(
            `<label class="${labelClass}" slug="${inputLabel}" showchart="no" for="${subInputID}">${inputLabel}</label>`
          );
          let labelExisted = $j(`#${subInputID}`);
          if (labelExisted.length > 0) {
            continue;
          }
          let subMarketInput = $j(
            `<input type="hidden" id="${subInputID}" name="nbh_sub_market" nbhcodes="${nbhCodes[i]}" nbhnames='${nbhName}'>`
          );
          subMarkets.labelContainer.append(subMarketLabel);
          subMarkets.labelContainer.append(subMarketInput);
          // add subMarket Labels events
          subMarketLabel.on("click", (e) => {
            let thisLabel = $j(e.target);
            let msg = thisLabel.attr("for");
            console.log("subMarket:: ", msg);
            thisLabel.toggleClass("pid_sub_select");
            // main market labels remove active class
            var inputLabels = this.LocationForm.getElementsByTagName("label");
            this.nbhLabel = e.target.innerText; // this does not work for chinese labels
            this.nbhLabel = e.target.getAttribute("slug"); // temperally change to slug, Best Practice should use nbh codes
            // $nbhLabelForInput = document.getElementById(e.target.htmlFor);
            $j(inputLabels).removeClass(this.activeClass);
            if (thisLabel.hasClass("pid_sub_select")) {
              thisLabel.attr("showchart", "yes");
            } else {
              thisLabel.attr("showchart", "no");
            }

            this.prepareCanvas(nbhNames.length);
            this.configChart([], this.chartColors2);

            this.getChartData_Compare(
              "#pid_sub_markets_fieldset_" + this.chartCanvasID
            );
          });
        }
      });
    }

    var inputs = this.Locations;
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", (e) => {
        let thisInput = $j(e.target);
        console.log("input clicked:", e.target);
        let marketSection = "#" + thisInput.attr("id");
        this.neighborhoodCodes = $j(marketSection).attr("nbhcodes");
        console.log(this.neighborhoodCodes);
        this.neighborhoodNames = JSON.parse($j(marketSection).attr("nbhnames"));
        console.log(this.neighborhoodNames);
        this.prepareCanvas(this.neighborhoodNames.length);
        this.configChart([], this.chartColors2);
        this.getChartData(marketSection);
      });
    }
  }

  prepareCanvas() {
    this.vw = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().width;
    this.vh = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().height;
    this.chartDataSets_All = [];
    this.chartDataSets_Detached = [];
    this.chartDataSets_Townhouse = [];
    this.chartDataSets_Apartment = [];
    this.chartDataSets_GroupByNbh = [];
    this.pidChart = {};
    this.chartConfig = {};
    let chartCanvas = document.getElementById(this.chartCanvasID);
    this.chartCanvas = chartCanvas;
    let chartContext = chartCanvas.getContext("2d");
    let width = chartCanvas.width;
    let height = chartCanvas.height;
    chartContext.clearRect(0, 0, width, height);

    let canvasContainer = $j("#canvas_wrapper_" + this.chartCanvasID);
    chartCanvas.remove();
    let canvasNew =
      '<canvas id="' +
      this.chartCanvasID +
      '" height="400px !important" , width="400"></canvas>';
    canvasContainer.append(canvasNew);
    let canvas = document.querySelector("#" + this.chartCanvasID);
    canvas.hidden = true;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = this.vw * 0.9;
    let ctxHeight = (ctx.canvas.width / 16) * 9;
    // if on mobile device, and location are more than 10, double the height
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

  prepareCanvasSize(chartLines = 5) {
    this.vw = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().width;
    this.vh = document
      .getElementsByClassName("rh_page__main")[0]
      .getBoundingClientRect().height;

    let canvas = document.querySelector("#" + this.chartCanvasID);
    canvas.hidden = true;
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = this.vw * 0.9;
    let ctxHeight = (ctx.canvas.width / 16) * 9;
    // if on mobile device, and location are more than 10, double the height
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
        ctx.canvas.height =
          chartLines > 14 ? ctx.canvas.width * 0.9 : ctxHeight;
        break;
      default:
        ctx.canvas.height = 19 ? ctx.canvas.width * 0.8 : ctxHeight; // 400;
        break;
    }
    this.ctx = ctx;
    this.chartConfig.options.legend.maxSize.height = ctx.canvas.height * 0.2;
  }

  configChart(dataSets, colors) {
    let self = this;
    if (dataSets.length == 0) {
      let codes = this.neighborhoodCodes.split(",");
      for (var i = 0; i < codes.length; i++) {
        dataSets.push({
          label: "",
          data: {},
        });
      }
    }
    //set up datasets for the chart
    let chartDataSets = [];
    for (var i = 0; i < dataSets.length; i++) {
      chartDataSets.push({
        label: dataSets[i].label,
        fill: false,
        backgroundColor: colors[i], //
        borderColor: colors[i],
        data: dataSets[i].data,
      });
    }

    let defaultOptions = {
      global: {
        defaultFontFamily: "Helvetica",
      },
    };

    let config = {
      type: "line",
      data: {
        datasets: chartDataSets,
      },
      options: {
        title: {
          display: false,
          text: "",
        },
        legend: {
          maxSize: {
            height: 80,
          },
          position: "bottom",
          labels: {
            // This more specific font property overrides the global property
            fontFamily: "Helvetica",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "interpolate", //"index",
          intersect: false,
        },
        plugins: {
          crosshair: {
            line: {
              color: "#F66", // crosshair line color
              width: 1, // crosshair line width
            },
            sync: {
              enabled: false,
              group: 1, // chart group
              suppressTooltips: false,
            },
            zoom: {
              enabled: false, // enable zooming
              zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
              zoomboxBorderColor: "#48F", // border color of zoom box
              zoomButtonText: "Reset Zoom", // reset zoom button text
              zoomButtonClass: "reset-zoom", // reset zoom button class
            },
            callbacks: {
              beforeZoom: function (start, end) {
                // called before zoom, return false to prevent zoom
                return true;
              },
              afterZoom: function (start, end) {
                setTimeout(function () {
                  chart6.data.datasets[0].data = generate(start, end);
                  chart6.update();
                }, 1000);
              },
            },
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "quarter",
                displayFormats: {
                  quarter: "YY[Q]Q",
                },
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString:
                  self.ChartTypeSelect.value == "dollar"
                    ? "House Value" +
                    (self.vw < 500 ? "(million dollars)" : "(dollars)")
                    : "Change %",
              },
              fontFamily: "monospaced",
              ticks: {
                callback: function (value, index, values) {
                  let newValue = "";
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
                },
              },
            },
          ],
        },
      },
      defaults: defaultOptions,
    };
    this.chartConfig = {};
    this.chartConfig = config;
  }

  updateChart(e) {
    console.log(e.target.value); //property type value
    console.log(this.pidChart);

    switch (e.target.value.toLowerCase().trim()) {
      case "all":
      case "detached":
      case "townhouse":
      case "apartment":
      case "condo":
        this.configChart(
          this[`chartDataSets_${e.target.value.trim()}`],
          this.chartColors2
        );
        break;
      default:
        if (e.target.checked) {
          // remove radios check marks
          let rads = this.PropertyTypeSelect;
          for (var i = 0; i < rads.length - 1; i++) {
            rads[i].checked = false; // uncheck the radios, but do not keep the checkbox for nbh group
          }
          // do chart
          let firstNbh = this.chartDataSets_GroupByNbh[0][0];
          let chartDataSets = this.chartDataSets_GroupByNbh
            .filter((nbhSet) => nbhSet[0] == firstNbh)
            .map((nbhSet) => nbhSet[1]);
          this.configChart(chartDataSets, this.chartColors2);
        } else {
          Array.from(this.PropertyTypeSelect)
            .filter((rad) => rad.checked)
            .map((rad) => {
              this.configChart(
                this[`chartDataSets_${rad.value}`],
                this.chartColors2
              );
            });
        }
        break;
    }
    this.pidChart.config = this.chartConfig;
    this.pidChart.update();

    if ($j(`#${this.chartCanvasID}`).length > 0) {
      if (this.canvasImage == null) {
        this.canvasImage = new CanvasImage(this.chartCanvasID);
      } else {
        // reset socialShare config
        this.canvasImage.socialShare.config = JSON.parse(
          JSON.stringify(this.canvasImage.socialDefaultConfig)
        );
      }
    }
    this.drawCanvas = document.getElementById(this.chartCanvasID);
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    // chart.data.datasets.forEach(dataset => {
    //   dataset.data.push(data);
    // });
    data.forEach((dataSet) => chart.data.datasets.push(dataSet));
    chart.update();
    console.log(chart.data.datasets);
  }

  // copyTextToClipboard(text) {
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

  buildShareLink(paramName, paramValue) {

    // twitter and facebook does not support get params, change & to +
    paramValue = paramValue.toLowerCase();
    let shareLink = this.htmlShareInput.val();
    let shareLinkRegex = /https?:\/\/([a-z0-9A-Z\.-]+\/)+/;
    let dwellRegex = /dwell=[a-z]+/;
    let chartRegex = /chart=[a-z]+/;
    let yearRegex = /y=[\d,]+/;
    let monthRegex = /mh=[\d]{1,2}/;
    let mainShareLink = shareLinkRegex.test(shareLink) ? shareLink.match(shareLinkRegex)[0] : '';
    let paramDwell = dwellRegex.test(shareLink) ? shareLink.match(dwellRegex)[0] : 'dwell=all';
    let paramChart = chartRegex.test(shareLink) ? '$' + shareLink.match(chartRegex)[0] : '';
    let paramYear = yearRegex.test(shareLink) ? '$' + shareLink.match(yearRegex)[0] : '';
    let paramMonth = monthRegex.test() ? '$' + shareLink.match(monthRegex)[0] : '';
    switch (paramName) {
      case 'dwell':
        paramValue = paramValue == 'on' ? 'groupbynbh' : paramValue; // if 'on', then By Hood Checkbox is selected
        paramDwell = `dwell=${paramValue}`;
        break;
      case 'chart':
        paramChart = `$chart=${paramValue}`;
        break;
      case 'year':
        paramYear = `$y=${paramValue}`;
        break;
      case 'month':
        paramMonth = `$mh=${paramValue}`;
        break;
    }
    let newMainShareLink = mainShareLink + `?${paramDwell}${paramChart}${paramYear}${paramMonth}`;
    // this.copyTextToClipboard(newMainShareLink);
    this.htmlShareLink.attr("href", newMainShareLink);
    return newMainShareLink;
  }

  getChartData(marketSection) {
    var nbhSection = $j(marketSection);
    var nbhCodes = nbhSection.attr("nbhcodes");
    this.chartCommunities = Object.values(
      JSON.parse(nbhSection.attr("nbhnames"))
    );
    this.chartType = nbhSection.attr("name");
    if (this.canvasImage) {
      this.canvasImage.marketSection = marketSection;
    }
    var years = JSON.stringify(this.Years);
    let month = this.Month;
    console.log(nbhCodes);
    var self = this;
    let chartDataUrl = "";
    switch (self.ChartTypeSelect.value) {
      case "dollar":
        if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData.php";
        } else {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData.php";
        }
        break;
      case "percentage":
        if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
        } else {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
        }
        break;
    }

    $j.ajax({
      url: chartDataUrl,
      method: "get",
      data: { Neighborhood_IDs: nbhCodes, Years: years, Month: month },
      dataType: "JSON",
      success: function (res) {
        res.forEach((dataSet) => {
          let xPropertyType = dataSet["property_Type"].trim();
          let xData = {
            label: self.neighborhoodNames[dataSet["nbr_ID"].trim()],
            data: dataSet["nbr_Data"],
          };
          // add dataset group by nbh
          let yNeighborhood = self.neighborhoodNames[dataSet["nbr_ID"].trim()];
          let yData = {
            label:
              self.neighborhoodNames[dataSet["nbr_ID"].trim()] +
              "_" +
              xPropertyType,
            data: dataSet["nbr_Data"],
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

        let rads = self.PropertyTypeSelect;
        let chkGroupByNbh = Array.from(self.PropertyTypeSelect).filter(
          (rad) => rad.value == "on"
        )[0].checked;
        if (chkGroupByNbh) {
          let thisNbh = self.nbhLabel
            ? self.nbhLabel
            : self.chartDataSets_GroupByNbh[0][0];
          let chartDataSets = self.chartDataSets_GroupByNbh
            .filter((nbhSet) => nbhSet[0] == thisNbh)
            .map((nbhSet) => nbhSet[1]);
          self.configChart(chartDataSets, self.chartColors2);
        } else {
          for (var i = 0; i < rads.length; i++) {
            let radValue = rads[i].value;
            let radChecked = rads[i].checked;
            if (radChecked) {
              switch (radValue) {
                case "All":
                  self.configChart(self.chartDataSets_All, self.chartColors2);
                  break;
                case "Detached":
                  self.configChart(
                    self.chartDataSets_Detached,
                    self.chartColors2
                  );
                  break;
                case "Townhouse":
                  self.configChart(
                    self.chartDataSets_Townhouse,
                    self.chartColors2
                  );
                  break;
                case "Apartment":
                  self.configChart(
                    self.chartDataSets_Apartment,
                    self.chartColors2
                  );
                  break;
              }
              break;
            }
          }
        }
        self.prepareCanvasSize(self.chartConfig.data.datasets.length);
        self.drawChart(self.chartConfig);
      },
    });
  }

  getChartData_Compare(marketSection) {
    // marketSection = 'pid_sub_market'
    if (this.canvasImage) {
      this.canvasImage.marketSection = marketSection;
    }
    let nbhSection = $j(marketSection).find('input[type="hidden"]');
    let nbhSelected = $j(marketSection).find("label");
    let nbhCodes = "";
    let nbhNames = {};
    for (var i = 0; i < nbhSection.length; i++) {
      let nbhSelect = $j(nbhSelected[i]).attr("showchart");
      if (nbhSelect != "yes") {
        continue;
      }
      let nbhCode = $j(nbhSection[i]).attr("nbhcodes");
      let nbhName = JSON.parse($j(nbhSection[i]).attr("nbhnames"));
      nbhCodes = nbhCodes + " " + nbhCode;
      nbhNames[nbhCode] = nbhName[nbhCode];
    }
    nbhCodes = nbhCodes.trim().split(" ").join(", ");
    console.log(`${nbhCodes} & ${nbhNames}`);

    var years = JSON.stringify(this.Years);
    let month = this.Month;
    console.log(nbhCodes);
    var self = this;
    let chartDataUrl = "";
    switch (self.ChartTypeSelect.value) {
      case "dollar":
        if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData.php";
        } else {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData.php";
        }
        break;
      case "percentage":
        if (pid_Data.siteurl.indexOf("pidhomes.ca") >= 0) {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
        } else {
          chartDataUrl =
            pid_Data.siteurl +
            "/wp-content/themes/realhomes-child-3/db/chartData_Percentage.php";
        }
        break;
    }

    $j.ajax({
      url: chartDataUrl,
      method: "get",
      data: { Neighborhood_IDs: nbhCodes, Years: years, Month: month },
      dataType: "JSON",
      success: function (res) {
        res.forEach((dataSet) => {
          let xPropertyType = dataSet["property_Type"].trim();
          let xData = {
            label: nbhNames[dataSet["nbr_ID"].trim()],
            data: dataSet["nbr_Data"],
          };
          // add dataset group by nbh
          let yNeighborhood = self.neighborhoodNames[dataSet["nbr_ID"].trim()];
          let yData = {
            label:
              self.neighborhoodNames[dataSet["nbr_ID"].trim()] +
              "_" +
              xPropertyType,
            data: dataSet["nbr_Data"],
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
        // self.chartDataSets = res;
        // console.log("ajax");
        // console.log(self.chartDataSets_All);
        let rads = self.PropertyTypeSelect;
        let chkGroupByNbh = Array.from(self.PropertyTypeSelect).filter(
          (rad) => rad.value == "on"
        )[0].checked;
        if (chkGroupByNbh) {
          let chartDataSets = self.chartDataSets_GroupByNbh.map(
            (nbhSet) => nbhSet[1]
          );
          self.configChart(chartDataSets, self.chartColors2);
        } else {
          for (var i = 0; i < rads.length; i++) {
            let radValue = rads[i].value;
            let radChecked = rads[i].checked;
            if (radChecked) {
              switch (radValue) {
                case "All":
                  self.configChart(self.chartDataSets_All, self.chartColors2);
                  break;
                case "Detached":
                  self.configChart(
                    self.chartDataSets_Detached,
                    self.chartColors2
                  );
                  break;
                case "Townhouse":
                  self.configChart(
                    self.chartDataSets_Townhouse,
                    self.chartColors2
                  );
                  break;
                case "Apartment":
                  self.configChart(
                    self.chartDataSets_Apartment,
                    self.chartColors2
                  );
                  break;
              }
              break;
            }
          }
        }

        self.prepareCanvasSize(self.chartConfig.data.datasets.length);
        self.drawChart(self.chartConfig);
      },
    });
  }

  drawChart(config) {
    // console.log(ctx);
    console.log(config);
    //var ctx = $j("#lineChart");
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
    if ($j(`#${this.chartCanvasID}`).length > 0) {
      if (this.canvasImage == null) {
        this.canvasImage = new CanvasImage(
          this.chartCanvasID,
          this.marketSection
        );
      } else {
        // reset socialShare config
        this.canvasImage.socialShare.config = JSON.parse(
          JSON.stringify(this.canvasImage.socialDefaultConfig)
        );
      }
    }
    this.drawCanvas = document.getElementById(this.chartCanvasID);
  }
}

export default pidChart;