// YOUR CODE HERE:


var App = function(){
  this.room = 'lobby';
};

App.prototype.init = function(){
// get an array of rooms
///make some buttons based on that array
};

App.prototype.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

};


App.prototype.filteredDisplay = function(data){
   $('.messages li').remove();
    for (var i =0; i < data.results.length; i++){
      console.log(data.results[i].roomname);
      if(data.results[i].roomname === this.room){
        var message = data.results[i].text;
      // console.dir(message);
        if((message!==undefined)){
          if(message.match(/^[0-9a-zA-Z]{1,16}$/)){
            $('.messages').append('<li>'+message+'</li>');
          } else {
            $('.messages').append('<li>HACK ATTEMPT</li>');
          }
        }
      }
    }
  };


App.prototype.fetch = function(){
  var self = this;
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: JSON.stringify(),
      contentType: 'application/json',
      success: function (data) {
        self.filteredDisplay(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
};


var app = new App();
// call init()
// setInterval(app.fetch, 3000);



