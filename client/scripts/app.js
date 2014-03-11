// YOUR CODE HERE:

var userName = 'anonymous';

var App = function(){
  this.room = '4chan';
};

App.prototype.init = function(){
// get an array of rooms
///make some buttons based on that array
};

App.prototype.send = function(message){
  var self = this;
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      self.fetch();
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

App.prototype.hackFilter = function(data){
  var washedData = [];
  for (var i =0; i < data.results.length; i++){
    var message = data.results[i].text;
    var username = data.results[i].username;
    //console.dir(message);
    if((message!==undefined)&&(username!==undefined)){
      if(message.match(/^[0-9a-zA-Z]{1,16}$/)&&username.match(/^[0-9a-zA-Z]{1,16}$/)){
        washedData.push(data.results[i]);
      }else{
        console.log(data.results[i]);
      }
    }
  }
};


App.prototype.roomFilter = function(data, room){

  var currentRoom = room;
  var result = _.filter(data.results, function(item){
    return item.roomname===currentRoom;
  });
  return result;

};

App.prototype.oneFriendFilter = function(data, friend){

};

App.prototype.allFriendsFilter = function(data){};



$('#post').on('click', function(){
  var postText = $('#textarea').val();
  var message = {};
  message.username = userName;
  message.text = postText;
  message.roomname = app.room;
  console.log(message);
  app.send(message);

});

$('button .room').on('click', function(){
  app.fetch(function(databack){
    var cleanData = app.hackFilter(databack);
    cleanData = app.roomFilter(cleanData, this.room);
    app.displayData(cleanData);
  });
});


App.prototype.filteredDisplay = function(filter, data){

    for (var i =0; i < data.results.length; i++){
      var message = data.results[i].text;
      var username = data.results[i].username;
      //console.dir(message);
      if((message!==undefined)&&(username!==undefined)){
        if(message.match(/^[0-9a-zA-Z]{1,16}$/)&&username.match(/^[0-9a-zA-Z]{1,16}$/)){

        } else {
          //$('.messages').append('<li>HACK ATTEMPT</li>');
          console.log(message);
        }
      }
    }
  };

App.prototype.display = function(washedData){
   $('.messages li').remove();
   for( var i = 0; i < washedData.length; i++){
     $('.messages').append('<li><a href ="#">'+username+'</a>: '+message+'</li>');
   }

};


App.prototype.fetch = function(callback){
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',

      data: where={'results':{'$lte':25}},
      contentType: 'application/json',
      success: callback,
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }

    });
};

var User = function(username){
  this.username = username;
  this.friends = {};

};
// overwriting
// {'biill': [message, message]}
User.prototype.addFriend = function(username){
  this.friends[username]=[];
  //fetch messages
  //filter by username
  //as we filter push message array
  //apply bold styling to our friends
  //add event handler "forFriends"
};
//
//event handler for clicking on unfriend will call addFriend
//new event handler "forFriend"
//forFriend will display all friends


var app = new App();
// call init
// setInterval(app.fetch, 3000);

// make a user object with what poperties?
// username
// friends
// current room?
// message history?

