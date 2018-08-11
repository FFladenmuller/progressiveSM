// If form is submitted validate form.
$("#registerForm").submit(function(event){
    if (!validForm())
    {
        event.preventDefault();
        return false;
    }
})

function validForm()
{
    validateUsername();
    passwordSecureEnough();
    checkEmail();
    confirmationNotPassword();
     $(document).ajaxStop(function() {
        if($("#usInv").length == 0 &&
           $("#pwInv").length == 0 &&
           $("#emInv").length == 0 &&
           $("#conInv").length == 0)
           {
               return true;
           }
           else
           {
               return false;
           }
     })
}
