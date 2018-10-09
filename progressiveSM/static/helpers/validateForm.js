function appendErrorMessage(divIdToAppend, invalidId, msg, tbIdToChange)
{
    // Appends error text under textbox if it has not cleared validation
    // Also changes form outline to red for invalid
    divMsg = "<div class=" + "\"invalid-feedback d-block\"  id=" + invalidId + ">" + msg + "</div>";
    $(divIdToAppend).append(divMsg);
    removeFormClass(tbIdToChange, "is-valid");
    changeFormStatus(tbIdToChange, "is-invalid");
}

function appendValidFeedback(divIdToAppend, validId)
{
    // Appends validation text under textbox if it has cleared validation
    if($(validId).length == 0)
    {
        divMsg = "<div class= \"valid-feedback d-block\" id=" + validId +"> Looks good! </div>"
        $(divIdToAppend).append(divMsg);
    }
}

function checkFieldEmpty(formId, divIdToAppend, newElementId, msg)
{
    // Makes sure a textbox is not empty, or just spaces
    if ($.trim($(formId).val()) == "")
    {
        appendErrorMessage(divIdToAppend, newElementId, msg, formId);
        return true;
    }
}

function changeFormStatus(formId, cssClass)
{
    $(formId).addClass(cssClass);
}

function removeFormClass(formId, cssClass)
{
    $(formId).removeClass(cssClass);
}

function checkValidInput(tbIdToChange, invalidId, divIdToAppend, validId)
{
    // Check if a textbox contains any error messages
    if ($(invalidId).length == 0)
    {
        removeFormClass(tbIdToChange, "is-invalid");
        changeFormStatus(tbIdToChange, "is-valid");
        appendValidFeedback(divIdToAppend, validId);
    }
}

function removeValidationText(idToRemove)
{
    // Removes validation/error text under textboxes. 
    $("div[id =" + idToRemove + "]").remove();
}

function containsNumber(str, idToAppend, newElementId, msg, formIdToChange)
{
    // Iterate through string, make sure there is at least one occurence of a number.
    for(let i = 0; i < str.length; i++)
    {
        if(!isNaN(parseInt(str[i])))
        {
            return true;
        }
    }
    appendErrorMessage(idToAppend, newElementId, msg, formIdToChange)
    return false;
}

function positiveQuantityTextbox(tbId, invalidId, validId, divIdToAppend)
{
    // Makes sure quantity entered is a positive number (>= 1)
    if (parseInt($(tbId).val()) >= 1)
    {
        checkValidInput(tbId, invalidId, divIdToAppend, validId);
        return true;
    }
    else 
    {
        appendErrorMessage(divIdToAppend, invalidId, "Please enter a postive number.", tbId);
    }
}

function modalSetTitle(event, thisModal)
{
  var button = $(event.relatedTarget);

  // Get data about item
  var shape = button.data('shape');
  var type = button.data('type');
  var dimensionOne = button.data('dimension_one');
  var dimensionTwo = button.data('dimension_two');
  var connector = button.data('connector');
  var id = button.data('id');

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


  modal.find('.modal-title').text("#" + id + ": " + shape + " " + type + ": " + dimensionStr + " " + connector);
}
