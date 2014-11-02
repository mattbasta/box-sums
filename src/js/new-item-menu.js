define('new-item-menu', ['events', 'renderer'], function(events, renderer) {

    var menu = document.querySelector('.new-menu');

    events.listen(menu.querySelector('.toggle'), 'click', function(e) {
        menu.classList.toggle('toggled');
    });

    events.listen(menu.querySelector('.new-spreadsheet'), 'click', function(e) {
        renderer.createAndAdd('sheet');
    });

    events.listen(menu.querySelector('.new-heading'), 'click', function(e) {
        renderer.createAndAdd('heading');
    });

});
