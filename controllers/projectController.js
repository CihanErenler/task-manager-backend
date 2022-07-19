const Project = require("../models/project");
const User = require("../models/user.js");

const createProject = async (req, res) => {
	const body = req.body;

	const project = new Project({
		name: body.name,
		category: body.category,
		description: body.description,
		privicy: body.privicy,
		owners: [req.user._id],
	});

	try {
		const savedProject = await project.save();
		await User.updateOne(
			{ _id: req._id },
			{ projects: [{ projectId: savedProject._id, isAdmin: true }] }
		);
		res.status(200).json({ data: savedProject });
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { createProject };
