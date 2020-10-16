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

export default SubMarkets;