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
            suggestion: $("#suggestion").val(),
            sendUrl: $("#sendUrl").prop("checked"),
            sendUser: $("#sendUser").prop("checked"),
        },
        success: (response) => {
            Materialize.toast("Thank you for your suggestion!", 4000);
        }
    });
});
$("#mobile-menu-button").sideNav({
    edge: "left"
});

$(".mygroups").click(function(){
    $("#list-title").html("My Groups");
    $("#list-body").html("");
    $("#list-progress").show();
    $.post("./mygroups", data => {
        let groups = $("<div>");
        let invites = $("<div>");
        for(let i = 0; i < data.length; ++i) {
            let p = $("<p class='flow-text'>");
            p.append($(`<a href="/${data[i].url}">`).html(`${data[i].name}`));
            p.append(` - ${data[i].description}`);
            // Don't ask about the [0] thing. JavaScript man...
            if(data[i].invites[0]){
                invites.append(p);
            }
            else{
                groups.append(p);
            }
        }
        $("#list-body").append($("<h4>").html("Invites"));
        $("#list-body").append(invites);
        $("#list-body").append($("<h4>").html("Groups"));
        $("#list-body").append(groups);
        $("#list-progress").hide();
    });
});
