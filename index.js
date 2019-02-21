var busylight = require('busylight').get();
const yargs = require("yargs");

const argv = yargs.argv;


var PORT = 1337;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var color = null;

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    color = message;

    //sending msg
    server.send(message,remote.port,HOST,function(error){
        server.close();
    });


});

var myInt = setInterval(function () {
    if(color == null){
	    busylight.off();
    } else {
	    busylight.light(color.toString());
    }
}, 2000); 



server.bind(PORT, HOST);


