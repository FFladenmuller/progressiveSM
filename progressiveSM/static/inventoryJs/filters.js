// Radio Buttons ==================================================

// When all radio button pressed, show all
$("#allRad").on("click", function(){
    $("#tbody").children().show();
});

// When radio button pressed, sort by that radio buttons value
$("[id $= 'Radio']").on("click", function(){
    radioPressedFilter(this.value);
})

function radioPressedFilter(shape)
{
    $("td").filter(function() {
        return $(this).text().indexOf(shape) == -1;
    }).parent().hide();

    $("td").filter(function() {
        return $(this).text().indexOf(shape) != -1;
    }).parent().show();
}

// Check Boxes ========================================================

$("[type = 'checkbox']").on("click", function(){
    checkboxPressedFilter($(this));
})

function checkboxPressedFilter(checkbox)
{
    if($(checkbox).is(':checked'))
    {
        $("td").filter(function() {
        return $(this).text().indexOf($(checkbox).val()) != -1;
        }).parent().show();
    }
    else if(! $(checkbox).is(':checked'))
    {
        $("td").filter(function() {
        return $(this).text().indexOf($(checkbox).val()) != -1;
        }).parent().hide();
    }
}

// Price Filter ============================================================

$("#priceBtn").on('click', function(){
    if($.trim($("#minPrice").val()) == "")
    {
        return;
    }
    max = ($.trim($("#maxPrice").val()) == "") ? 100000 : parseInt($("#maxPrice").val());
    let parameters =
    {
         minPrice: parseInt($("#minPrice").val()),
         maxPrice: max
    };

    $.getJSON("/priceFilter", parameters, function(data){
         $("#tbody").children().hide();
         for(let i = 0; i < data.length; i++)
         {
             $("#" + data[i].id).show();
         }
    })
})