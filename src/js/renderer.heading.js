define('renderer.heading', ['comm', 'edit-in-place'], function(comm, editInPlace) {
    var SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    var headings = {};

    comm.on('element.update', function(event) {
        headings[event.name].textContent = event.value;
    });


    return {
        create: function(item) {
            item = item || {};
            var elem = document.createElement(item.size ? SIZES[item.size - 1] || SIZES[0] : SIZES[0]);
            elem.textContent = item.value || 'New Heading';
            editInPlace.bind(elem, function(value) {
                comm.emit('element.update', {type: 'heading', name: item.name, value: value});
                elem.textContent = value;
            });
            headings[item.name] = elem;
            return elem;
        },
    };

});
