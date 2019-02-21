var busylight = require('busylight').get();
const yargs = require("yargs");

const argv = yargs.argv;


var PORT = 1337;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

var state = 'off';
var myTimer = null;

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    var msgObj = null;

    try {
      msgObj = JSON.parse(message);
    } catch (e) {
      server.send("Error: Unable to decode json message",remote.port,HOST,function(error){});
    }

    var retval = setState(msgObj);

    //sending msg
    server.send("OK",remote.port,HOST,function(error){});
});


function setState(msgObj){
	if(myTimer != null){
		clearInterval(myTimer);
	}
			

	var cmd = msgObj.cmd;
	var retval = "Error";

	myTimer = setInterval(function () {
		switch(cmd){
			case 'off':
				busylight.off();
			break;
			case 'solid':
				busylight.light(msgObj.color);
			break;

			case '':

			break;
		}
	}
}
server.bind(PORT, HOST);


