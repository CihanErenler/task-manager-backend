const mongoose = require("mongoose");

const task = mongoose.Schema({
  project: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  creator: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: true,
  },
  labels: {
    type: [String],
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
  taskLevel: {
    type: Number,
    required: true,
  },
  subTasks: {
    type: [
      {
        title: String,
        status: Number,
        assignee: { id: String, name: String, img: String },
      },
    ],
  },
  parentLink: {
    type: String,
    required: false,
  },
  comments: {
    type: [
      {
        commenterId: String,
        commenterName: String,
        comment: String,
        date: Date,
      },
    ],
  },
});
