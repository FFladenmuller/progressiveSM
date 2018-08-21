// If form is submitted validate form.
$("#registerForm").submit(function(event){
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
               event.preventDefault();
               return false;
           }
     })
})