define('renderer',
    ['renderer.heading', 'renderer.spreadsheet'],
    function(Rheading, Rspreadsheet) {

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

    return {
        create: function(name, params) {
            return types[name].create(params);
        },
        renderEach: function(contents) {
            contents.forEach(function(elem) {
                viewport.appendChild(getWrapper(this.create(elem.type, elem)));
            }, this);
        }
    };
});
