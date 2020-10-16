/* Child Theme - Custom JS File for Users to add their own JS code */

/**
 * Use wordpress JQuery in a safeway
 *
 */

// google map feature
jQuery(document).ready(function ($) {
  $(".acf-map").each(function () {
    new_map($(this));
  });

  function new_map($el) {
    var infoWindows = [];
    // var
    var $markers = $el.find(".marker");

    // vars
    var args = {
      zoom: 16,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // create map
    var map = new google.maps.Map($el[0], args);

    // add a markers reference
    map.markers = [];

    var that = this;

    // add markers
    $markers.each(function () {
      add_marker($(this), map, infoWindows);
    });

    // center map
    center_map(map);
  } // end new_map

  function add_marker($marker, map, infoWindows) {
    // var
    var latlng = new google.maps.LatLng(
      $marker.attr("data-lat"),
      $marker.attr("data-lng")
    );

    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
    });

    map.markers.push(marker);

    // if marker contains HTML, add it to an infoWindow
    if ($marker.html()) {
      // create info window
      var infoWindow = new google.maps.InfoWindow({
        content: $marker.html(),
      });

      infoWindows.push(infoWindow);

      // show info window when marker is clicked
      google.maps.event.addListener(marker, "click", function (e) {
        console.log(e);
        // close all
        if (infoWindows.length > 0) {
          for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
          }
          infoWindows = [];
        }
        infoWindow.open(map, marker);
      });
    }
  } // end add_marker

  function center_map(map) {
    // vars
    var bounds = new google.maps.LatLngBounds();

    // loop through all markers and create bounds
    $.each(map.markers, function (i, marker) {
      var latlng = new google.maps.LatLng(
        marker.position.lat(),
        marker.position.lng()
      );

      bounds.extend(latlng);
    });

    // only 1 marker?
    if (map.markers.length == 1) {
      // set center of map
      map.setCenter(bounds.getCenter());
      map.setZoom(16);
    } else {
      // fit to bounds
      map.fitBounds(bounds);
    }
  } // end center_map
});

// subMarket class
// show subMarket Panels
class SubMarkets {
  constructor(chartCanvasID, labelID) {
    labelID = labelID.split(" ").join("_");
    // remove special characters in the label, eg. 素里(Surrey)
    labelID = labelID.replace("(", "").replace(")", "");
    let btnCloseContainerHtml = `
          <div id='pid_sub_market_${chartCanvasID}_${labelID}' class='pid_sub_market_hidden'>
            <input class="pid_sub_market_close" id="pid_sub_market_close_${chartCanvasID}_${labelID}" type='button' value='X'>
          </div>
    `;
    // this.btnClose = $j("#pid_sub_market_close_" + chartCanvasID);
    let btnCloseContainer = $j(btnCloseContainerHtml);
    this.formContainer = $j("#pid_sub_markets_fieldset_" + chartCanvasID);
    this.formContainer.append(btnCloseContainer);
    this.btnClose = $j(`#pid_sub_market_close_${chartCanvasID}_${labelID}`);
    this.containerID = `#pid_sub_market_${chartCanvasID}_${labelID}`;
    this.labelContainer = $j(this.containerID);
    this.removeClass();
    this.events();
  }

  // events:
  events() {
    this.btnClose.on("click", () => {
      console.log("clicked");
      let containerID = this.containerID;
      let htmlLabels = $j(`${containerID} label`);
      htmlLabels.remove();
      let htmlInputs = $j(`${containerID} input[name='nbh_sub_market']`);
      htmlInputs.remove();
      // this.labelContainer.addClass("pid_sub_market_hidden");
      this.labelContainer.remove();
    });
  }

  // methods:

  removeClass() {
    this.labelContainer.removeClass("pid_sub_market_hidden");
  }
}

// pidChart feature
var $j = jQuery.noConflict();
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

if ($j("#lineChart").length > 0) {
  //var chart = new pidChart("lineChart");
}
if ($j("#line_chart_1").length > 0) {
  var chart1 = new pidChart("line_chart_1");
}
if ($j("#line_chart_2").length > 0) {
  var chart2 = new pidChart("line_chart_2");
}
if ($j("#line_chart_3").length > 0) {
  var chart3 = new pidChart("line_chart_3");
}

window.Clipboard = (function (window, document, navigator) {
  var textArea,
    copy;

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    document.body.appendChild(textArea);
  }

  function selectText() {
    var range,
      selection;

    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
  }

  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  copy = function (text) {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };

  return {
    copy: copy
  };
})(window, document, navigator);

class CanvasImage {
  constructor(canvasID, marketSection) {
    this.btnDraw = document.getElementById(`create_${canvasID}`);
    this.drawingContainer = document.getElementById(
      `canvas_drawing_${canvasID}`
    );
    this.marketSection = marketSection;
    this.chartType = "";
    this.updateChartCommunities();
    this.chartCanvasID = canvasID;
    this.drawCanvas = document.getElementById(this.chartCanvasID);
    this.propertyTypeSelect =
      document[`pidMarketForm_${canvasID}`][`Property_Type_${canvasID}`];
    this.chartTypeSelect =
      document[`pidMarketForm_ChartType_${canvasID}`][`Chart_Type_${canvasID}`];
    this.monthSelect =
      document[`pidMarketForm_Time_${canvasID}`][`Stats_month_${canvasID}`];
    this.YearSelect =
      document[`pidMarketForm_Time_${canvasID}`][`Stats_Year_${canvasID}`];
    var shareButtonLabel = $j("#share-button-title").text(),
      propertyTitle =
        "Market Report 2020" /* $(".single-property-title, .rh_page__title").text(),*/,
      propertyThumbnail = $j(".only-for-print img").attr("src"),
      descriptionTextLength = 100, // Description Test Lenght for Social Media
      descriptionTextLabel = "HPI Chart URL"; // Label for URL you'd like to share via email
    this.socialDefaultConfig = {
      title: propertyTitle,
      image: propertyThumbnail,
      description: "Great Vancouver Real Estate Chart",
      ui: {
        flyout: $j("body").hasClass("rtl") ? "bottom center" : "bottom center",
        // button_text: shareButtonLabel
      },
      networks: {
        email: {
          title: propertyTitle,
          description:
            "Great Vancouver Real Estate Chart" +
            "%0A%0A" +
            descriptionTextLabel +
            ": " +
            window.location.href,
        },
      },
      postID: null,
    };
    this.RegisterSocialButtons.call(this, jQuery);
  }

  RegisterSocialButtons($) {
    "use strict";

    this.socialShare = new Share(".share-this-chart", this.socialDefaultConfig);
    this.socialDefaultConfig = JSON.parse(
      JSON.stringify(this.socialShare.config)
    );
    this.share_button = $($(".share-this-chart")[0]); // share div element(bottom one)
    this.share_icon = $("#social-share-chart"); // share link (upper one)
    // add click events
    this.share_icon.on("click", (e) => {
      e.preventDefault();
      // LIVE CODE:: bypass social post
      if (this.socialShare.config.url.indexOf("/ss") >= 0) {
        this.socialShare.toggle();
        return;
      }
      // Create a new market chart post, modify socialShare config data
      this.postCanvasToURL((pid) => {
        let newConfig = this.socialShare.config;
        newConfig.url = pid_Data.siteurl + `/ss${pid}/`;
        newConfig.networks.twitter.url = newConfig.url;
        newConfig.networks.facebook.url = newConfig.url;
        let subTitle =
          pid_Data.language == "en"
            ? " Real Estate Home Price Chart"
            : "房地产价格走势图";
        newConfig.description = this.chartCommunities.join(" | ") + subTitle;
        newConfig.networks.twitter.description = newConfig.description;
        this.socialShare.config = newConfig;
        this.socialShare.toggle();
      });
    });
    this.share_button.on("click", (e) => {
      e.preventDefault();
      // LIVE CODE:: bypass social post
      if (this.socialShare.config.url.indexOf("/ss") >= 0) {
        return;
      }
      // Create a new market chart post, modify socialShare config data
      this.postCanvasToURL((pid) => {
        let newConfig = this.socialShare.config;
        newConfig.url = pid_Data.siteurl + `/ss${pid}/`;
        newConfig.networks.twitter.url = newConfig.url;
        newConfig.networks.facebook.url = newConfig.url;
        let subTitle =
          pid_Data.language == "en"
            ? " Real Estate Home Price Chart"
            : "房地产价格走势图";
        newConfig.description = this.chartCommunities.join(" | ") + subTitle;
        newConfig.networks.twitter.description = newConfig.description;
        this.socialShare.config = newConfig;
      });
      // this.postDivToCanvasURL((pid) => {
      //   let newConfig = this.socialShare.config;
      //   newConfig.url = pid_Data.siteurl + `/ss${pid}/`;
      //   newConfig.networks.twitter.url = newConfig.url;
      //   newConfig.networks.facebook.url = newConfig.url;
      //   this.socialShare.config = newConfig;
      // });
    });
  }

  postCanvasToURL(callback) {
    // Convert canvas image to Base64
    this.drawCanvas = document.getElementById(this.chartCanvasID);
    var img64 = this.drawCanvas.toDataURL();
    console.log("Blob");
    var img = document.createElement("img");
    img.src = img64;
    img.classList.add("inspiry-qr-code");
    let oldImg = this.drawingContainer.querySelector("img");
    if (oldImg) {
      oldImg.remove();
    }
    this.drawingContainer.append(img);
    this.uploadImage(img64, callback);
  }

  postDivToCanvasURL(callback) {
    html2canvas(document.querySelector("#capture"), {
      // removeContainer: false,
      // canvas: document.getElementById("capturechartjsdrawing"),
      allowTaint: true,
    }).then((canvas) => {
      this.drawCanvas = canvas;
      var img64 = this.drawCanvas.toDataURL();
      var img = document.createElement("img");
      img.src = img64;
      img.classList.add("inspiry-qr-code");
      let oldImg = this.drawingContainer.querySelector("img");
      if (oldImg) {
        oldImg.remove();
      }
      this.drawingContainer.append(img);
      this.drawingContainer.append(canvas);
      this.uploadImage(img64, callback);
    });
  }

  updateChartCommunities() {
    let marketSection = this.marketSection;
    let nbhSection = null;
    let nbhNames = {};
    let nbhNames_tmp = {};
    if (marketSection.indexOf("_sub_markets_") < 0) {
      // for main market
      nbhSection = $j(marketSection);
      let theLabel = $j('label[for="' + nbhSection.attr("id") + '"]')[0];
      // nbhNames_tmp = JSON.parse(nbhSection.attr("nbhnames"));
      // nbhNames[[Object.keys(nbhNames_tmp)[0]]] = Object.values(nbhNames_tmp)[0];
      nbhNames["nbhCode"] = theLabel.innerText; // label's innerText could be localed
    } else {
      // for sub market compare
      nbhSection = $j(marketSection).find('input[type="hidden"]');
      let nbhSelected = $j(marketSection).find("label");
      let nbhCodes = "";
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
    }

    this.chartCommunities = Object.values(nbhNames);
    this.chartType = nbhSection.attr("name");
  }

  uploadImage(img64, callback) {
    // Use WP Ajax Module
    let uploadUrl = pid_Data.siteurl + "/wp-admin/admin-ajax.php"; // AJAX handler
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
    var imageFile = new File([file_data], "uploadImage.png");
    // Select Property Type Events
    this.updateChartCommunities(); // Update the Communities
    var rads = this.propertyTypeSelect;
    var propertyDescription = "";
    for (var i = 0; i < rads.length; i++) {
      let rad = rads[i];
      if (rad.type == "radio" && rad.checked) {
        propertyDescription = rad.value; // only show the english value
        break;
      } else if (rad.type == "checkbox") {
        propertyDescription = rad.checked ? rad.labels[0].innerText : "";
      }
    }
    // Select Chart Type
    var chartDescription = "";
    var radsChartType = this.chartTypeSelect;
    for (var i = 0; i < radsChartType.length; i++) {
      let rad = radsChartType[i];
      if (rad.type == "radio" && rad.checked) {
        chartDescription = rad.value; // only show the english value
      }
    }
    var form_data = new FormData();
    form_data.append("fileToUpload", imageFile);
    form_data.append("action", "uploadimage"); // action will be used by wp-ajax call, go to a associated function
    form_data.append(
      "chartParams",
      JSON.stringify({
        PropertyType: propertyDescription,
        Years: "2020",
        ChartType: chartDescription, // dollar or percentage
        Communities: JSON.stringify(this.chartCommunities),
      })
    );
    $j.ajax({
      url: uploadUrl, // point to server-side PHP script
      dataType: "text", // what to expect back from the PHP script, if anything
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      success: function (php_script_response) {
        // alert(php_script_response); // display response from the PHP script, if any
        php_script_response = php_script_response.split(",")[0];
        callback(php_script_response);
      },
    });
  }

  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }
}

class WPDataTable {
  constructor(table, cmaType) {
    this.table = table;
    this.cmaType = cmaType;
    this.tableID = $j(table).attr('data-wpdatatable_id');
    let is_mobile = false;
    if ($j('#pid-mobile').css('display') == 'none') {
      is_mobile = true;
    }
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
              this.evaluateByMarketPrice('active');
              this.evaluateByBCAChange('active');
              this.evaluateByMarketPrice('sold');
              this.evaluateByBCAChange('sold');
            }, 2000)
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
      this.evaluateByMarketPrice('active');
    })
  }

  evaluateByMarketPrice(cmaType) {
    let maxPricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_max` : `#pid_cma_${cmaType}_land_price_per_square_feet_max`;
    let avgPricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_avg` : `#pid_cma_${cmaType}_land_price_per_square_feet_avg`;
    let minPricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_min` : `#pid_cma_${cmaType}_land_price_per_square_feet_min`;

    let maxImprovePricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_max` : `#pid_cma_${cmaType}_improve_price_per_square_feet_max`;
    let avgImprovePricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_avg` : `#pid_cma_${cmaType}_improve_price_per_square_feet_avg`;
    let minImprovePricePFCellLabel = this.tableID == 34 ? `#pid_cma_${cmaType}_price_per_square_feet_min` : `#pid_cma_${cmaType}_improve_price_per_square_feet_min`;

    let avgBCAChangePercentageCellLabel = this.tableID == 34 ? "" : `#pid_cma_${cmaType}_bca_change_perc_avg`;

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
    let cmaMaxPrice = $j(`#pid_market_${cmaType}_value_max`);
    let cmaAvgPrice = $j(`#pid_market_${cmaType}_value_avg`);
    let cmaMinPrice = $j(`#pid_market_${cmaType}_value_min`);
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
    if (bcaTotalValue < avgPrice * 1.1) {
      cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
    }
    if (bcaTotalValue < minPrice) {
      cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));
    }

    // show value-price-ratio gauge
    let rangeMax = maxPrice - minPrice;
    let subjectPrice = parseInt($j(`#subject-${cmaType}-price-id`).attr('value'));
    let rangeSubjectVal = maxPrice - subjectPrice;
    let rangeAvg = maxPrice - avgPrice;
    let canvasNo = cmaType == 'active' ? 1 : 3;
    this.drawValuePriceRationGauge(0, rangeAvg, rangeMax, rangeSubjectVal, canvasNo);

  }

  evaluateSoldButton1() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByMarketPrice('sold');
    });
  }

  evaluateButton2() {
    let buttonEvaluate = $j("#pid_cma_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByBCAChange('active');
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
      maximumFractionDigits: 0
    });

    cmaMaxPrice.text(formatter.format(maxPrice.toFixed(0)));
    cmaAvgPrice.text(formatter.format(avgPrice.toFixed(0)));
    cmaMinPrice.text(formatter.format(minPrice.toFixed(0)));

    // show value-price-ratio gauge
    let rangeMax = maxPrice - minPrice;
    let subjectPrice = parseInt($j(`#subject-${cmaType}-price-id`).attr('value'));
    let rangeSubjectVal = maxPrice - subjectPrice;
    let rangeAvg = maxPrice - avgPrice;
    let canvasNo = cmaType == 'active' ? 2 : 4;
    this.drawValuePriceRationGauge(0, rangeAvg, rangeMax, rangeSubjectVal, canvasNo);
  }

  evaluateSoldButton2() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_by_bca_submit");
    buttonEvaluate.click((e) => {
      this.evaluateByBCAChange('sold');
    });
  }

  startOver() {
    let buttonEvaluate = $j("#pid_cma_evaluate_start_over");
    buttonEvaluate.click((e) => {
      this.resetCMAResult('active');
      resetGauge(1);
      resetGauge(2);
    });
  }

  startOverSold() {
    let buttonEvaluate = $j("#pid_cma_sold_evaluate_start_over");
    buttonEvaluate.click((e) => {
      this.resetCMAResult('sold');
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

  drawValuePriceRationGauge(min, avg, max, val, canvasNo) {
    let gaugeColor = '#6FADCF';
    if (val > avg) {
      gaugeColor = '#00FF55' // green
    } else {
      gaugeColor = '#FF2A2A' // red
    }

    var opts = {
      angle: 0.15, // The span of the gauge arc
      lineWidth: 0.36, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: gaugeColor,   // Colors
      colorStop: gaugeColor, //'#8FC0DA',    // just experiment with them
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support

    };
    let target = document.getElementById(`cma-value-price-ratio-gauge-${canvasNo}`); // your canvas element
    //clear target canvas
    let chartContext = target.getContext("2d");
    let width = target.width;
    let height = target.height;
    chartContext.clearRect(0, 0, width, height);
    let gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = max; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
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
          .replace('最大值:', '')
          .replace('最小值:', '')
          .replace('平均值:', '')
          .replace("=", "")
          .replace(".00", "")
          .replace(",", "")
          .trim();
        aggr_price = parseFloat(aggr_price)
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

const tableHeadings = document.getElementsByClassName("pid_cma_listing_tables");
let wpDTs = [];
let cmaType = "";
for (let tableHeading of tableHeadings) {
  switch (tableHeading.id) {
    case "pid_cma_active_listings":
      cmaType = "active";
      break;
    case "pid_cma_sold_listings":
      cmaType = "sold";
      break;
  }
  // find heading's next sibling div, get the table inside the div
  let tables = $j(tableHeading.nextElementSibling).find("table");
  // if tables exist, there will be only one table
  if (tables.length > 0) {
    let table = tables[0];
    wpDTs.push(new WPDataTable(table, cmaType));
  }
}

/**
 * @version [.200831] ADD LANGUAGE SWITCHER CLASS
 * @class LanguageSwitcher
 * @todo ajax call does not work, need to fix it later
 */
class LanguageSwitcher {
  constructor(language) {
    this.language = language;
    this.buttonChinese = $j("#pid_language_cn");
    this.buttonEnglish = $j("#pid_language_en");
    this.events();
  }

  // events
  events() {
    this.buttonChinese.click((e) => {
      this.language = "cn";
      this.setNewLanguage("cn");
    });
    this.buttonEnglish.click((e) => {
      this.language = "en";
      this.setNewLanguage("en");
    });
  }

  // methods

  setNewLanguage(language) {
    let data = {
      action: "switchlanguage",
      language: language,
    };
    $j.ajax({
      url: pid_Data.siteurl + "/wp-admin/admin-ajax.php", // AJAX handler
      data: data,
      type: "POST",
      success: function (res) {
        console.log("language changed:", res);
      },
    });
  }
}

$j(document).ready(() => {
  var langSwitcher = new LanguageSwitcher("en");

  resetGauge(1);
  resetGauge(2);
  resetGauge(3);
  resetGauge(4);
});

function resetGauge(gaugeNo) {
  var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
      length: 0.6, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#6FADCF',   // Colors
    colorStop: '#8FC0DA',    // just experiment with them
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support

  };

  var target = document.getElementById(`cma-value-price-ratio-gauge-${gaugeNo}`); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 3000; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(1500); // set actual value

}

// LOADMORE SCRIPT::
//blog posts static page
console.log("loadmore.js loaded");

function pagination(nav_id, button_id, button_text, current_page, last_page) {
  console.log("pagination");
  let nav = $j("#" + nav_id);
  let nav_current_anchor = nav.find("a[page_id='" + current_page + "']");
  let nav_anchors = nav.find("a");
  let nav_first = nav.find("[page_id='first']");
  let nav_previous = nav.find("[page_id='previous']");
  let nav_next = nav.find("[page_id='next']");
  let nav_last = nav.find("[page_id='last']");
  let button = document.getElementById(button_id);

  console.log(nav_current_anchor);
  nav_anchors.removeClass("current");
  nav_anchors.removeClass("disabled");
  nav_current_anchor.addClass("current");
  current_page = Number(current_page);
  last_page = Number(last_page);
  switch (current_page) {
    case last_page:
      nav_last.addClass("disabled");
      nav_next.addClass("disabled");
      if (button) {
        button.innerHTML = "";
        button.style.pointerEvents = "none";
      }
      break;
    case 1:
      nav_first.addClass("disabled");
      nav_previous.addClass("disabled");
    default:
      if (button) {
        button.innerHTML = button_text;
        button.style.pointerEvents = "auto";
      }
  }
}

$j(".loadmore2").click(function () {
  //custom query on front-page.php
  let query_id = $j(this).closest("session").attr("id");
  console.log(query_id);
  let last_page = ajax_session[query_id][1];
  // try to load next page...
  ajax_session[query_id][2]++;
  let new_current_page = ajax_session[query_id][2];
  var button = $j(this),
    data = {
      action: "loadmore",
      query: ajax_session[query_id][0],
      page: new_current_page,
      session_id: query_id,
    };
  var nav = $j(this).closest("session").find("nav");
  // console.log(pid_Data.siteurl + "/wp-admin/admin-ajax.php");
  console.log(data);
  $j.ajax({
    url: pid_Data.siteurl + "/wp-admin/admin-ajax.php", // AJAX handler
    data: data,
    type: "POST",
    beforeSend: function (xhr) {
      button.text("Loading..."); // change the button text, you can also add a preloader image
    },
    success: function (data) {
      if (data) {
        nav.prev().before(data);
        let nav_id = "pid_pagination_" + query_id;
        let button_id = "load_more_" + query_id;
        let button_text = "More " + ajax_session[query_id][3];
        pagination(nav_id, button_id, button_text, new_current_page, last_page);
      } else {
        button.text(""); // if no data, remove the button as well
      }
    },
  });
});

$j(".pid-page-numbers").click(function () {
  let query_id = $j(this).closest("session").attr("id");
  // console.log(query_id);
  let page_anchor = $j(this);
  let page_anchors = $j(this).closest("session").find("nav a");
  console.log(page_anchors);
  let button = $j(this).closest("session").find(".loadmore2");
  // console.log(button);
  let pid_overlay = $j(".pid_home_overlay");
  pid_overlay
    .css({ opacity: "0", visibility: "visible", "z-index": 999 })
    .animate({
      opacity: "1",
      queue: true,
      duration: 1000,
      easing: "quartEaseIn",
    });

  let post_div = $j(this)
    .closest("session")
    .find("." + query_id);
  // console.log(post_div);
  let nav = $j(this).closest("nav");
  let page_number = page_anchor.attr("page_id");
  let last_page = ajax_session[query_id][1];
  let current_page = ajax_session[query_id][2];
  switch (page_number) {
    case "first":
      ajax_session[query_id][2] = 1;
      break;
    case "last":
      ajax_session[query_id][2] = last_page;
      break;
    case "previous":
      ajax_session[query_id][2]--;
      break;
    case "next":
      ajax_session[query_id][2]++;
      break;
    default:
      ajax_session[query_id][2] = page_number;
  }
  let new_current_page = ajax_session[query_id][2];
  let ajaxAction = "";
  console.log(new_current_page);
  if ($j("body.home").length) {
    ajaxAction = "loadmorecommunities"; // load communities with thumbnails
  } else {
    ajaxAction = "loadmore"; // load posts with no thumbnails
  }
  var data = {
    action: ajaxAction,
    query: ajax_session[query_id][0],
    page: new_current_page,
    session_id: query_id,
  };

  console.log(pid_Data.siteurl + "/wp-admin/admin-ajax.php");
  $j.ajax({
    url: pid_Data.siteurl + "/wp-admin/admin-ajax.php", // AJAX handler
    data: data,
    type: "POST",
    beforeSend: function (xhr) {
      button.text("Loading..."); // change the button text, you can also add a preloader image
    },
    success: function (data) {
      if (data) {
        if ($j("body.home").length > 0) {
          let communityContainer = $j(".rh_gallery__wrap.isotope")[0];
          $j(communityContainer).empty();
          $j(communityContainer).append($j(data));
        } else {
          post_div.remove();
          nav.prev().before(data);
        }
        $j(".pid_home_overlay").css({ visibility: "hidden", "z-index": -1 });
        //re-pagination by javascript
        let nav_id = "pid_pagination_" + query_id;
        let button_id = "load_more_" + query_id;
        let button_text = "More " + ajax_session[query_id][3];

        /* ---------------------------------------------------- */
        /*  Gallery Hover Effect
         /* ---------------------------------------------------- */
        if ($j("body.home").length > 0) {
          $j(".rh_gallery__item figure").on({
            mouseenter: function () {
              var $currentFigure = $j(this);
              var $mediaContainer = $currentFigure.find(".media_container");
              var $media = $mediaContainer.find("a");
              var $margin = -($media.first().height() / 2);
              $media.css("margin-top", $margin);
              var linkWidth = $media.first().width();
              var targetPosition =
                $mediaContainer.width() / 2 - (linkWidth + 2);
              $mediaContainer.stop().fadeIn(300);
              $mediaContainer
                .find("a.link")
                .stop()
                .animate({ right: targetPosition }, 300);
              $mediaContainer
                .find("a.zoom")
                .stop()
                .animate({ left: targetPosition }, 300);
            },
            mouseleave: function () {
              var $currentFigure = $j(this);
              var $mediaContainer = $currentFigure.find(".media_container");
              $mediaContainer.stop().fadeOut(300);
              $mediaContainer
                .find("a.link")
                .stop()
                .animate({ right: "0" }, 300);
              $mediaContainer.find("a.zoom").stop().animate({ left: "0" }, 300);
            },
          });
        }

        pagination(nav_id, button_id, button_text, new_current_page, last_page);
      } else {
        button.text("");
      }
    },
  });
});

// chart js ajax call
$j("div.pid_market span").click(() => {
  console.log("sub market button clicked!");
});
