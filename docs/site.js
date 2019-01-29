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
