var express = require("express");
var app = new express();
var ip = process.env.OPENSHIFT_NODEJS_IP || "http";
var http = require(ip).Server(app);
var io = require("socket.io")(http);
 
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5858;
 
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