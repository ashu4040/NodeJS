const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

// Middleware fnc
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Req made to: ${req.originalUrl}`);
  next(); // move on to the next phase
};
app.use(logRequest);

app.use(passport.initialize());

const localMiddleware = passport.authenticate("local", { session: false });

app.get("/", localMiddleware, function (req, res) {
  res.send("welcome to the hotel");
});

// imports the router files
const menuRoutes = require("./routes/menuRoutes");
const personRoutes = require("./routes/personRoutes");

// use the routers
app.use("/menu", menuRoutes);
app.use("/person", personRoutes);

app.listen(3000, () => {
  console.log("conected to 3000");
});
