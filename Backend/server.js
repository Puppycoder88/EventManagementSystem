const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

//const { initializeSocket } = require("./socket"); // Import socket setup
const authRoutes = require("./routes/authRoutes");
const eventcreationRoutes = require("./routes/eventcreationRoutes");
const eventdashboardRoutes = require("./routes/eventdashboardRoutes");
const registrationModalRoutes = require("./routes/registrationmodalRoutes");
const attendeeRoutes = require("./routes/attendeeRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.io and attach it to the app
//const io = initializeSocket(server);
//app.set("io", io);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/event-dashboard", eventdashboardRoutes);
app.use("/api/event-creation", eventcreationRoutes);
app.use("/api/registration-modal", registrationModalRoutes);
app.use("/api/attendees", attendeeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
