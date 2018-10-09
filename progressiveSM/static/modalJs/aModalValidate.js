function validAModal(event)
{
    validIds = ["addQtVal", "addPrVal", "addDmOneVal","addDmTwoVal"];

    invalidIds = ["addQtInv", "addPrInv", "addDmOneInv", "addDmTwoInv","customTbInv","connectorSelectInv"];

    validationIds = validIds.concat(invalidIds);
    for (let i = 0; i < validationIds.length; i++)
    {
        removeValidationText(validationIds[i]);
    }

    positiveQuantityTextbox("#addQuantity", "addQtInv", "addQtVal", "#addQuantityGroup");
    positiveQuantityTextbox("#addPrice", "addPrInv", "addPrVal", "#addPriceGroup");
    positiveQuantityTextbox("#addDimensionOne", "addDmOneInv", "addDmOneVal", "#addDimensionOneGroup");
    positiveQuantityTextbox("#addDimensionTwo", "addDmTwoInv", "addDmTwoVal", "#addDimensionTwoGroup");

    if($("#typeSelect").val() == "New/Custom Type")
    {
        checkFieldEmpty("#customTypeTb", "#typeSelectGroup", "customTbInv", "Please enter a type.");
    }

    if($("#connectorSelect").val() == "Select one:")
    {
        appendErrorMessage("#connectorSelectGroup", "connectorSelectInv", 
                           "Please select a connector type.", "#connectorSelect")
    }

    for (let i = 0; i < invalidIds.length; i++)
    {
        if ($("#" + invalidIds[i]).length > 0)
        {
            return false;
        }
    }
    return true;
}

function validTextbox(validationIds, tbId, divIdToAppend)
{
    // Invalid id expected first in validationIds
    for (let i =0; i < validationIds.length; i++)
    {
        removeValidationText(validationIds[i]);
    }
    positiveQuantityTextbox(tbId, validationIds[0], validationIds[1], divIdToAppend)
}

function connectorSelected()
{
    validationIds = ["connectorSelectInv", "connectorSelectVal"];
    for (let i = 0; i < validationIds.length; i++)
    {
        removeValidationText(validationIds[i]);
    }

    if($("#connectorSelect").val() == "Select one:")
    {
        appendErrorMessage("#connectorSelectGroup", "connectorSelectInv", 
                           "Please select a connector type.", "#connectorSelect");
    }
    checkValidInput("#connectorSelect", "#connectorSelectInv", "#connectorSelectGroup", "connectorSelectVal");
}