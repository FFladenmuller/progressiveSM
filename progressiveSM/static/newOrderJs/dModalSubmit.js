$(document).on('show.bs.modal', '#deleteModal', function(event)
{
    $("#delete").on('click', function(){
        var button = $(event.relatedTarget);
        $("#" + button.data('id')).remove();
    })
})