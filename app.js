#!/usr/bin/env node
// ##### imports
var express = require('express');
var fs = require('fs');


// ##### app settings
var app = express.createServer(express.logger());
var templatePath = '.' // IMPORTANT set to . if no specific path available
app.use(express.static(__dirname + '/static'));
 

// ##### helper functions
var rendHtml = function(file2rend){
    // *html render:*
    // Reads the file synchronously and returns a buffered string
    file = templatePath + '/templates/' + file2rend;
    buffer = new Buffer(fs.readFileSync(file));
    return buffer.toString();
}


// ##### app main behavior
app.get('/', function(request, response) {
    response.send(rendHtml('index.html'));
});

app.get('/boiler', function(request, response) {
    response.send(rendHtml('boilerplate.html'));
});


// ##### Server launch instance
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});