// Variables
var port = 3000;
var serialPortName = 'COM6';

// Node.js setup
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Arduino setup
const serial = new SerialPort(serialPortName, { baudRate: 9600 });
const parser = serial.pipe(new Readline({ delimiter: '\n' }));

// Verwijzen naar html directory
var htmlPath = path.join(__dirname, 'html');
app.use(express.static(htmlPath));


// Server hosten op localhost:3000 
var server = http.listen(port, function () {
    var host = 'localhost';
    console.log('listening on http://'+host+':'+server.address().port+'/'); 
});


// Socket listeners, verbindt server met webapp en arduino
io.on('connection', function(socket) {
    io.emit('server set up');
    
    socket.on('server connected', function() {
        console.log('connected 2');
    });

});

serial.on('open', () => {
    console.log('serial port connected');
});

// Ontvangt data en gebruikt deze in de webapp
parser.on('data', data => {
        console.log('ARDUINO DATA: ', data);
        //io.emit('hit');
        io.emit('hit', {button: data});
});