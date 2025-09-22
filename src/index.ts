import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
});

io.on("connection", (socket) => {
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
