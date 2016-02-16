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
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
});