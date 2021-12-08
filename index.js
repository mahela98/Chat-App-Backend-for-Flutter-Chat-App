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
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var clients = {};
const routes = require("./routes");
app.use("/routes", routes);
app.use("/uploadimages",express.static("uploadImages"));

//database
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', (req, res) => {
    res.send("Node Server is running !!")
});

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id, "has joined");

    socket.on("signin", (id) => {
        console.log(id);
        clients[id] = socket;
    });
    socket.on("message", (message) => {
        console.log(message);
        let targetId = message.targetId;
        if (clients[targetId]) {
            clients[targetId].emit("message", message);
        }

    });
});

server.listen(port, () => {
    console.log("server started on port : " + port);
});