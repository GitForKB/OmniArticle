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
});

function renderSearch(){
var query = getUrlParameter('search');

$.ajax({
    dataType: "json",
    contentType: "application/json",
    url: 'https://kbarticletest.search.windows.net/indexes/kbarticles/docs?search='+encodeURIComponent(query)+'&api-version=2017-11-11&api-key=3F417A59AD14DD1F91346A448229DA04',
    success: function(data) {
        console.log(data);
    },
    error:function(err){
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

