const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4545;

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
var users = new Users();


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

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
           return callback('Name and Room are required.');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App.'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));
        callback();
    });

    // socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App.'));
    //
    // socket.broadcast.emit('newMessage', generateMessage('Admin','New User Joined.'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
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
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('User was Disconnected.');
    });
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});