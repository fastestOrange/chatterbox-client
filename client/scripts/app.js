/* global $ , _  */

// YOUR CODE HERE:
var app = {};
var userName = 'anonymous';

app.init = function(){
  // get an array of rooms
  ///make some buttons based on that array

  app.room = 'lobby';

  app.send = function(message){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        app.fetch();
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };


  app.fetch = function(callback){
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



  app.hackFilter = function(data){
    var washedData = [];
    for (var i =0; i < data.results.length; i++){
      var message = data.results[i].text;
      var username = data.results[i].username;
      var roomName = data.results[i].roomname;
      if((message!==undefined)&&(username!==undefined)&&(roomName!==undefined)){
        if(message.match(/^[0-9a-zA-Z]{1,16}$/)&&username.match(/^[0-9a-zA-Z]{1,16}$/)&&roomName.match(/^[0-9a-zA-Z]{1,16}$/)){
          washedData.push(data.results[i]);
        }else{
          console.log(data.results[i]);
        }
      }
    }
    return washedData;
  };


  app.roomFilter = function(data, room){

    var currentRoom = room;

    var result = _.filter(data.results, function(item){
      if(item!==undefined){
        return item.roomname===currentRoom;
      }

    });
    return result;

  };

  app.oneFriendFilter = function(data, friend){
    var currentFriend = friend;
    var result = _.filter(data.results, function(item){
      return item.roomname === currentFriend;
    });
    return result;

  };

  app.allFriendsFilter = function(data){
    var result = _.filter(data.results, function(item){
      // if the item.username === a key in user.friends
      return item.username === (friend in user.friends);
    });
    return result;
  };

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
      cleanData = app.roomFilter(cleanData, app.room);
      app.displayData(cleanData);
    });
  });

  $('span .username').on('click', function(){
    //get username from what we clicked on
    //assing that value to username variable
    app.fetch(function(data){
      data = app.hackFilter(data);
      data = app.oneFriendFilter(data, username);
      app.display(data);
    });
  });

  $('span .roomname').on('click', function(){
    //get roomName from what we clicked on
    //assing that value to roomName variable
    app.fetch(function(data){
      data = app.hackFilter(data);
      data = app.roomFilter(data, roomName);
      app.display(data);
    });
  });


  app.display = function(washedData){
    $('.messages span').remove();
    for( var i = 0; i < washedData.results.length; i++){
    $('.messages').append('<span class="username"><a href ="#">'+washedData.results[i].username+'</a>: </span><span class="message">'+washedData.results[i].text+'</span><br><span class="roomname"><a href ="#">'+washedData.results[i].roomname+'</a></span><br>');
    ///apend roomnames to roomlist
    }
  };
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


//var app = new App();

// call init
// setInterval(app.fetch, 3000);

// make a user object with what poperties?
// username
// friends
// current room?
// message history?

