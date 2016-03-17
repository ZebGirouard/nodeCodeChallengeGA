//Require all relevant packages

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

//Define get handling to see favorites list in favorites file
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// Define post handling to add title to server-side favorites file
app.post('/favorites', function(req, res){
  if(!req.body.Title){
    res.send("Error");
    return
  }
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.send(data[data.length-1]);
});

// Start server
console.log(process.env.PORT);
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port 3000");
});