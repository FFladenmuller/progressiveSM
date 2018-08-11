// If password field is typed into, validate that field
$("#password").keyup(function(){

    // Check security of password
    // Required:
    //* 8 characters
    //* 1 number
    //* 1 symbol
    //* Make sure password isn't username

    if(passwordSecureEnough())
    {
        checkValidInput("#password", "#pwInv", "#pw", "pwVal")
    }
});

function passwordSecureEnough()
{
    removeValidationText("pwInv", "pwVal");
    let secure = true;
    let password = $("#password").val();
    let username = $("#username").val();
    if (password.length < 8)
    {
        appendErrorMessage($("#pw"), "pwInv", "Please enter a password with 8 or more characters.", "#password");
        secure = false;
    }
    if (!containsNumber(password, "#pw", "pwInv", "Password must contain at least one number.", "#password"))
    {
        secure = false;
    }
    if (passwordIsUsername(password, username)){
        appendErrorMessage($("#pw"), "pwInv", "Password must not be the same as username.", "#password");
        secure = false;
    }
    if (!containsSymbol(password)){
        secure = false;
    }
    return secure;
}

function passwordIsUsername(password, username)
{
    if (password == username)
    {
        return true;
    }
}

function containsSymbol(password)
{
    for(let i = 0; i < password.length; i++)
    {
        if (password[i] == '!' || password[i] == '$' || password[i] == '?'
         || password[i] == '@' || password[i] == '#' || password[i] == '&'
         || password[i] == '%')
        {
            return true;
        }
    }
    appendErrorMessage($("#pw"), "pwInv", "Password must contain one of the following: !$?@#&%", "#password");
    return false;
}