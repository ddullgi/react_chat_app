module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("[BE_IO] client is connected", socket.id);
  });
};