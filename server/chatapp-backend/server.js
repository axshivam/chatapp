const express = require("express");

const app = express();

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const rooms = ["general", "tech", "finance", "crypto"];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());


app.use("/users", userRoutes);
require('./connection');

const server = require("http").createServer(app);
const PORT = 5000;

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


app.get('/rooms', (req, res)=> {
    res.json(rooms)
  })
server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});