const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle new registration event
    socket.on("new-registration", (data) => {
      console.log("New registration received:", data);
      io.emit("new-registration", data); // Broadcast update to all clients
    });

    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = { initializeSocket, getIO };
