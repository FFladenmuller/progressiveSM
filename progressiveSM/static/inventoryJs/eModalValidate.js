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
    if(!containsNumber($("#pr").val(), "#prD", "prInv", "Please enter a number.", "#pr"))
    {
        return false;
    }
    else
    {
        checkValidInput("#pr", "prInv", "#prD", "prVal");
        return true;
    }
}