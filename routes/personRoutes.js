const express = require("express");
const router = express.Router();
const Person = require("../modules/Person");
const app = express();
const { jwtAuthMiddleware, generateAuthMiddleware } = require("../jwt");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

// using /signup beacuse it creates a new person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the mongoose model
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");

    const token = generateAuthMiddleware({ username: response.username });
    console.log("token is ", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json("error");
  }
});

// Login
router.post("/login", (req, res) => {
  try {
    // extract username and pass
  } catch (error) {}
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("error");
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json("err");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extract the id from the url parameter
    const updatePersonData = req.body; // updated data for person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoose validation
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("err");
  }
});

module.exports = router;
