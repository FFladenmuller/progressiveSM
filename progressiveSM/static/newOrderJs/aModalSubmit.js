var rows = 0; 

$(document).on('show.bs.modal','#addModal', function () {
    $("#aSvBtn").on('click', function(event){
        event.stopImmediatePropagation();
        if(validAModal())
        {
            // Add row
            var modalString = [];
            var rowString = [];
            
            rows += 1;
            rowString.push("<tr id= "+ "\"" + (rows) + "\"" + ">"); 
            shape = $("#shapeSelect").val();
            type = $("#typeSelect").val();
            connector = $("#connectorSelect").val();
            dimension_one = $("#addDimensionOne").val();
            dimension_two = $("#addDimensionTwo").val();
            quantity = $("#addQuantity").val();
            price = $("#addPrice").val();
            notes = $("#addNotes").val();

            //Add edit modal button with toggle and data
            rowString.push("<td><button type=\"button\" class=\"btn btn-secondary\"");
            modalString.push("data-toggle=\"modal\" data-target=\"#editModal\"");
            modalString.push("data-id = " + "\"" + rows + "\"");
            modalString.push("data-shape =" + "\"" + shape + "\"");
            modalString.push("data-type = " + "\"" + type + "\"");
            modalString.push("data-connector = " + "\"" + connector + "\"");
            modalString.push("data-dimension_one =" + "\"" + dimension_one + "\"");
            modalString.push("data-dimension_two =" + "\"" + dimension_two + "\"");
            modalString.push("data-quantity =" + "\"" + quantity + "\"");
            modalString.push("data-price = "  + "\"" + price + "\"");
            modalString.push("data-notes = " + "\"" + notes + "\">");
            rowString.push(modalString.join(" "));
            rowString.push("<i class=\"material-icons\">edit</i></button></td>");

            // Add info columns
            td = "<td>";
            tdId = "<td id= ";
            endTD = "</td>";
            rowString.push(td + shape + endTD);
            rowString.push(td + type + endTD);
            rowString.push(td + dimension_one + endTD); 
            rowString.push(td + connector + endTD);
            rowString.push(tdId + "quantity" + rows + ">" + quantity + endTD);
            rowString.push(tdId + "price" + rows + ">" + price + endTD);
            rowString.push(tdId + "notes" + rows + ">" + notes + endTD);

            rowString.push("<td><button type=\"button\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#deleteModal\"");
            rowString.push(modalString.join(" "));
            rowString.push("<i class=\"material-icons\">delete</i></button></td>");
            rowString.push("</tr>");
            $("#tbody").append(rowString.join(" ")); 
            
            // Clear and reset modal forms
            $('#connectorSelect').val('Select one:').change();
            removeFormClass("#connectorSelect", "is-invalid");
            removeValidationText("connectorSelectInv");

            $("#addDimensionOne").val('');
            $("#addDimensionTwo").val('');
            $("#addQuantity").val('');
            $("#addPrice").val('');
            $("#addNotes").val(''); 

            $(".is-valid").removeClass("is-valid");
            $(".valid-feedback").remove();

            $('#addModal').modal('toggle');
        }
    })
})