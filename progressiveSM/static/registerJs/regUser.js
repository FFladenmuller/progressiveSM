//setup timer before functions
var typingtimer;
var doneTypingInterval = 1000;  //time in ms (5 seconds)

//on keyup, start the countdown
// If username field is typed into, validate that field
$("#username").keyup(function(){
    clearTimeout(typingtimer);
    if($("#username").val())
    {
        typingtimer = setTimeout(function(){
            validateUsername($("#username").val())
        }, doneTypingInterval);
    }
});

function validateUsername(username)
{
    // Clear invalid/valid divs under form
    removeValidationText("usInv", "usVal");

    let parameters = {
        username: username
    };
    // Make sure user entered something into username text box
    checkFieldEmpty("#username", "#user", "usInv", "Please enter a username.");
    $.getJSON("/users", parameters).done(function(data){
        if (data.result == true)
        {
            appendErrorMessage($("#user"), "usInv", "Username already taken.", "#username");
        }
        else
        {
            checkValidInput("#username", "#usInv", "#user", "usVal");
        }})
}