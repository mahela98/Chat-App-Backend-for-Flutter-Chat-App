const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

var server = http.createServer(app);

var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

//middleware

app.use(express.json());
app.use(cors());

io.on("Connection", (socket) => {
    console.log("connected");
});

server.listen(port, () => {
    console.log("server started");

});