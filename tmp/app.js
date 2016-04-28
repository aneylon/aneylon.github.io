$(document).ready(function(){
  // load the first round of tweets.
  app.update(app.currentStream);

  // check to see if new tweets have been submitted
  setInterval(function(){app.checkForNew(app.currentStream)},app.updateSpeed);

  $("body").on("click",".userName",function(){
    var selectedUser = $(this).text().slice(1);
    app.currentStream = streams.users[selectedUser];
    app.update(app.currentStream);

    var $icon = $("#heroIcon");
    $icon.jdenticon(md5(selectedUser));

    $("#currentFilter").slideDown();
    $("#filteredUser").text(selectedUser);
    $("#inputWrapper").slideUp();
    $("html, body").animate({ scrollTop: 0 },"slow");
  });

  $("body").on("click",".icon",function(){
    var selectedUser = $(this).parent().find(".userName").text().slice(1);
    app.currentStream = streams.users[selectedUser];
    app.update(app.currentStream);

    var $icon = $("#heroIcon");
    $icon.jdenticon(md5(selectedUser));

    $("#currentFilter").slideDown();
    $("#filteredUser").text(selectedUser);
    $("#inputWrapper").slideUp();
    $("html, body").animate({ scrollTop: 0 },"slow");
  });
  
  $("#newInputText").on("keydown",function(event){
    if(event.which === 13) { // check if enter key is pressed.
      app.addNewTweet();
    }
  });

  $("#newInputButton").on("click",function(){
    app.addNewTweet();
  });

  $("#showNewText").on("click",function(){
    app.update(app.currentStream);
  });

  $(".showAll").on("click",function(){
    app.currentStream = app.defaultStream;
    app.update(app.currentStream);
    $("#currentFilter").slideUp();
    $("#inputWrapper").slideDown();
  });
});


var app = (function(){
  var updateSpeed = 500;
  var defaultStream = streams.home;
  var currentStream = defaultStream;
  var currentTweets = 0;

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
      var $icon = $("<canvas width='100' height='100' id='icon' class='whiteBack icon' />");
      $icon.jdenticon(md5(tweet.user));
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

  return {
    update: update,
    checkForNew: checkForNew,
    addNewTweet: addNewTweet,
    updateSpeed: updateSpeed,
    defaultStream: defaultStream,
    currentStream: currentStream,
    currentTweets: currentTweets
  }
})();