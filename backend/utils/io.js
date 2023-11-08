const userController = require("../Controllers/user.controllers");

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

    socket.on("disconnect", async () => {
      console.log("[IO] user is disconnected");
    });
  });
};
