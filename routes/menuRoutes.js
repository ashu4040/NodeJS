const express = require("express");
const router = express.Router();
const Menu = require("../modules/Menu");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);

    const response = await newMenu.save();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json("err");
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("err");
  }
});

module.exports = router;
