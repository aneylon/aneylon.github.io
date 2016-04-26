$(document).ready(function(){
  var updateSpeed = 2000;
  var currentStream = "";
  var currentTwittles = 0;
  visitor = "visitor";
  streams.users.visitor = [];

  setNumberOfFollowers();
  setNumberFollowing();
  update();

  setInterval(function(){checkForNew()},updateSpeed);
  
  $("#statusUpdate").on("keydown",function(event){
    if(event.which === 13) { // check if enter key is pressed.
      writeTweet($(this).val());
      $(this).val("");
      update();
    }
  });

  $("#statusUpdateButton").on("click",function(){
    writeTweet($("#statusUpdate").val());
    $("#statusUpdate").val("");
    update();
  });

  $("#loadNew").on("click",function(){
    update();
    $(this).slideUp("fast");
  });

  $("#goHome").on("click",function(){
    goHome();
  });

  $("#loginButton").on("click",function(){
    $("#signin").slideToggle("slow");
    $("#header").slideToggle("slow");
    $("#sendTwittle").slideToggle("slow");
  });

  function checkForNew(stream){
    var newNumber = streams.home.length;
    var diff = newNumber - currentTwittles;
    if(currentTwittles < newNumber){
      $("#loadNew").slideDown("fast");
      $("#loadNew").text("load " + diff + " new twittles");
    }
  }

  function update(stream){
    currentTwittles = streams.home.length;

    var $twittles = $("#twittles");
    $twittles.html('');

    var index = streams.home.length - 1;
    while(index >= 0){
      var tweet = streams.home[index];
      var $tweet = $("<div class='twittle all'></div>");
      var $userLink = $("<p class='userLink'></p>");
      var $user = $("<span class='userName'></span> ");
      $user.text("@" + tweet.user + " ");
      var $time = $("<span class='timeStamp'></span>");
      var time = moment(tweet.created_at).fromNow();
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

  function goHome(){
    console.log("go home");
    // set stream back to all and call update?
  }

});