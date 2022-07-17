const mongoose = require("mongoose");

const project = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  privicy: {
    type: String,
    required: true,
  },
  owners: {
    type: [String],
    required: true,
  },
  contributors: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("Project", project);
