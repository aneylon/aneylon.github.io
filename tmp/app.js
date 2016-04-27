$(document).ready(function(){
  var updateSpeed = 500;
  var defaultStream = streams.home;
  var currentStream = defaultStream;
  var currentTweets = 0;
  visitor = "visitor";
  streams.users.visitor = [];

  update(currentStream);

  setInterval(function(){checkForNew(currentStream)},updateSpeed);

  $("body").on("click",".userName",function(){
    var selectedUser = $(this).text();
    currentStream = streams.users[selectedUser];
    update(currentStream);
  });
  
  $("#newInputText").on("keydown",function(event){
    if(event.which === 13) { // check if enter key is pressed.
      addNewTweet();
    }
  });

  $("#newInputButton").on("click",function(){
    addNewTweet();
  });

  $("#showNew").on("click",function(){
    update(currentStream);
  });

  $("#showAll").on("click",function(){
    currentStream = defaultStream;
    update(currentStream);
  });

  function addNewTweet(){
    var updateText = $("#newInputText").val();
    if(updateText !== "") {
      writeTweet(updateText);
      $("#newInputText").val("");
      update(currentStream);
    }
  }

  function checkForNew(stream){
    var newNumber = stream.length;
    var diff = newNumber - currentTweets;
    if(currentTweets < newNumber){
      $("#showNewText").text("Load " + diff + " new tweets");
    } else {
      $("#showNewText").text("Load new tweets");
    }
  }

  function update(stream){
    currentTweets = stream.length;
    var $tweets = $("#tweets");
    $tweets.html('');

    var index = stream.length - 1;
    while(index >= 0){
      var tweet = stream[index];
      var $tweet = $("<div class='tweet padTwentyFive overflowAuto'></div>");
      var $userWrapper = $("<div class='widthTwenty centerText left'></div>");
      var $icon = $("<div id='icon' class='darkGreyBack'></div>");
      var $user = $("<p class='userName pointer blueText boldFont'></p> ");
      $user.text(tweet.user);
      var $time = $("<p class='blueText'></p>");
      var time = " " + moment(tweet.created_at).fromNow();
      $time.text(time);
      var $message = $("<div class='right message bigFont whiteBack padFive widthEighty heightOneHundred'></div>");
      $message.text(tweet.message);
      $icon.appendTo($userWrapper);
      $user.appendTo($userWrapper);
      $time.appendTo($userWrapper);
      $userWrapper.appendTo($tweet);
      $message.appendTo($tweet);
      $tweet.appendTo($tweets);
      index -= 1;
    }
  }
});