$(document).on('show.bs.modal','#editModal', function (event) {
    removeValidationText("prVal");
    removeValidationText("prInv");
    removeValidationText("qtVal");
    removeValidationText("qtInv");

    removeFormClass("#qt", "is-invalid");
    removeFormClass("#pr", "is-invalid");

    modalButton = $(event.relatedTarget);
    id = modalButton.data('id'); 
    $("#eSvBtn").on('click', function(event){
        if (validEModal(event)){
            // Set new price
            $("#price" + id).text($("#pr").val());
            
            // If quantity is add, add, else subtract
            if ($("#qtSelect").val() == "Add")
            {
                $("#quantity" + id).text( parseInt($("#quantity" + id).html()) + parseInt($("#qt").val()));
            }
            else 
            {
                $("#quantity" + id).text(parseInt($("#quantity" + id).html()) - parseInt($("#qt").val()));
            }

            // If notes is set to, just set notes to this. Otherwise, add to current notes.
            if ($("#ntSelect").val() == "Add to notes:" )
            {
                $("#notes" + id).text($("#notes" + id).html() + $("#ntInput").val());
            }
            else 
            {
                $("#notes" + id).text($("#ntInput").val());
            }

            // Clear fields, get rid of verification, close modal
            $("#qt").val("");
            $("#pr").val("");
            $("#notes").val("");

            removeFormClass("#qt", "is-valid");
            removeValidationText("qtVal");

            removeFormClass("#pr", "is-valid");
            removeValidationText("prVal");

            $('#editModal').modal('toggle');

        }
    })})