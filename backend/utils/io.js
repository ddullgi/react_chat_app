const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("[IO] client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      // 유저정보를 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        cb({ ok: true, data: user });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // 유저찾기 socket id 로
        const user = await userController.checkUser(socket.id);
        // 메세지 저장
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage);
        cb({ ok: true });
      } catch (err) {
        cb({ ok: false, error: err.message });
      }
    });

    socket.on("disconnect", async () => {
      console.log("[IO] user is disconnected");
    });
  });
};
