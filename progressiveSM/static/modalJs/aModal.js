$(document).on('show.bs.modal','#addModal', function (event) {

    $("#connectorSelect").change(function(e)
    {
        e.stopImmediatePropagation();
        validationIds = ["connectorSelectInv", "connectorSelectVal"];
        connectorSelected();
    })

    $("#addDimensionOne").keyup(function(){
        validationIds = ["addDmOneInv", "addDmOneVal"];
        validTextbox(validationIds, "#addDimensionOne", "#addDimensionOneGroup");
    })

    $("#addDimensionTwo").keyup(function(){
        validationIds = ["addDmTwoInv", "addDmTwoVal"];
        validTextbox(validationIds, "#addDimensionTwo", "#addDimensionTwoGroup");
    })

    $("#addPrice").keyup(function()
    {
        validationIds = ["addPrInv", "addPrVal"];
        validTextbox(validationIds, "#addPrice", "#addPriceGroup");
    })

    $("#addQuantity").keyup(function()
    {
        validationIds = ["addQtInv", "addQtVal"];
        validTextbox(validationIds, "#addQuantity", "#addQuantityGroup");
    })

    $("#typeSelect").change(function(e){
        e.stopImmediatePropagation();
        // When custom type is selected, append a textbox after type drop down.
        if ($("#typeSelect").val() == "New/Custom Type")
        {
            textBox = "<input type=\"text\" class=\"form-control mt-3"
            + "\"id=\"customTypeTb\" placeholder=\"Custom type\" name=\"customTypeTb\">";
            $("#typeSelectGroup").append(textBox);
        }

        // If type drop down is changed but not to custom type, make sure no text box is left over
        else
        {
            if ($("#customTypeTb").length != 0)
            {
                $("#customTypeTb").remove();
            }
        }
    })
})