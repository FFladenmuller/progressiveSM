function appendErrorMessage(idToAppend, newElementId, msg, formIdToChange)
{
    divMsg = "<div class=" + "\"invalid-feedback d-block\"  id=" + newElementId + ">" + msg + "</div>";
    $(idToAppend).append(divMsg);
    removeFormClass(formIdToChange, "is-valid");
    changeFormStatus(formIdToChange, "is-invalid");
}

function appendValidFeedback(idToAppend, newElementId)
{
    if($(newElementId).length == 0)
    {
        divMsg = "<div class= \"valid-feedback d-block\" id=" + newElementId +"> Looks good! </div>"
        $(idToAppend).append(divMsg);
    }
}

function checkFieldEmpty(formId, idToAppend, newElementId, msg)
{
    let id = $(formId).val();
    if ($.trim(id) == "")
    {
        appendErrorMessage(idToAppend, newElementId, msg, formId);
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

function checkValidInput(formId, invDiv, idToAppend, valDiv)
{
    if ($(invDiv).length == 0)
    {
        removeFormClass(formId, "is-invalid");
        changeFormStatus(formId, "is-valid");
        appendValidFeedback(idToAppend, valDiv);
    }
}

function removeValidationText(invDiv, valDiv)
{
    $("div[id =" + invDiv + "]").remove();
    $("div[id =" + valDiv + "]").remove();
}

function containsNumber(str, idToAppend, newElementId, msg, formIdToChange)
{
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