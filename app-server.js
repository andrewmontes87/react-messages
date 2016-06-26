var express = require('express');
var _ = require('underscore');
var pg = require('pg');

var config = require('./react-chat-app.config');


// create the app
var app = express();
var connections = [];
var audience = [];
var messages = [];


// this allows use of a local db
devDB = "postgres://"+config.user+":"+config.password+"@localhost/"+config.dbName

app.set('DATABASE_URL', (process.env.DATABASE_URL || devDB));


// initiate first connection to db and grab existing messages
pg.connect(app.get('DATABASE_URL'), function(err, client, done) {
	if (err) throw err;
	console.log('Connected to postgres:' + app.get('DATABASE_URL'));
	client.query('CREATE TABLE IF NOT EXISTS message (id SERIAL, timestamp integer NOT NULL, name varchar(40), message varchar(255));', function(err, result) {
		if (err) { 
			// TODO
			console.log(err);
		} else { 
			// TODO
			console.log(result);
		}
	});
	client.query('SELECT * FROM message ORDER BY timestamp DESC', function(err, result) {
		done();
		if (err) { 
			// TODO
			console.log(err);
		} else { 
			// set server messages to result from DB
			messages = result.rows;
		}
	});
});

// approve files for front end
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

// set port and start server
app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// start sockets
var io = require('socket.io').listen(server);

// helper function to allow user logout
var removeAudienceMember = function(id) {
	var member = _.findWhere(audience, { id : id });

	if (member) {
		audience.splice(audience.indexOf(member), 1);
		io.sockets.emit('audience', audience);
		console.log('Left: %s (%s audience members)', member.name, audience.length);
	}
};

// socket behavior
io.sockets.on('connection', function(socket) {

	// on disconnect, forget the member if he joined, and drop the connection
	socket.once('disconnect', function() {

		removeAudienceMember(this.id);

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("Disconnected: %s sockets remaining.", connections.length)
	});

	// join a member
	socket.on('join', function(payload) {
		var newMember = {
			id: this.id,
			name: payload.name,
			type: 'member'
		};
		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
		console.log("Audience Joined: %s", payload.name);
	});

	socket.on('exit', function(payload) {
		removeAudienceMember(this.id);
		this.emit('exited');
		io.sockets.emit('audience', audience);
	});

	// accept a message from a socket and update the DB
	socket.on('emitMessage', function(payload) {
		
		// generate serverside timestamp
		var timestamp = Math.floor(Date.now() / 1000);
		
		// create message
		var newMessage = {
			message: payload.message,
			name: payload.name,
			timestamp: timestamp
		};
		
		// update the DB
		pg.connect(process.env.DATABASE_URL, function(err, client, done) {

			var handleError = function(err) {
			  // no error occurred, continue with the request
			  if(!err) return false;

			  // An error occurred, remove the client from the connection pool.
			  // A truthy value passed to done will remove the connection from the pool
			  // instead of simply returning it to be reused.
			  // In this case, if we have successfully received a client (truthy)
			  // then it will be removed from the pool.
			  if(client){
			    done(client);
			  }
			  console.log(err);
			  io.sockets.emit('consoleLog', err); 
			  return true;
			};

		    // handle an error from the connection
		    if(handleError(err)) return;

			client.query('INSERT INTO message (timestamp, name, message) VALUES ($1, $2, $3)', [newMessage.timestamp, newMessage.name, newMessage.message], function(err, result) {
				
				// console.log("New Message: %s at %s", newMessage.message, newMessage.timestamp);

				// io.sockets.emit('consoleLog', "New Message: " + newMessage.message + " " + newMessage.timestamp);

				// handle an error from the query
				if(handleError(err)) return;

				client.query('SELECT * FROM message ORDER BY timestamp DESC', function(err, result) {
					done();
					if (err) {
						handleError(err);
					} else { 
						messages = result.rows;
						io.sockets.emit('messageUpdate', messages);
					}
				});
			});

		});

	});

	socket.emit('welcome', {
		audience: audience,
		messages: messages
	});

	connections.push(socket)
	console.log("Connected: %s sockets connected", connections.length);
})

