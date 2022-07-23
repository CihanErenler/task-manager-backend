const mongoose = require("mongoose");

const project = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: false,
	},
	color: {
		type: Number,
		required: false,
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
		type: Number,
		required: true,
	},
	owners: {
		type: [String],
		required: true,
	},
	members: {
		type: [{ contId: String, accessLevel: Number }],
		required: false,
	},
});

module.exports = mongoose.model("Project", project);
