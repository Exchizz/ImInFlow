const yargs = require("yargs");

const argv = yargs.argv;



var c_dgram = require('dgram');
var client = c_dgram.createSocket('udp4');


var REMOTEPORT = 1337;
var REMOTEHOST = 'kiosk-01';

var dbus = require('dbus-native');
var sessionBus = dbus.sessionBus();
sessionBus.getService('com.canonical.indicator.messages').getInterface(
    '/com/canonical/indicator/messages',
    'org.gtk.Actions', function(err, notifications) {

    // dbus signals are EventEmitter events
    notifications.on('Changed', function() {
	console.log(arguments[2][0][1][1][0]);
        let statusmsg = arguments[2][0][1][1][0];
	switch(statusmsg){
		case "busy":
			color = "red";
		break;

		case "available":
			color = "green";
		break;

		default:
			console.log("Don't know this status: " + statusmsg);	
	}
	setColorRemote(color);
    });
});

function setColorRemote(color){
	var message = Buffer.from(color);
	console.log(message);
	client.send(message, REMOTEPORT, REMOTEHOST, function(err, bytes) {
	    if (err) throw err;
	});
}


console.log("init dbus done");
var busylight = require('busylight').get();

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
    server.send(message,remote.port,HOST,function(error){});


});

var myInt = setInterval(function () {
    if(color == null){
	    busylight.off();
    } else {
	    busylight.light(color.toString());
    }
}, 2000); 



server.bind(PORT, HOST);


