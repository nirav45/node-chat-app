var moment = require('moment');

// var date = moment();
//
// console.log(date.format('h:mm A'));
// date.add(5,'hour');
// console.log(date.format('h:mm A'));
// var display = function () {
//     var date = moment();
//     console.log(date.format('h:mm:ss A'));
// };
//     setInterval(display, 1000);

var timestamp = moment().valueOf();
console.log(timestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm A'));