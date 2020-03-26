var app = require('http').createServer(handler)
var io = require('socket.io')(app);

var fs = require('fs');

var port = process.env.PORT || 7777;

app.listen(port);

function handler (req, res) {
    console.log("Server open at port "+ port);
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
            console.log("Connection");
        });
}

io.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);  
    });
});


