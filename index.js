var express = require("express");
var app = new express();
var ip = "http";
var http = require(ip).Server(app);
var io = require("socket.io")(http);
 
var port = process.env.PORT || 7777;
 
app.use(express.static(__dirname + "/public" ));
 
app.get('/',function(req,res){
res.redirect('public/index.html');
});
 
 
io.on('connection',function(socket){
 
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);  
    });
 
});
 
http.listen(port,function(){
console.log("Server running at port "+ port);
});

// var express = require("express");
// var app = new express();
// var ip = "http";
// var http = require(ip).Server(app);
// var io = require("socket.io")(http, {
//     transports: ['websocket'],
//     serveClient: false,
// });
//
// var port = process.env.PORT || 7777;
//
// app.use(express.static(__dirname + "/public" ));
//
// app.get('/',function(req,res){
//     res.redirect('public/index.html');
// });
//
//
// io.on('connection',function(socket){
//     socket.on('reconnect_attempt', () => {
//         socket.io.opts.transports = ['websocket'];
//     });
//     socket.on('stream',function(image){
//         socket.broadcast.emit('stream',image);
//     });
//
// });
//
// http.listen(port,function(){
//     console.log("Server running at port "+ port);
// });