const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const roomRoutes = require("./routes/roomRoutes");
const Room = require("./models/Room");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://localhost:27017/secureFileAccess", // Ensure the database name is specified
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve uploaded files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/rooms", roomRoutes);

app.get("/room", async (req, res) => {
  try {
    const rooms = await Room.find({}, "name"); // Fetch all room names
    res.json(rooms); // Ensure the response is JSON
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Error fetching rooms" }); // Return JSON error
  }
});

// Socket.io setup
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("chatMessage", ({ room, user, message }) => {
    io.to(room).emit("message", { user, message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});