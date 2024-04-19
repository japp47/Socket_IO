const express =  require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io =  new Server(server);

app.use('/', express.static(__dirname + '/public'));

io.on('connection', (socket)=>{
    console.log('User connected', socket.id);
    socket.on('disconnect', ()=>{
        console.log('User disconnected', socket.id); 
    });

    // socket.on('from_client', ()=> {
    //     console.log('received from the client')
    // })
    // setInterval(function f() {
    //     socket.emit('from_server')
    // }, 3000)
    socket.on('new_msg', (data) => {
        //io.emit('msg_rcvd', data);
        //socket.emit('msg_rcvd', data);
        socket.broadcast.emit('msg_rcvd', data);
    })
});

server.listen(3000, ()=> {
    console.log('port 3000');
})