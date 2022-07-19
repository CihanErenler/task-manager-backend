const mongoose = require("mongoose");

const user = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	projects: {
		type: [{ projectId: String, isAdmin: Boolean }],
	},
});

module.exports = mongoose.model("User", user);
