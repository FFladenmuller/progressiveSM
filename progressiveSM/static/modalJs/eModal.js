// Edit Modal =============================================================================
$(document).on('show.bs.modal','#editModal', function (event) {

  // Configure modal
  modalSetTitle(event, this);
  modalSetInfo(event);
  notes = $(event.relatedTarget).data('notes');

  $("#ntSelect").change(function(e) {
    if($("#ntSelect").val() == "Add to notes:")
    {
        $("#ntInput").val(""); 
    }
    else
    {
        $("#ntInput").val(notes);
    }
  })
})

function modalSetInfo(event)
{
    var button = $(event.relatedTarget);

    //set input box for notes to contain notes already in DB
    $("#ntInput").val(button.data('notes'));
    $("#pr").val(button.data('price'));
    $("#qt").val(button.data('quantity'));
    $("#loc").val(button.data('location'));
    $("#modalId").val(button.data('id'));
}

function modalRemoveValidation()
{
    validationIds = ["qtInv", "qtVal", "prInv", "prVal"];
    for (let i = 0; i < validationIds.length; i++)
    {
        removeValidationText(validationIds[i]);
    }
}