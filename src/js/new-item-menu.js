define('new-item-menu', ['comm', 'events', 'renderer'], function(comm, events, renderer) {

    var menu = document.querySelector('.new-menu');

    events.listen(menu.querySelector('.toggle'), 'click', function(e) {
        menu.classList.toggle('toggled');
    });

    events.listen(menu.querySelector('.new-spreadsheet'), 'click', function(e) {
        comm.emit('element.new', {type: 'sheet'});
    });

    events.listen(menu.querySelector('.new-heading'), 'click', function(e) {
        comm.emit('element.new', {type: 'heading'});
    });

});
