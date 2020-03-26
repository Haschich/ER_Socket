var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

var port = process.env.PORT || 80;

app.listen(port);


// http.listen(port,function(){
//     console.log("Server running at port "+ port);
// });
// app.use(express.static(__dirname + "/public" ));
//
// app.get('/',function(req,res){
//     res.redirect('public/index.html');
// });


function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
            console.log("Server running at port "+ port);
        });
}

io.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);  
    });
});


