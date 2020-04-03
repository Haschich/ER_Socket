// var express = require("express");
// var app = new express();
// var ip = "http";
// var http = require(ip).Server(app);
// var io = require("socket.io")(http);
// var port = process.env.PORT || 80;
// 
// app.use(express.static(__dirname));
// 

const express    = require('express');
const path       = require('path');
const port       = process.env.PORT || 3000;
const app        = express();

var ip = "http";
var http = require(ip).Server(app);
app.use(express.static(__dirname));

const io = require('socket.io')(port, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true,
        };
        res.writeHead(200, headers);
        res.end();
    },
    path: '/',
    serveClient: true,
    origins: '*:*',
    cookie: true,
    pingInterval: 1000,
    pingTimeout: 1000,
    upgradeTimeout: 1000,
    allowUpgrades: true,
    cookie: 'remote_spec',
    cookiePath:'/',
    cookieHttpOnly:true
});

app.get('/',function(req,res){
    res.redirect('index.html');
});
 
io.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);  
    });
});

app.listen(80,function(){
console.log("Server running at port "+ port);
});

// http.listen(port,function(){
// console.log("Server running at port "+ port);
// });