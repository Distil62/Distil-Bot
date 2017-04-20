var Discordie;
var Events;
var Client;
var playMusic;
var Poulet;
var Chr;
var Gimage;
var api;
var fs;
var countSearch;
var allAPI;

var GO = function()
{
  allAPI = ["GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY",
            "GOOGLE API KEY"]; //https://cse.google.com/cse

  Discordie = require("discordie");
  Gimage = require("google-images");
  Events = Discordie.Events;
  Client = new Discordie();
  let client;
  ThisAPI();

  function Record()
  {
    var ecrire;
    var data;

    data = api + "\n" + countSearch;
    ecrire = fs.createWriteStream("./Data", "utf8");
    ecrire.write(data);
    ecrire.close();
  }

  function ThisAPI()
  {
    console.log("Recherche numero " + countSearch);
    console.log("Clef numero " + api);
    if (countSearch >= 95)
    {
      api++;
      if (api > 10)
      {
        api = 0;
      }
      countSearch = 0;
    }
    client = new Gimage("003994526723930146304:yanwb89aspu", allAPI[api]);
    Record();
  }

  Client.connect({
    token: "BOT TOKEN"
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
}

fs = require("fs");

var res;

res = fs.createReadStream("Data", "utf8");
res.read();

res.on("data", (chunk)=>
{
    var i;
    var test = false;
    var b1 = "";
    var b2 = "";
    i = 0;

    while (chunk[i])
    {
      if(chunk[i] == '\n')
      {
        test = true;
        i++;
      }
      if (!test)
      {
        b1 = b1 + chunk[i];
      }
      else
      {
        b2 = b2 + chunk[i];
      }
      i++;
    }
    api = parseInt(b1);
    countSearch = parseInt(b2);
    GO();
  });
  res.close();
