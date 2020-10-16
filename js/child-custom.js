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
