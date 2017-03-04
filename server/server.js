const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4545;

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected !');

    // socket.emit('newEmail',{
    //     from:'nirav@gmail.com',
    //     text:'Hello Nirav',
    //     createdAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail',newEmail);
    // });

    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App.'));

    socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from the server.');
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was Disconnected.');
    });
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});