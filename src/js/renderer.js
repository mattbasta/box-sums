define('renderer',
    ['comm', 'renderer.heading', 'renderer.spreadsheet'],
    function(comm, Rheading, Rspreadsheet) {

    var viewport = document.querySelector('.sheet');

    var types = {
        heading: Rheading,
        sheet: Rspreadsheet,
    };

    function getWrapper(toWrap) {
        var wrap = document.createElement('div');
        wrap.className = 'element-wrapper';
        if (toWrap) {
            wrap.appendChild(toWrap);
        }
        return wrap;
    }

    var exported = {
        createAndAdd: function(name, params) {
            viewport.appendChild(getWrapper(types[name].create(params)));
        },
        renderEach: function(contents) {
            contents.forEach(function(elem) {
                this.createAndAdd(elem.type, elem);
            }, this);
            // To support cross-sheet dependencies
            for (var type in types) {
                if (types[type].refresh) types[type].refresh();
            }
        }
    };

    comm.on('element.new', function(event) {
        exported.createAndAdd(event.type, event);
    });

    return exported;
});
