define('comm', [], function() {
    'use strict';

    var auth = document.querySelector('meta[name="auth-id"]').getAttribute('content');
    var sheetID = document.querySelector('meta[name="box-sums"]').getAttribute('content');
    var socket = io();
    socket.emit('getSheet', {auth: auth, sheetID: sheetID});

    return {
        on: socket.on.bind(socket),
        emit: socket.emit.bind(socket),
    };

});
