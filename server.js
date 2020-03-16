var http = require("http");

http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
      "welcome to hri's bot page :)\nthis is just here so heroku/glitch doesn't freak out"
    );
  })
  .listen(process.env.PORT || 3000);

console.log("HTTP Host Established");

const MPPClient = require('mpp-client-xt');
const client = new MPPClient("http://www.multiplayerpiano.com", undefined);

client.start();

client.on("hi", () => {
  setTimeout(function() {
    client.sendArray([{m:'userset', set:{name:"dvdbot [dvd!help](made by Hri7566)"}}]);
  })
  
  client.setChannel("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
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
      chat("cmds: dvd!help // dvd!cursor // dvd!stats");
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
      chat("Edge hits: " + edgehits + " | Corner hits: " + cornerhits);
      break;
  }
});

var pos = {x: (Math.random() * 100) - 50, y: (Math.random() * 100) - 50};
var vel = {x: 2/5, y: 2/7};
var cornerhits = 0;
var edgehits = 0;

var cursor = setInterval(function() {
  client.sendArray([{m:'m', x: client.getOwnParticipant().x = pos.x + 50, y: client.getOwnParticipant().y = pos.y + 50}]);
});

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
        cornerhits += 1;
      } else if ((pos.x >= 50) && (pos.y <= -50)) {
        cornerhits += 1;
      } else if ((pos.x <= -50) && (pos.y <= -50)) {
        cornerhits += 1;
      } else if ((pos.x <= -50) && (pos.y >= 50)) {
        cornerhits += 1;
      } else if ((pos.x >= 50) || (pos.y >= 50) || (pos.y <= -50) || (pos.x <= -50)) {
        edgehits += 1;
      }
      break;
  }
}, 25);
