var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function()  {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
    //console.log('Connected to Server.');
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

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

// socket.on('newEmail' , function (email) {
//     console.log('New email',email);
// });

socket.on('newMessage', function (message) {
    var formmatedTime = moment(message.createdAt).format('h:mm A');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
       text: message.text,
       from: message.from,
       createdAt: formmatedTime
    });

   jQuery('#messages').append(html);
   scrollToBottom();
    // var formmatedTime = moment(message.createdAt).format('h:mm A');
   // var li = jQuery('<li></li>');
   // li.text(`${message.from} ${formmatedTime}: ${message.text}`);
   //
   // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message) {
    var formmatedTime = moment(message.createdAt).format('h:mm A');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formmatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
    // var formmatedTime = moment(message.createdAt).format('h:mm A');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current Location</a>');
    //
    // li.text(`${message.from} ${formmatedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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
    jQuery('[name=message]').focus();
});