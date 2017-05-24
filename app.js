var http = require ("http");
var fs = require('fs');


var send404Error = function(response) {
  response.writeHead(404, {"Content-Type" : "text/plain"});
  response.write("Page Not Found");
  response.end();
}

var sendIndexFile = function(response) {
  console.log("Index file has been opened");

  response.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream("./index.html").pipe(response);
}

var sendRandomNumber = function(response) {
  console.log("Random number has been sent");

  response.writeHead(200, {"Content-Type": "application/json"});
  var number = Math.floor((Math.random() * 101));
  var json = JSON.stringify({
    number: number
  });
  response.end(json);
}

var onRequest = function(request, response) { 

  if(request.method == "GET") {
    switch (request.url) {
      case "/":
        sendIndexFile(response);
        return;
      case "/get-number":
        sendRandomNumber(response);
        return;
    }
  }

  send404Error(response);
}

http.createServer(onRequest).listen(8888);
console.log("Server is now running...");
