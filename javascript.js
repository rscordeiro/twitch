$(document).ready({

  $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/streams/freecodecamp",
    success: function(result) {
      $("#online").html(result);
    }
  });

});
