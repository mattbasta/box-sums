define('new-item-menu', ['events'], function(events) {

    var menu = document.querySelector('.new-menu');
    var toggle = menu.querySelector('.toggle');

    events.listen(toggle, 'click', function(e) {
        menu.classList.toggle('toggled');
    });

});
