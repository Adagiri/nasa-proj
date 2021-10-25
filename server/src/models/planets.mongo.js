const mongoose = require("mongoose");

// create a schema
const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetsSchema);
