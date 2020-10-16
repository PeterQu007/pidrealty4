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

export default CanvasImage;