var Discordie;
var Events;
var Client;
var playMusic;
var Poulet;
var Chr;
var Gimage;

Discordie = require("discordie");
Gimage = require("google-images");
Events = Discordie.Events;
Client = new Discordie();

let client = new Gimage("003994526723930146304:yanwb89aspu", "AIzaSyANzMgvaeDqsIXoau-PGebu46kM4ouZfRY");

Client.connect({
  token: "MjYzNjYwMDA2OTM3ODUzOTUy.C1Eepg.YGZykZciyzswev__DWguROHvS_I"
});

Client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log("Connected as: " + Client.User.Username);
});

Client.Dispatcher.on(Events.MESSAGE_CREATE, e =>
{
  var message;
  switch (e.message.content)
  {
    case "PING":
      e.message.channel.sendMessage("PONG");
      break;
    case "Audio":
      playMusic(e);
      break;
    case "Poulet":
      Poulet(e);
      break;
  }
  if (e.message.content[0] == "!" && e.message.content[1] == "s")
    Chr(e, e.message.content);
});

playMusic = function(e)
{
  console.log("playMusic");
  e.message.channel.sendMessage("Musico !");
};

Poulet = function(e)
{
  var i;

  i = (Math.random() * 10) % 5;
  i = Math.round(i);
  if (i == 0)
    i++;
  switch (i)
  {
    case 1:
      e.message.channel.sendMessage("http://www.observatoire-des-aliments.fr/wp-content/uploads/2013/01/poulet-bresse-big.jpg");
      break;
    case 2:
      e.message.channel.sendMessage("https://timenewsfeed.files.wordpress.com/2013/03/chicken.jpg?w=753");
      break;
    case 3:
      e.message.channel.sendMessage("http://www.southdacola.com/blog/wp-content/uploads/2014/06/chicken_sombrero.gif");
      break;
    case 4:
      e.message.channel.sendMessage("http://www.openzambia.com/wp-content/uploads/2014/11/Chicken.jpg");
      break;
    case 5:
      e.message.channel.sendMessage("http://1.bp.blogspot.com/-qNfA-ErZF48/TV5qAbgamSI/AAAAAAAAAxg/fkh-NYUIJ04/s1600/chicken-0011.jpg");
      break;
  }
};

Chr = function(e, str)
{
  if (typeof(str) == "string")
  {
    var sea;

    sea = str.substr(3);
    i = (Math.random() * 10) % 10;
    i = Math.round(i);
    client.search(sea)
      .then(function(images)
      {
        e.message.channel.sendMessage(images[i].url);
      });
  }
  else
  {
    console.log("str n'est pas une string.")
    return 1;
  }
};
