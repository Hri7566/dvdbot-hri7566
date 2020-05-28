const MPPClient = require('mpp-client-xt');
const client = new MPPClient("wss://ts.terrium.net:8443", undefined);
const fs = require('fs');

client.start();

client.on("hi", () => {
  setTimeout(function() {
    client.sendArray([{m:'userset', set:{name:"hri's dvdbot [dvd!help]"}}]);
  })
  
  client.setChannel("lobby");
});

function chat(string) {
  client.sendArray([{m:'a', message:string}]);
}

var ctoggle = true;

var cursormode = "dvd";


client.on("a", (msg) => {
  let args = msg.a.split(' ');
  let cmd = args[0].toLowerCase();
  let argcat = msg.a.substring(cmd.length).trim();
  
  switch (cmd) {
    case "dvd!help":
      chat("cmds: dvd!help // dvd!cursor // dvd!stats // dvd!about");
      break;
    case "dvd!cursor":
      if (!argcat || argcat == "") {
        chat("Modes: on // off");
      } else {
        switch (argcat) {
          case "on":
            ctoggle = true;
            pos = {x: (Math.random() * 100) - 50, y: (Math.random() * 100) - 50};
            vel = {x: 2/5, y: 2/7};
            cursormode = "dvd";
            break;
          case "off":
            ctoggle = false;
            cursormode = "none";
            pos = {x: -500, y: -500};
            break;
          default:
            chat("invalid :P");
            break;
        }
      }
      break;
    case "dvd!stats":
      chat("Edge hits: " + stats.edgehits + " | Corner hits: " + stats.cornerhits);
      break;
    case "dvd!about":
      chat("Made by Hri7566 in his free time :)");
      break;
  }
});

var pos = {x: (Math.random() * 100) - 50, y: (Math.random() * 100) - 50};
var vel = {x: 2/5, y: 2/7};
var statsraw = fs.readFileSync('stats.json');
var stats = JSON.parse(statsraw);
console.log(stats);

var cursor = setInterval(function() {
  client.sendArray([{m:'m', x: client.getOwnParticipant().x = pos.x + 50, y: client.getOwnParticipant().y = pos.y + 50}]);
}, 16);

var cursorupdate = setInterval(function() {
  switch (cursormode) {
    case "dvd":
      pos.x += vel.x;
      pos.y += vel.y;
      if (pos.x >= 50) {
          vel.x = -vel.x;
      }
      if (pos.y >= 50) {
          vel.y = -vel.y;
      }
      if (pos.x <= -50) {
          vel.x = -vel.x;
      }
      if (pos.y <= -50) {
          vel.y = -vel.y;
      }
      if ((pos.x >= 50) && (pos.y >= 50)) {
        stats.cornerhits += 1;
      } else if ((pos.x >= 50) && (pos.y <= -50)) {
        stats.cornerhits += 1;
      } else if ((pos.x <= -50) && (pos.y <= -50)) {
        stats.cornerhits += 1;
      } else if ((pos.x <= -50) && (pos.y >= 50)) {
        stats.cornerhits += 1;
      } else if ((pos.x >= 50) || (pos.y >= 50) || (pos.y <= -50) || (pos.x <= -50)) {
        stats.edgehits += 1;
      }
      let statsjson = JSON.stringify(stats);
      fs.writeFile("stats.json", statsjson, 'utf8', function (err) {
        if (err) {
          console.log("stats.json couldn't be saved!");
          return console.log(err);
        }
      });
      break;
  }
}, 25);
