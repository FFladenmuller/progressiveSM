var allowSubmit = false;

$("#loginForm").submit(function(event){
    validationIds = ["usInv", "usVal", "pwInv", "pwVal"];
    for (let i = 0; i < validationIds.length; i++)
    {
        removeValidationText(validationIds[i])
    }
    if(!allowSubmit){
        event.preventDefault(); // prevent form submiting here
        validForm();
    }
})

function validForm()
{
    validPassword();
    validUsername();
     $(document).ajaxStop(function() {
        if($("#pwInv").length > 0 || $("#usInv").length > 0)
        {
            return false;
        }
        else
        {
            allowSubmit = true;
            $("#loginForm").submit();
        }
     })
}


function validPassword(){
    let parameters = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    $.getJSON("/passwordCheck", parameters).done(function(data){
        if (data.result == false)
        {
            appendErrorMessage("#pw", "pwInv", "Password not valid.", "#password");
            checkFieldEmpty("#password", "#pw", "pwInv", "Please enter a password");
        }
        else{
            checkValidInput("#password", "#pwInv", "pw", "pwVal");
        }
    })

}

function validUsername()
{
    let parameters = {
        username: $("#username").val()
    };
    $.getJSON("/users", parameters).done(function(data){
        if (data.result == false)
        {
            appendErrorMessage($("#user"), "usInv", "Not a valid username.", "#username");
            checkFieldEmpty("#username", "#user", "usInv", "Please enter a username.");
        }
        else
        {
            checkValidInput("#username", "#usInv", "#user", "usVal");
        }
    })
}