var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'niravpatel';
        var text = 'Good Morning';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});
    });

});

describe('genrateLocationMessage', () => {
   it('should generate correct location object', () => {
      var from = 'Admin';
      var latitude = 1;
      var longitude = 45;
      var url = 'https://www.google.com/maps?q=1,45';
      var message = generateLocationMessage(from,latitude,longitude);

       expect(message.createdAt).toBeA('number');
       expect(message).toInclude({from,url});
   });
});