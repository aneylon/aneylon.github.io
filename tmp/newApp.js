$(document).ready(function(){
  var updateSpeed = 2000;
  var defaultStream = streams.home;
  var currentStream = defaultStream;
  var currentTwittles = 0;
  visitor = "visitor";
  streams.users.visitor = [];

  setNumberOfFollowers();
  setNumberFollowing();
  update(currentStream);

  setInterval(function(){checkForNew(currentStream)},updateSpeed);

  $("body").on("click",".userName",function(){
    var selectedUser = $(this).text();
    currentStream = streams.users[selectedUser];
    update(currentStream);
  });
  
  $("#statusUpdate").on("keydown",function(event){
    if(event.which === 13) { // check if enter key is pressed.
      addNewTwittle();
    }
  });

  $("#statusUpdateButton").on("click",function(){
    addNewTwittle();
  });

  $("#loadNew").on("click",function(){
    update(currentStream);
    hideLoadNew();
  });

  $("#goHome").on("click",function(){
    currentStream = defaultStream;
    update(currentStream);
  });

  $("#loginButton").on("click",function(){
    $("#signin").slideToggle("slow");
    $("#header").slideToggle("slow");
    $("#sendTwittle").slideToggle("slow");
  });

  function addNewTwittle(){
    var updateText = $("#statusUpdate").val();
    if(updateText !== "") {
      writeTweet(updateText);
      $("#statusUpdate").val("");
      update(currentStream);
      hideLoadNew();
    }
  }

  function hideLoadNew(){
    $("#loadNew").slideUp("fast");
  }

  function checkForNew(stream){
    var newNumber = stream.length;
    var diff = newNumber - currentTwittles;
    if(currentTwittles < newNumber){
      $("#loadNew").slideDown("fast");
      $("#loadNew").text("load " + diff + " new twittles");
    }
  }

  function update(stream){
    currentTwittles = stream.length;

    var $twittles = $("#twittles");
    $twittles.html('');

    var index = stream.length - 1;
    while(index >= 0){
      var tweet = stream[index];
      var $tweet = $("<div class='twittle all'></div>");
      var $userLink = $("<p class='userLink'></p>");
      var $user = $("<span class='userName'></span> ");
      $user.text(tweet.user);
      var $time = $("<span class='timeStamp'></span>");
      var time = " " + moment(tweet.created_at).fromNow();
      $time.text(time);
      var $message = $("<p class='message'></p>");
      $message.text(tweet.message);
      $user.appendTo($userLink);
      $time.appendTo($userLink);
      $userLink.appendTo($tweet);
      $message.appendTo($tweet);
      $tweet.appendTo($twittles);
      index -= 1;
    }
  }

  function setNumberOfFollowers(){
    var $followers = $("#numFollowers");
    $followers.text(Math.floor(Math.random() * 200));
  }

  function setNumberFollowing(){
    var $following = $("#numFollowing");
    var numUsers = 0;
    for(var user in streams.users){
      numUsers ++;
    }
    numUsers -= 1; // remove one for current user.
    $following.text(numUsers);
  }

  function setNumberOfTwittles(){
    $("#numTwittles").text(streams.users[curUser]);
  }
});