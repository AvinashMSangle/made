import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("emoji", (data) => {
    socket.io.emit("newEmoji", data);
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
