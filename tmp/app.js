$(document).ready(function(){
  var updateSpeed = 500;
  var defaultStream = streams.home;
  var currentStream = defaultStream;
  var currentTweets = 0;

  update(currentStream);

  setInterval(function(){checkForNew(currentStream)},updateSpeed);

  $("body").on("click",".tweet",function(){
    var selectedUser = $(this).find(".userName").text();
    currentStream = streams.users[selectedUser];
    update(currentStream);
    $("#showAll").show();
    $("#currentFilter").show();
    $("#filteredUser").text(selectedUser);
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
    $(this).hide();
    $("#currentFilter").hide();
  });

  function addNewTweet(){
    var userName = $("#userName").val();
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
      $("#showNewText").show();
      $("#showNewText").text("Load " + diff + " new tweets");
    } else {
      $("#showNewText").hide();
    }
  }

  function update(stream){
    currentTweets = stream.length;
    var $tweets = $("#tweets");
    $tweets.html('');
    var index = stream.length - 1;
    while(index >= 0){
      var tweet = stream[index];
      var $tweet = $("<div class='tweet padTwentyFive overflowAuto pointer'></div>");
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