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
  client.sendArray([{m:'userset', set:{name:"dvdbot [dvd!help](by Hri7566)"}}]);
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
      chat("cmds: dvd!help // dvd!cursor");
      break;
    case "dvd!cursor":
      if (!argcat || argcat == "") {
        chat("Modes: on // off");
      } else {
        switch (argcat) {
          case "on":
            ctoggle = true;
            pos = {x: 5, y: 5};
            cursormode = "dvd";
            break;
          case "off":
            ctoggle = false;
            cursormode = "none";
            break;
        }
      }
      break;
  }
});

var pos = {x: -42, y: 5};
var vel = {x: 2/5, y: 2/7};

var cursor = setInterval(function() {
    if (ctoggle == true) {
        client.sendArray([{m:'m', x: client.getOwnParticipant().x = pos.x + 50, y: client.getOwnParticipant().y = pos.y + 50}])
    } else {
        pos.x = -150;
        pos.y = -150;
    }
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
      break;
    case "off":
      
  }
}, 25);