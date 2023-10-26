const mongoose = require("mongoose");
// const constants = require("./constants");
mongoose.set('strictQuery', false);


const DB = process.env.MONGO_URL;

const connection = mongoose.connection;

const connect = () => {
  console.log("database connected");
  mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = { connect };
