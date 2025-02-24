const mongoose = require("mongoose");

//Define the mongodb connection url
const mongoURL = "mongodb://localhost:27017/hotel";

//setup mongoDB connections
mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// get the default connections
// mongoose maintains a default connections object representing the mongoDB connections

const db = mongoose.connection;

//define event listeners for databases connections

db.on("connected", () => {
  console.log("conntcted to mongodb");
});
db.on("error", () => {
  console.log("error");
});
db.on("disconnected", () => {
  console.log("disconntcted to mongodb");
});

// export the database connection
module.exports = db;
