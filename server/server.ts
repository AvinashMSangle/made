import http from "http";
import express from "express";
import { Server } from "socket.io";

const PORT = 8000;

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Socket.io server is healthy!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("user", (data) => {
    socket.broadcast.emit("new_user", data);
  });

  socket.on("message", (data) => {
    if (data.type === "text" && data.content.startsWith("@ai")) {
      // TODO: Do AI
    }
    {
      socket.broadcast.emit("new_message", data);
    }
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server is up and running on PORT:${PORT}`);
});