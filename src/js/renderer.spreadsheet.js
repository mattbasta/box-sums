define('renderer.spreadsheet', ['websheet'], function(WebSheet) {
    var sheetContext = new WebSheet.WebSheetContext();

    return {
        create: function(item) {
            var elem = document.createElement('div');
            elem.className = 'websheet';
            var sheet = new WebSheet(elem, {
                context: sheetContext,
                height: item.body.length,
                width: item.body[0].length,
            });
            sheetContext.register(sheet, item.name);
            sheet.loadData(item.body);
            return elem;
        },
    };
});
