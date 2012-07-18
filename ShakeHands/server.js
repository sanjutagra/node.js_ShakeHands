var connect = require("connect");
var url = require("url");

function start(route, handle,db) {
  function onRequest(request, response) {
        var session = request.session;
        var pathname = url.parse(request.url).pathname;
	var postData="";
    console.log("Request for " + pathname + " received.");


    route(handle, pathname, response, request,db);
  }

  connect(
      connect.cookieParser()
    , connect.session({ secret: 'keyboard cat', cookie: { maxAge: 1000000 }})
    , connect.favicon()
    , onRequest
  ).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
