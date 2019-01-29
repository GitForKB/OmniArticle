        $.getJSON("index.json", function (data) {
            $.each(data.Articles, function (idx) {
                var container = $('#menuContainer');
                var link = $("<a/>", {
                    href: data.Articles[idx] + '.html',
                    text: data.Articles[idx]
                });
                var menuItem = $("<li/>");
                link.appendTo(menuItem);
                menuItem.appendTo(container);
            });
        });