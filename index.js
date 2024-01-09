const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
require("./db/connection");
const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRoute");
const chatModel = require("./model/chatModel");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://nextchat-alpha.vercel.app",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

//function to save message.............
async function saveMessage(msgdata) {
  try {
    const record = new chatModel({
      user: msgdata.user,
      useremail: msgdata.useremail,
      message: msgdata.message,
      time: msgdata.time,
      phone: msgdata.phone,
    });
    const result = await record.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
///................................

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  socket.on("send_message", (data) => {
    saveMessage(data);
    console.log(data);

    socket.broadcast.emit("receive_message", data);
  });
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);

server.listen(5000, () => {
  console.log("listening");
});
