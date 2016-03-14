$(".emoji-toggle").click(function(){
    $(".emoji-toggle").addClass("btn-flat");
    $(this).removeClass("btn-flat");
    $("#emoji-input").val($(this).attr("data-tooltip"));
});

$("#suggestion-form").submit(function(e){
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

$("#mygroups").click(function(){
    $("#list-title").html("My Groups");
    $("#list-body").html("");
    $("#list-progress").show();
    $.post("/mygroups", data => {
        for(let i = 0; i < data.length; ++i) {
            let p = $("<p class='flow-text'>");
            p.append($(`<a href="/${data[i].url}">`).html(`${data[i].name}`));
            p.append(` - ${data[i].description}`);
            $("#list-body").append(p);
        }
        $("#list-progress").hide();
    });
})