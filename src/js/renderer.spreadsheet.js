define('renderer.spreadsheet', ['websheet'], function(WebSheet) {
    var sheetContext = new WebSheet.WebSheetContext();

    var sheetCount = 1; // Used for naming new stylesheets

    return {
        create: function(item) {
            item = item || {};

            var elem = document.createElement('div');
            elem.className = 'websheet';

            var height = item.body ? item.body.length : undefined;
            var width = item.body ? item.body[0].length : undefined;

            var sheet = new WebSheet(elem, {
                context: sheetContext,
                height: height,
                width: width,
            });
            sheetContext.register(sheet, item.name || 'Sheet' + sheetCount);

            if (item.body) sheet.loadData(item.body);
            else sheet.forceRerender();

            sheetCount++;
            return elem;
        },
        refresh: function() {
            for (var sheet in sheetContext.sheets) {
                sheetContext.sheets[sheet].forceRerender();
            }
        }
    };
});
