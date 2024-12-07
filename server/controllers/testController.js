const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const getStatus = asyncHandler(async (req, res) => {
  const id = "67544ee03ec00b7a9bd7db34";
  const db = mongoose.connection.db;
  const collection = db.collection("test");
  const data = await collection.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!data) {
    res.status(404).json("Something went wrong!!");
  }

  res.status(200).json({
    status: data.status,
  });
});

module.exports = { getStatus };
