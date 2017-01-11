var Discordie;
var Events;
var Client;
var playMusic;
var Poulet;
var Chr;
var Gimage;
var api
var countSearch = 0;

var allAPI;

allAPI = ["AIzaSyANzMgvaeDqsIXoau-PGebu46kM4ouZfRY",
          "AIzaSyBT6T6PicCiF0nTqziYSXGzyL76r5t91WI",
          "AIzaSyB-Po_UnRELlvnMsgz7hF3MTL_2HoVcYOo",
          "AIzaSyBlwcvqY9fVwN0xQWYLp97B3RvH670MtKU",
          "AIzaSyAzgB7uqtRX9u1LdPg1999sRg6J49o0_P0",
          "AIzaSyBusEbxmUfraGv1tR_bpOL0_g7cVKlWUMU",
          "AIzaSyDopS9bynWeVhmcEecuDbWsxCXwu_y2eFo",
          "AIzaSyDXAupug1AobGi4DVpyWN5V9XW35kO0j-w",
          "AIzaSyB8cM8GIdeeT3rXlCvA3XV-pr9jI7Sba1k",
          "AIzaSyA8VnctSd4Bd7i9ZePW7AG1PSxbSBVLYX8",
          "AIzaSyCHbQPE6kBp2I8mYK3x_9LExRR3hjoAVp0"];

Discordie = require("discordie");
Gimage = require("google-images");
Events = Discordie.Events;
Client = new Discordie();
api = 0;

let client;
ThisAPI();

function ThisAPI()
{
  console.log("Recherche numero " + countSearch);
  console.log("Clef numero " + api);
  if (countSearch >= 95)
  {
    api++;
    countSearch = 0;
  }
  client = new Gimage("003994526723930146304:yanwb89aspu", allAPI[api]);
}

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
  countSearch++;
  if (typeof(str) == "string")
  {
    var sea;
    var i;

    sea = str.substr(3);
    i = (Math.random() * 10) % 10;
    i = Math.round(i);
    if (sea != "")
    {
      console.log(i);
      client.search(sea)
        .then(function(images)
        {
          e.message.channel.sendMessage(images[i].url);
        });
    }
    else
    {
      console.log("Recherche vide.");
      return 2;
    }
  }
  else
  {
    console.log("str n'est pas une string.")
    return 1;
  }
  ThisAPI();
};
