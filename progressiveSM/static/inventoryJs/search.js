$().ready(function(){
    configQTypeahead();
})


// Search Bar ==========================================================

//Configure Typeahead
function configQTypeahead()
{
    $("#q").typeahead({ },
    {
        source: search,

        // This funky line below makes it so that the input box appears empty after selecting
        // an option. Otherwise it shows JSON of suggestion in box.
        display: function(suggestion) { return null; },
        templates:
        {
            suggestion: Handlebars.compile(
                "<div>{{info}}</div>"
                )
        }
    });
    $("#q").focus();
}


// When typeahead option selected, hide all table except suggestion selected
$("#q").on("typeahead:selected", function(ev, suggestion){
    $("#tbody").children().hide();
    $('tr:contains(' + suggestion.shape + "):contains(" + suggestion.type + "):contains(" + suggestion.dimensions + ")").show()
})


// When clear search button pressed, show all of table
$("#clear").on('submit', function(){
    $("#tbody").children().show();
});

// Search FTS table inventoryTxt for query
function search(query, syncResults, asyncResults)
{
    let parameters = {
        q: query
    };

    $.getJSON("/searchInventory", parameters, function(data)
    {
        asyncResults(data);
    });
}