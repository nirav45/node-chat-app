var socket = io();
socket.on('connect', function()  {
    console.log('Connected to Server.');
    // socket.emit('createEmail', {
    //     to:'patel@gmail.com',
    //     text:'Hey, This is Nirav'
    // });

    // socket.emit('createMessage', {
    //     to:'patel@gmail.com',
    //     text:'Hello Nirav Patel'
    // });
});
socket.on('disconnect', function() {
    console.log('Disconnected From Server.');
});

// socket.on('newEmail' , function (email) {
//     console.log('New email',email);
// });

socket.on('newMessage', function (message) {
   var formmatedTime = moment(message.createdAt).format('h:mm A');
   var li = jQuery('<li></li>');
   li.text(`${message.from} ${formmatedTime}: ${message.text}`);

   jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
    var formmatedTime = moment(message.createdAt).format('h:mm A');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current Location</a>');

    li.text(`${message.from} ${formmatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'nirav',
//     text: 'Hello'
// }, function (data) {
//     console.log('Got it.',data)
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
         from : 'User',
         text: messageTextbox.val()
      }, function () {
            messageTextbox.val('');
     });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
   if(!navigator.geolocation) {
       return alert('Geolocation is not supported by your browser.');
   }
   locationButton.attr('disabled','disabled').text('Sending location ...');
   navigator.geolocation.getCurrentPosition(function (position) {
       locationButton.removeAttr('disabled').text('Send location');
       socket.emit('createLocationMessage',{
           latitude : position.coords.latitude,
           longitude : position.coords.longitude
       });
   }, function () {
       locationButton.removeAttr('disabled').text('Send location');
       alert('Unable to fetch location.');
   });
});