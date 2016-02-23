$(document).ready(function(){
    $("#mobile-menu-button").sideNav({
        edge: "left"
    });
    $('.dropdown-button').dropdown({
        constrain_width: false, // Does not change width of dropdown to that of the activator
        belowOrigin: true,      // Displays dropdown below the button
    });

    $(".tooltipped").click(function(){
        $(this).trigger("mouseleave");
    });
    $('.modal-trigger').leanModal();

    $('.datepicker').pickadate({
        weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        today: 'TODAY',
        clear: 'CLEAR',
        close: 'DONE',
        format:"mmmm d, yyyy",
        formatSubmit: 'yyyy/mm/dd',
        hiddenName: true,
        closeOnSelect: false,
        closeOnClear: false,
    });
    $('.timepicker').pickatime();
    $('.picker__footer button').addClass("btn-flat");
});