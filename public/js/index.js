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
});