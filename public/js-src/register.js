let verifyPass = () => {
    if($("#password").val() !== $("#password2").val()) {
        $("#password").removeClass("valid").addClass("invalid")[0].setCustomValidity("The passwords must match");
        $("#password2").removeClass("valid").addClass("invalid")[0].setCustomValidity("The passwords must match");
        $("#error").html("The passwords must match.");
    }
    else {
        $("#password").removeClass("invalid").addClass("valid")[0].setCustomValidity("");
        $("#password2").removeClass("invalid").addClass("valid")[0].setCustomValidity("");
        $("#error").html("");
    }       
};

$("#password").keyup(verifyPass);
$("#password2").keyup(verifyPass);

$("#username").keyup(function(){
    $("#username-icon").hide();
    $("#username-loading").show();
    $.get(`/ajax/userExists/${$("#username").val().toLowerCase()}`, data => {
        $("#username-icon").show();
        $("#username-loading").hide();
        if(data){                    
            $(this).addClass("invalid").removeClass("valid")[0].setCustomValidity("The username must be unique");
            $("#error").html("Username is taken. Pick another");
            $(".urlHolder").hide();
        }
        else{
            $(this).addClass("valid").removeClass("invalid")[0].setCustomValidity("");
            $("#error").html("");
        } 
    });
});