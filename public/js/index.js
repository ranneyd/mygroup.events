"use strict";

$(document).ready(function () {
    $('.dropdown-button').dropdown({
        constrain_width: false,
        belowOrigin: true });

    $(".tooltipped").click(function () {
        $(this).trigger("mouseleave");
    });
    $('.modal-trigger').leanModal();

    $('.datepicker').pickadate({
        weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        today: 'TODAY',
        clear: 'CLEAR',
        close: 'DONE',
        format: "mmmm d, yyyy",
        formatSubmit: 'yyyy/mm/dd',
        hiddenName: true,
        closeOnSelect: true,
        closeOnClear: false
    });
    $('.picker__footer button').addClass("btn-flat");
});