define('main', ['comm', 'new-item-menu', 'renderer'], function(comm, newItemMenu, renderer) {
    'use strict';

    var sheet = document.querySelector('.sheet');
    var data;
    comm.on('init', function(contents) {
        data = contents;
        console.log('Initial data received');
        init();
    });

    function init() {
        renderer.renderEach(data.contents);
    }

});
