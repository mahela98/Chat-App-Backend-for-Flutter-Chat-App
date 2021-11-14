const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Node Server is running !!")
})

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");

    socket.on("/test",(msg)=>{
        console.log(msg);
    })
});

server.listen(port, () => {
    console.log("server started");
});