$(document).on('show.bs.modal','#editModal', function (event) {
    $("#editModalForm").on("submit", function(e){
        e.stopImmediatePropagation();
        var title = $("#eModalTitle").attr("name");
        modalRemoveValidation();
        if(validEModal(e))
        {
            return true;
        }
        else
        {
            e.preventDefault();
            return false;
        }
    })})