$(document).on('show.bs.modal', '#deleteModal', function(event)
{
    // Configure modal
    var button = $(event.relatedTarget);
    modalSetTitle(event, this);
    $("#dModalId").val(button.data('id'));
})