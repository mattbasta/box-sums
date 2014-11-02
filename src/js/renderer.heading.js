define('renderer.heading', [], function() {
    var SIZES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];


    return {
        create: function(item) {
            item = item || {};
            var elem = document.createElement(item.size ? SIZES[item.size - 1] || SIZES[0] : SIZES[0]);
            elem.innerText = item.value || 'New Heading';
            return elem;
        },
    };

});
