function validEModal(event)
{
    validQuantity(event);
    validPrice();
    if($("#qtInv").length != 0 || $("#prInv").length != 0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function validQuantity(event)
{
    // Checks that quantity has been entered, if entered make sure it is not more than you 
    // currently have if the subtract drop down has been chosen.

    var button = $(event.relatedTarget);
    currentQuantity = parseInt(button.data('quantity'));

    let quantity = $("#qt").val();
    if(checkFieldEmpty("#qt", "#qtD", "qtInv", "Please enter a quantity.")
    || !containsNumber(quantity, "#qtD", "qtInv", "Please enter a number.", "#qt"))
    {
        return false;
    }
    else if ($("#qtSelect").val() == "Subtract" && parseInt($("#qt").val()) > currentQuantity)
    {
        appendErrorMessage("#qtD", "qtInv", "Cannot subtract more than you currently have.", "#qt");
        return false;
    }
    else
    {
        checkValidInput("#qt", "qtInv", "#qtD", "qtVal");
        return true;
    }
}

function validPrice()
{
    if(isNaN($("#pr").val()))
    {
        appendErrorMessage("#prD", "prInv", "Please enter a number.", "#pr");
        return false;
    }
    else
    {
        checkValidInput("#pr", "prInv", "#prD", "prVal");
        return true;
    }
}