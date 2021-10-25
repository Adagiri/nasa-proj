const mongoose =  require("mongoose")

// create a schema
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  customers: [String],
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success:  {
    type: Boolean,
    required: true,
    default: false
  },
});

module.exports = mongoose.model("Launch", launchesSchema);
