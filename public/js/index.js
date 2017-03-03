var socket = io();
socket.on('connect', function()  {
    console.log('Connected to Server.');
    // socket.emit('createEmail', {
    //     to:'patel@gmail.com',
    //     text:'Hey, This is Nirav'
    // });

    socket.emit('createMsg', {
        to:'patel@gmail.com',
        text:'Hello Nirav Patel'
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected From Server.');
});

socket.on('newEmail' , function (email) {
    console.log('New email',email);
});

socket.on('newMsg', function (msg) {
   console.log('New Msg',msg);
});