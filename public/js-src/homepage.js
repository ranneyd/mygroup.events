var convertGroupName = ( name ) => {
    return name.toLowerCase().replace(/ /g, "_").replace(/[^a-z0-9_]/g,"");
}
$("#name").keyup(function(){
    $("#name-icon").hide();
    $("#name-loading").show();
    var groupName =  convertGroupName($("#name").val())
    $.post(`/ajax/groupExists`,{
        name: groupName
    }, data => {
        $("#name-icon").show();
        $("#name-loading").hide();
        if(data){
            let error = "Group name is taken. Pick another";
            $(this).addClass("invalid").removeClass("valid")[0].setCustomValidity(error);
            $("#error").html(error);
            $(".urlHolder").hide();
        }
        else{
            $(this).addClass("valid").removeClass("invalid")[0].setCustomValidity("");
            $("#error").html("");
            $(".url").html(groupName);
            $(".urlHolder").show();
        } 
    });
});

$("#newGroupButton").click(function(){
    $("#newGroup").submit();
});

$("#add-group-trigger").click(function(event){
    if(user === "") {
        event.preventDefault();
        window.location.replace("/login");
    }
});
