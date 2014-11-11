define('renderer.spreadsheet', ['comm', 'websheet'], function(comm, WebSheet) {
    var sheetContext = new WebSheet.WebSheetContext();
    var paused = false;
    sheetContext.events.onAll(function(type, sheet, cell, value) {
        if (type !== 'value') return;
        if (paused) return;
        comm.emit('element.update', {
            type: 'sheet',
            sheet: sheet,
            cell: cell,
            value: value,
            position: WebSheet.getCellPos(cell),
        });
    });

    comm.on('element.update', function(event) {
        if (event.type !== 'sheet') return;
        var sheet = sheetContext.getSheet(event.sheet);
        if (!sheet) return;
        sheet.setValueAtPosition(
            event.position.row,
            event.position.col,
            event.value
        );
    });

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

            paused = true;
            if (item.body) sheet.loadData(item.body);
            else sheet.forceRerender();
            paused = false;

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
