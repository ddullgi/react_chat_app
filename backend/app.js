const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

// mongoose.connect("데이터 베이스 주소", "옵션")

main().catch((err) => console.log(err));

async function main() {
  await mongoose
    .connect(process.env.DB)
    .then(() => console.log("[BE] connected to database"));
}
module.exports = app;
