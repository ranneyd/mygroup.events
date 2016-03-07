$("#name").keyup(function(){
    console.log("ayy");
    $("#name-icon").hide();
    $("#name-loading").show();
    $.post(`/ajax/groupExists`,{
        name: $("#name").val()
    }, data => {
        console.log("lmao");
        $("#name-icon").show();
        $("#name-loading").hide();
        if(data){
            let error = "Group name is taken. Pick another";
            $(this).addClass("invalid").removeClass("valid")[0].setCustomValidity(error);
            $("#error").html(error);
        }
        else{
            $(this).addClass("valid").removeClass("invalid")[0].setCustomValidity("");
            $("#error").html("");
        } 
    });
});