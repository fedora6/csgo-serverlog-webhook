//Dgram for handling udp server logs being sent in
var dgram = require('dgram'),
  socket = dgram.createSocket('udp4');
//Log line parsing utility
var parser = require('./parseline');
//Webhooks package for pushing out events
var WebHooks = require('node-webhooks');
var webHooks = new WebHooks({
  db: './webHooksDB.json'
});
/*webHooks.add('throw', 'https://webhook.site/d1c0e5fc-776a-4eb9-bb2f-04431a83fb36').then(function(){
	// done
}).catch(function(err){
	console.log(err)
});*/

//On udp socket receiving a message
socket.on('message', function (message, rinfo) {
  //Trim non-standard log line characters and whitespace
  var msg = message.toString('ascii').slice(5,-1).trim();
  //Parse log line
  var ev = parser.parseLine(msg);
  if (ev) {
    //Send out event created by log line
    webHooks.trigger(ev.type, {
      type: ev.type,
      server: {
        ip: rinfo.address,
        port: rinfo.port
      },
      data: ev.data
    });
  }
  console.log(ev.type);
  console.log(rinfo.address + ':' + rinfo.port + ' - ' + msg);
});
//Indicate in console that the udp socket is listening
socket.on('listening', function () {
  var address = socket.address();
  console.log('UDP Server listening on ' + address.address + ':' + address.port);
});
//Listen for udp on port:
socket.bind(3001);

//Express for simple API for adding/removing webhook URLs
const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

//Get all webhook URLs
app.get('/api/webhook/get', function (req, res) {
  webHooks.getDB().then(function(obj){
    res.send(obj);
  }).catch(function(err){
    console.log(err);
  });
});
//Get all webhook URLs for a given event
app.get('/api/webhook/get/:eventname', function (req, res) {
  webHooks.getWebHook(req.params.eventname).then(function(obj){
    res.send(obj);
  }).catch(function(err){
    console.log(err);
  });
});
//Add a webhook URL, JSON body with url param required
app.post('/api/webhook/add/:eventname', function (req, res) {
  webHooks.add(req.params.eventname, req.body.url).then(function(){
    res.send('Added '+req.body.url+' to '+req.params.eventname);
  }).catch(function(err){
  	console.log(err);
  });
});
//Delete all URLs linked to a given event
app.delete('/api/webhook/delete/:eventname', function (req, res) {
  webHooks.remove(req.params.eventname).then(function(){
    res.send('Deleted all webhooks from '+req.params.eventname);
  }).catch(function(err){console.error(err);});
});
//Delete a specific URL from a given event, JSON body with url param required
app.post('/api/webhook/delete/:eventname', function (req, res) {
  webHooks.remove(req.params.eventname, req.body.url).then(function(){
    res.send('Deleted '+req.body.url+' from '+req.params.eventname);
  }).catch(function(err){console.error(err);});
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
