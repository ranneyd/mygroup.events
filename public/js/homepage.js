"use strict";

$("#name").keyup(function () {
    var _this = this;

    console.log("ayy");
    $("#name-icon").hide();
    $("#name-loading").show();
    $.post("/ajax/groupExists", {
        name: $("#name").val()
    }, function (data) {
        console.log("lmao");
        $("#name-icon").show();
        $("#name-loading").hide();
        if (data) {
            var error = "Group name is taken. Pick another";
            $(_this).addClass("invalid").removeClass("valid")[0].setCustomValidity(error);
            $("#error").html(error);
        } else {
            $(_this).addClass("valid").removeClass("invalid")[0].setCustomValidity("");
            $("#error").html("");
        }
    });
});