import pidChart from './PIDChart' ;
import WPDataTable from './CMA';

$j(document).ready(() => {

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
    switch(cmaType){
      case 'CMA':
        resetGauge(1);
        resetGauge(2);
      break;
      case 'VPR':
        resetGauge(3);
        resetGauge(4);
        break;
    }
  }
}

});






