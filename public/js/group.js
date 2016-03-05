"use strict";

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var timePicker = function timePicker(event) {
    TimePicker.openOnInput(event.target);
    $(event.target).trigger("focusin");

    var compTimes = function compTimes(start, end) {
        var dateRegex = /(1[012]|[1-9]):([0-5][0-9]) ([ap]m)/;

        var _dateRegex$exec = dateRegex.exec(start);

        var _dateRegex$exec2 = _toArray(_dateRegex$exec);

        var match = _dateRegex$exec2[0];
        var hours = _dateRegex$exec2[1];
        var minutes = _dateRegex$exec2[2];
        var ampm = _dateRegex$exec2[3];

        var rest = _dateRegex$exec2.slice(4);

        var endParts = dateRegex.exec(end);
        console.log(hours);
        console.log(minutes);
        console.log(ampm);
    };
};

$("#timeStart").on('click', timePicker);
$("#timeEnd").on('click', timePicker);

var getGoogleMapsURL = function getGoogleMapsURL(location) {
    var API_KEY = "AIzaSyA_pbDU2WPMoChRE2oFhjJVNJHPI5-1Ewg";
    var newLocation = location.replace(/[^a-zA-Z0-9-]/g, "").split(" ").join("+");
    return "https://www.google.com/maps/embed/v1/place?q=" + newLocation + "&key=" + API_KEY;
};
$.get("/" + currentUrl + "/getEvents", function (data) {
    if (!data) {
        $("#no-events").show();
    }

    data.forEach(function (elem) {
        var eventCard = '<div class="row">' + '<div class="col s12 m10 offset-m1 l8 offset-l2">' + '<div class="card hoverable">' + '<div class="card-image waves-effect waves-block waves-light">' + ("<img class=\"activator\" src=\"/images/banners/" + elem.banner + "\">") + '</div>' + '<div class="card-content">' + ("<span class=\"card-title activator\">" + elem.name) + '<i class="material-icons right">more_vert</i>' + '</span>' + ("<p>" + new Date(elem.date).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })) + ("<span class=\"right\">" + elem.timeStart + " - " + elem.timeEnd + "</span>") + '</p>' + '</div>' + '<div class="card-reveal">' + ("<span class=\"card-title\">" + elem.name) + '<i class="material-icons right">close</i>' + '</span>' + '<div class="row">' + '<div class="col s12 l5">' + '<h5>Details</h5>' + ("<p>" + elem.description + "</p>") + '<h5>Location</h5>' + ("<p>" + elem.location + "</p>") + '</div>' + '<div class="col s10 l7">' + '<div class="video-container">' + ("<iframe class=\"card-map\" allowfullscreen frameborder=\"0\" src=\"" + getGoogleMapsURL(elem.location) + "\"></iframe>") + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="card-action">' + '<a>RSVP</a>' + '</div>' + '</div>' + '</div>' + '</div>';

        $("#content").append(eventCard);
    });
});

$("#newEventButton").click(function () {
    if ($("#basicInfoTab").hasClass("active")) {
        $("#bannerTabButton").click();
    } else if ($("#bannerTabButton").hasClass("active")) {
        $("#detailsTabButton").click();
    } else {
        $("#newEvent").submit();
    }
});

$("#newEventClose").click(function () {
    if ($("#basicInfoTab").hasClass("active")) {
        $("#add-event").closeModal();
    } else if ($("#bannerTabButton").hasClass("active")) {
        $("#basicInfoTab").click();
    } else {
        $("#bannerTabButton").click();
    }
});

$("li.tab a").click(function () {
    if ($(this).attr("id") === "basicInfoTab") {
        $("#newEventClose").html("Close");
    } else {
        $("#newEventClose").html("Back");
    }
    if ($(this).attr("id") === "detailsTabButton") {
        $("#newEventButton").html("Submit");
    } else {
        $("#newEventButton").html("Next");
    }
});

$(".add-event-trigger").click(function () {
    setTimeout(function () {
        $("#basicInfoTab").trigger("click");
    }, 200);

    $.get("/ajax/getBannerImages", function (data) {
        var newData = data.sort(function (a, b) {
            if (a.name[0] < b.name[0]) return -1;
            if (a.name[0] > b.name[0]) return 1;else return 0;
        });
        newData.forEach(function (val) {
            $("#banner-picker").append($("<option>").attr("value", val.url).attr("data-icon", "/images/banners/icons/" + val.url).attr("selected", val.url === "lights.png" ? '' : false).html(val.name[0]));
        });
        $('#banner-picker').material_select();

        $("#banner-loading").hide();
        $("#banner-row").show();
    });
});

$("#banner-picker").change(function () {
    $(".banner-preview").attr("src", "/images/banners/" + $(this).val());
});

$("#banner-row").hide();

$("#enter-location").click(function () {
    $(".map").attr("src", getGoogleMapsURL($("#location").val()));
});