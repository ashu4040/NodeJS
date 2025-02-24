const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Fix the incorrect spelling

// Define Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save middleware for password hashing
personSchema.pre("save", async function (next) {
  // Use function() instead of arrow function
  const person = this;

  // Hash the password only if it has been modified (or is new)
  if (!person.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    person.password = await bcrypt.hash(person.password, salt);

    next();
  } catch (error) {
    return next(error);
  }
});

// Compare password method
personSchema.methods.comparePassword = async function (candidatePass) {
  // Use function() instead of arrow function
  try {
    return await bcrypt.compare(candidatePass, this.password);
  } catch (error) {
    throw error;
  }
};

// Create Person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
