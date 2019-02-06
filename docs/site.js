$(document).ready(function(){
    $.getJSON("index.json", function (data) {
        $.each(data.Articles, function (idx) {
            var container = $('#menuContainer');
            var link = $("<a/>", {
                href: data.Articles[idx] + '.html',
                text: data.Articles[idx],
                "class":"nav-link"
            });
            var menuItem = $("<li/>",{
                "class":"nav-item"
            });
            link.appendTo(menuItem);
            menuItem.appendTo(container);
        });
    });
    injectSearch();
});

function injectSearch(){
    var template = '<form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">'+
    '<div class="input-group">' +
        '<input id="searchText" type="text" class="form-control" placeholder="Search for...">'+
        '<div class="input-group-append">'+
            '<button class="btn btn-primary" type="submit">'+
                'Search'+
            '</button>'+
            '</div>'+
        '</div>'+
    '</form>';
    $('nav').append(template);
    $("form").submit(function(e){
        e.preventDefault();
        window.location.href = "https://gitforkb.github.io/OmniArticle/search.html?search="+encodeURIComponent($('#searchText').val());
    });
}

function renderSearch() {
    var query = getUrlParameter('search');
    $('#queryText').text(query);
    $.ajax({
        dataType: "json",
        contentType: "application/json",
        url: 'https://kbarticletest.search.windows.net/indexes/kbarticles/docs?search=' + encodeURIComponent(query) + '&api-version=2017-11-11&api-key=3F417A59AD14DD1F91346A448229DA04',
        success: function (data) {
            if(data.value.length === 0){
                var container = $('#searchResult');
                var noResultsMessage = $('<span/>', {text: "No articles found."});
                noResultsMessage.appendTo(container);
                return;
            }

            $.each(data.value, function (idx) {
                var container = $('#searchResult');
                var searchLine = $("<div/>", {
                    style: "margin-bottom: 0.8em;"
                });
                searchLine.appendTo(container);
                var link = $("<a/>", {
                    href: data.value[idx].Name + '.html',
                });
                var linkText = $('<h4/>', {
                    text: data.value[idx].Title,
                    style: "margin-bottom: 0px"
                });
                link.html(linkText);
                link.appendTo(searchLine);
                var tags = $("<small/>", {
                    "class": "text-muted",
                    text: 'Tags: ' + data.value[idx].Tags
                });
                tags.appendTo(searchLine);
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

