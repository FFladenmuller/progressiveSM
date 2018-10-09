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
    else 
    {
        $("td").filter(function() {
        return $(this).text().indexOf($(checkbox).val()) != -1;
        }).parent().hide();
    }
}

// Price Filter ============================================================

$("#priceBtn").on('click', function(){
    if($.trim($("#minPrice").val()) == "" || isNaN(parseInt($("#minPrice").val())))
    {
        $("#minPrice").val("0");
    }
    max = ($.trim($("#maxPrice").val()) == "" || isNaN(parseInt($("#maxPrice").val()))) ? 100000 : parseInt($("#maxPrice").val());
    let parameters =
    {
         minPrice: parseInt($("#minPrice").val()),
         maxPrice: max
    };

    $.getJSON("/priceFilter", parameters, function(data){
         $("#tbody").children().hide();
         for(let i = 0; i < data["id"].length; i++)
         {
             $("#" + data["id"][i]).show();
         }
    })
})

// Round Diameter Filter ============================
$("#diameterBtn").on('click', function(){
    if($.trim($("#diameter").val()) == "" || isNaN(parseInt($("#diameter").val())))
    {
        return;
    }

    let parameters = 
    {
        maxDiameter : parseInt($("#diameter").val())
    };

    $.getJSON("/diameterFilter", parameters, function(data)
    {
        $("#tbody").children().hide();
         for(let i = 0; i < data["id"].length; i++)
         {
             $("#" + data["id"][i]).show();
         }
    })
})