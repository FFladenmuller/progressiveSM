$("#email").keyup(function(){
    checkEmail();
})

function checkEmail()
{
    // Clear invalid/valid divs under form
    removeValidationText("emInv");
    removeValidationText("emVal");

    // If user has entered something and it isnt a valid email, LET EM KNOW
    if(!checkEmailEmpty() && !checkValidEmail($("#email").val()))
    {
        appendErrorMessage($("#em"), "emInv", "Invalid email.", "#email");
    }
    // If user has entered something but it's valid show validity
    else if(!checkEmailEmpty() && checkValidEmail($("#email").val()))
    {
        removeFormClass("#email", "is-invalid");
        changeFormStatus("#email", "is-valid");
        appendValidFeedback("#em", "emVal" );
    }
}

function checkValidEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkEmailEmpty()
{
    if($.trim($("#email").val()) == "")
    {
        return true;
    }
    return false;
}