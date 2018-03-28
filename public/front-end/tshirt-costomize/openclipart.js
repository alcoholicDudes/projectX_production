$("#searchbtn").click(function(e){
    resultsDiv = $("#results");
    var query = $("#searchterm").val();
    var pageNumber = 1;
    var amountPerPage = 20;
    var api = "https://openclipart.org/search/json/?sort=downloads";
    $.getJSON( api, {
            query: query,
            page: pageNumber,
            amount: amountPerPage
        },
        function(data) {
            $("#results").empty();
            $("#results").append("<p>Results for <b>" + query + "</b></p>");
            $.each( data.payload, function( i, item ) {
                var itemLine = "<hoverable><a class='card-img m-2' target=\"_blank\" href = \"" + item.svg.url + "\"><img src=\"" + item.svg.png_thumb + "\"></a></hoverable>";
                resultsDiv.append(itemLine);
                if ( i === amountPerPage - 1 ) {
                    return false;
                }
            });
        });
});
