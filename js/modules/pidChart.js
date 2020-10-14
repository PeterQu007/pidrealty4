// This module should be bundled in order to be functional in browser
// otherwise the browser will report an error:
// 'Cannot use import statement outside a module'

var $j = jQuery.noConflict();
class pidChart {
  constructor() {
    this.ctx = $j("#lineChart");
    this.neighborhoodCodes = $j("#marketSection").attr("nbhCodes");
    console.log(this.neighborhoodCodes);
    //console.log($j("#marketSection").attr("nbhNames"));
    this.neighborhoodNames = JSON.parse($j("#marketSection").attr("nbhNames"));
    console.log(this.neighborhoodNames);
    this.chartColors = {
      red: "rgb(255, 99, 132)",
      orange: "rgb(255, 159, 64)",
      yellow: "rgb(255, 205, 86)",
      green: "rgb(75, 192, 192)",
      blue: "rgb(54, 162, 235)",
      purple: "rgb(153, 102, 255)",
      grey: "rgb(231,233,237)",
    };
    this.chartColors2 = [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
      "rgb(231,233,237)",
    ];
    // console.log(this.chartColors2);
    this.PropertyTypeSelect = $j("#Property_Type");
    this.chartDataSets_All = [];
    this.chartDataSets_Detached = [];
    this.chartDataSets_Townhouse = [];
    this.chartDataSets_Apartment = [];
    this.pidChart = {};
    this.chartConfig = {};
    this.configChart([], this.chartColors2);
    this.getChartData();
    // this.init(this.chartDataSets_All);
    this.events();
  }

  events() {
    this.PropertyTypeSelect.on("change", this.updateChart.bind(this));
  }

  configChart(dataSets, colors) {
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
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          crosshair: {
            sync: {
              enabled: false,
            },
            pan: {
              incrementer: 3, // Defaults to 5 if not included.
            },
            callbacks: {
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
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "house value",
              },
            },
          ],
        },
      },
    };
    this.chartConfig = {};
    this.chartConfig = config;
  }

  updateChart(e) {
    console.log(e.target.value); //property type value
    console.log(this.pidChart);

    switch (e.target.value.trim()) {
      case "All":
        console.log("All");
        this.configChart(this.chartDataSets_All, this.chartColors2);
        break;
      case "Detached":
        console.log("Detached");
        this.configChart(this.chartDataSets_Detached, this.chartColors2);
        break;
      case "Townhouse":
        console.log("Townhouse");
        // this.chartConfig.data.datasets = this.chartDataSets_Townhouse;
        this.configChart(this.chartDataSets_Townhouse, this.chartColors2);
        break;
      case "Apartment":
        console.log("Apartment");
        // this.chartConfig.data.datasets = this.chartDataSets_Apartment;
        this.configChart(this.chartDataSets_Apartment, this.chartColors2);
        break;
    }
    this.pidChart.config = this.chartConfig;
    this.pidChart.update();
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

  getChartData() {
    var nbhSection = $j("#marketSection");
    var nbhCodes = nbhSection.attr("nbhCodes");
    console.log(nbhCodes);
    var self = this;

    $j.ajax({
      url:
        "http://localhost/pidrealty3/wp-content/themes/realhomes-child/db/chartData.php",
      method: "get",
      data: { Neighborhood_IDs: nbhCodes },
      dataType: "JSON",
      success: function (res) {
        res.forEach((dataSet) => {
          let xPropertyType = dataSet["property_Type"].trim();
          let xData = {
            label: self.neighborhoodNames[dataSet["nbr_ID"].trim()],
            data: dataSet["nbr_Data"],
          };
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
        console.log(self.chartDataSets_All);
        //self.init(self.chartDataSets_All);
        self.configChart(self.chartDataSets_All, self.chartColors2);
        self.drawChart(self.chartConfig);
      },
    });
  }

  drawChart(config) {
    // console.log(ctx);
    console.log(config);
    //var ctx = $j("#lineChart");
    this.pidChart = new Chart(this.ctx, config);
  }
}

export default pidChart;
