// Edit Modal =============================================================================
$(document).on('show.bs.modal','#editModal', function (event) {

  // Configure modal
  modalSetTitle(event, this);
  modalSetNotes(event);

  $("#svBtn").on('click', function(){
      modalRemoveValidation();
      if(validEModal(event))
      {

      }
  })

  $('#ntSelect').on('change', function() {
    if($("#ntSelect").val() == "Add to notes:")
    {
        $("#ntInput").val("");
    }
    else
    {
        modalSetNotes(event);
    }
  })
    //validate price

    //if quantity is set to, call update quantity is new quantity
    //elif quantity is add, call update quantity is old quant + new qt
    //elif quantity is sub, call update quantity is old quant - new qt

    //if notes is set notes to, call update notes is new notes
    //elif notes is add to notes, call update notes is old notes + new notes
})

function modalSetTitle(event, thisModal)
{
  var button = $(event.relatedTarget);

  // Get data about item
  var shape = button.data('shape');
  var type = button.data('type');
  var dimensionOne = button.data('dimension_one');
  var dimensionTwo = button.data('dimension_two');

  // Get modal
  var modal = $(thisModal);

  var dimensionStr = "";
  if (shape == "Square")
  {
      dimensionStr = dimensionOne + " X " + dimensionTwo;
  }
  else if (type == "Reducer")
  {
      dimensionStr = dimensionOne + " : " + dimensionTwo;
  }
  else
  {
      dimensionStr = dimensionOne;
  }


  modal.find('.modal-title').text(shape + " " + type + ": " + dimensionStr);
}

function modalSetNotes(event)
{
    var button = $(event.relatedTarget);

    var notes = button.data('notes');

    //set input box for notes to contain notes already in DB
    $("#ntInput").val(notes);
}

function modalRemoveValidation()
{
  removeValidationText("qtInv", "qtVal");
  removeValidationText("prInv", "prVal");
}