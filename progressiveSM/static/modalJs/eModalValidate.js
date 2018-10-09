function validEModal(event)
{
    validQuantity(event);
    positiveQuantityTextbox("#pr", "prInv", "prVal", "#prD")
    if($("#qtInv").length == 0 && $("#prInv").length == 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validQuantity(event)
{
    // Checks that quantity has been entered, if entered make sure it is not more than you 
    // currently have if the subtract drop down has been chosen.

    var button = $(event.relatedTarget);
    avaiableQuantity = parseInt(button.data('available_quantity'));

    let quantity = $("#qt").val();
    if(!positiveQuantityTextbox("#qt", "qtInv", "qtVal", "#qtD"))
    {
        return false;
    }
    else if ($("#qtSelect").val() == "Subtract" && parseInt($("#qt").val()) > avaiableQuantity)
    {
        appendErrorMessage("#qtD", "qtInv", "Cannot subtract more than you currently have.", "#qt");
        return false;
    }
}