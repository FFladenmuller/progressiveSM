$("#confirmation").keyup(function(){

    // Make sure confirmation password == password
    confirmationNotPassword();
})

function confirmationNotPassword()
{
    removeValidationText("conInv", "conVal");
    if($("#confirmation").val() != $("#password").val())
    {
        appendErrorMessage($("#con"), "conInv", "Confirmation password must be the same as password.", "#confirmation");
        return true;
    }
    // Give it the old green light
    checkValidInput("#confirmation", "#conInv", "#con", "conVal");
}