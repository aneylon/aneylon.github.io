$(document).ready(function(){
  var updateSpeed = 500;
  var defaultStream = streams.home;
  var currentStream = defaultStream;
  var currentTweets = 0;

  update(currentStream);

  setInterval(function(){checkForNew(currentStream)},updateSpeed);

  $("body").on("click",".userName",function(){
    var selectedUser = $(this).text().slice(1);
    currentStream = streams.users[selectedUser];
    update(currentStream);
    // $("#showAll").show();
    $("#currentFilter").slideDown();
    $("#filteredUser").text(selectedUser);
    $("#inputWrapper").slideUp();
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
    // $(this).hide();
    $("#currentFilter").slideUp();
    $("#inputWrapper").slideDown();
  });

  function addNewTweet(){
    var userName = $("#userName").text();
    if(userName !== "") {
      visitor = userName;
    } else {
      visitor = "visitor";
    }

    if(!streams.users[visitor]){
      streams.users[visitor] = [];
    }

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
      $("#showNewText").slideDown();
      $("#showNewText").text("Load " + diff + " new tweets");
    } else {
      $("#showNewText").slideUp();
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
      var $user = $("<p class='userName pointer blueText boldFont underLined padFive'></p> ");
      $user.text("@" + tweet.user);
      var $time = $("<p class='blueText padFive'></p>");
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