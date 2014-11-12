var fs = require('fs');

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var boxContent = require('./lib/boxContent.js');


var sheets = {};

function getSheet(id, auth, cb) {

    function createSheet() {
        return sheets[id] = {
            itemCount: 1,
            contents: [
                {
                    type: 'heading',
                    name: 'Heading0',
                    size: 1,
                    value: 'Spreadsheet'
                },
                {
                    type: 'sheet',
                    name: 'Sheet1',
                    body: [
                        [1, 2, null, null, null, null],
                        ['=A1+B1', null, null, null, null, null],
                        [null, null, null, null, null, null],
                        [null, null, null, null, null, null],
                        [null, null, null, null, null, null],
                    ]
                }
            ],
            subscribers: [],
            fake: true,
        };
    }

    if (!auth) {
        cb(sheets[id] || createSheet());
        return;
    }

    if (sheets[id]) {
        cb(sheets[id]);
        return;
    }

    boxContent.get(id, auth).then(function(body) {
        sheets[id] = body;
        body.subscribers = [];
        cb(body);
    }, function(err) {
        console.warn('Could not read from box', err);
        cb(null);
    });
}


app.get('/auth', function(req, res){
    res.redirect(
        'https://www.box.com/api/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=' + process.env.CLIENT_ID);
});
app.get('/sheet/:id', function(req, res){
    var auth = req.param('auth') || '';
    var id = req.params.id;
    res.send(fs.readFileSync('src/index.html').toString().replace('SUM_ID', id).replace('AUTH', auth));
});

app.use('/redirect', function(req, res){
    var auth = req.param('auth_code');
    var file = req.param('file');
    res.set('Location', '/sheet/' + file + '?auth=' + auth);
    res.send(302, 'Redirecting...');
});

app.use(express.static(__dirname + '/src'));


io.on('connection', function(socket) {
    var data;
    socket.on('disconnect', function() {
        if (!data) return;
        data.subscribers = data.subscribers.filter(function(sock) {
            return sock !== socket;
        });
    });


    function broadcast() {
        var args = Array.prototype.slice.call(arguments, 0);
        data.subscribers.forEach(function(user) {
            user.emit.apply(user, args);
        });
        if (data.fake) return;
        boxContent.put(data).then(null, console.error.bind(console));
    }

    socket.on('getSheet', function(req) {
        getSheet(req.sheetID, req.auth, function(newSheet) {
            if (!newSheet) return;
            data = newSheet;
            data.subscribers.push(socket);
            socket.removeAllListeners('sheetID');
            init();
            socket.emit('init', {
                contents: newSheet.contents,
            });
        });
    });

    function getDefault(type) {
        switch (type) {
            case 'sheet':
                return {
                    type: 'sheet',
                    name: 'Sheet' + data.itemCount,
                    data: new Array(5),
                };
            case 'heading':
                return {
                    type: 'heading',
                    name: 'Heading' + data.itemCount,
                    size: 1,
                    value: 'Heading',
                };
        }
    }

    function init() {
        socket.on('element.new', function(event) {
            data.itemCount++;
            var value = getDefault(event.type);
            data.contents.push(value);
            broadcast('element.new', value);
        });
        socket.on('element.delete', function(event) {
            data.contents.splice(event.index, 1);
            broadcast('element.delete', {index: event.index});
        });
        socket.on('element.reorder', function(event) {
            broadcast('sheet.', null);
        });
        socket.on('element.update', function(event) {
            switch (event.type) {
                case 'sheet':
                    data.contents.forEach(function(elem) {
                        if (elem.type !== 'sheet') return;
                        if (elem.name !== event.sheet) return;
                        elem.body[event.position.row][event.position.col] = event.value;
                    });
                    break;
                case 'heading':
                    data.contents.forEach(function(elem) {
                        if (elem.type !== 'heading') return;
                        if (elem.name !== event.name) return;
                        elem.value = event.value;
                    });
                    break;
            }
            broadcast('element.update', event);
        });

        socket.on('sheet.importData', function(event) {
            broadcast('sheet.', null);
        });
        socket.on('sheet.resize', function(event) {
            broadcast('sheet.resize', null);
        });
    }
});

var port = process.env.PORT || 3001;
http.listen(port, function(){
    console.log('listening on *:' + port);
});
