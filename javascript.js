let channelsNames = ["eulcs1", "freecodecamp", "esl_sc2", "ogamingsc2", "cristianes2", "beyondthesummit", "esl_lol", "noobs2ninjas"];

function getChannel() {
  channelsNames.forEach(function(channel){
    function channelURL(type, name) {
      return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name + "?callback=?";
    }
    $.getJSON(channelURL("streams", channel), function(data){
      var game;
      var status;
      if (data.stream === null) {
        game = "Offline.";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(channelURL("channels", channel), function(data){
        var avatar = "profile pics/" + channel + ".jpg";
        var name = data.display_name != null ? data.display_name : channel;
        var description = status === "online" ? ': ' + data.status : "";
        var html = "<div class='" + status +"-channel channel-div'><div class='id-div'><div><img src='" + avatar + "' class='avatar'></div><div class='name'><a href='https://www.twitch.tv/" + channel + "' target='_blank'> " + name + "</a></div></div><div class='streaming'><p class='status-description'>" + game + "<span>" + description + "</span></p></div></div>";
        status === "online" ? $("#all, #online").prepend(html) : $("#all, #offline").append(html);
      });
    });
  });
};

$(document).ready(function(){
  getChannel();
});
