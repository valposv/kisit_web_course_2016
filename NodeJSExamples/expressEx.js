var express = require("express"),
	app = express();
	
app.get("/", function(req, res){
	res.send("Hi");
});

app.get("/myroute", function(req, res){
	res.send("Hi 2");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});