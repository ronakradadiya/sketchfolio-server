import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
