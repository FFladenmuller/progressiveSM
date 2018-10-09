$(document).on('show.bs.modal','#addModal', function (event) {
    $("#addModalForm").on('submit', function(){
        if(validAModal())
        {
            return true;
        }
        else
        {
            event.preventDefault();
            return false;
        }
    })})