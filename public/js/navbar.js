"use strict";

$(".emoji-toggle").click(function () {
    $(".emoji-toggle").addClass("btn-flat");
    $(this).removeClass("btn-flat");
    $("#emoji-input").val($(this).attr("data-tooltip"));
});

$("#suggestion-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/suggestion",
        data: {
            sentiment: $("#emoji-input").val(),
            suggestion: $("#suggestion").val()
        }
    });
});
$("#mobile-menu-button").sideNav({
    edge: "left"
});

$("#mygroups").click(function () {
    $("#list-title").html("My Groups");
    $("#list-body").html("");
    $("#list-progress").show();
    $.post("/mygroups", function (data) {
        for (var i = 0; i < data.length; ++i) {
            var p = $("<p class='flow-text'>");
            p.append($("<a href=\"/" + data[i].url + "\">").html("" + data[i].name));
            p.append(" - " + data[i].description);
            $("#list-body").append(p);
        }
        $("#list-progress").hide();
    });
});

$("#members").click(function () {
    $("#list-title").html(title + " Members");
    $("#list-body").html("");
    $("#list-progress").show();
    $.post("/" + currentUrl + "/members", function (data) {
        for (var i = 0; i < data.length; ++i) {
            var p = $("<p class='flow-text'>");
            var chip = "";
            if (data[i].admin) {
                chip = "<div class='chip'>admin</div>";
            }
            p.append(data[i].name + " " + chip);
            $("#list-body").append(p);
        }
        $("#list-progress").hide();
    });
});