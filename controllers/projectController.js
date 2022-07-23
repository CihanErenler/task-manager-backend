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
		let updatedUser;
		const savedProject = await project.save();
		const newProject = { projectId: savedProject._id, isAdmin: true };

		const user = await User.findById(req.user._id);
		const userProjects =
			user.projects !== null ? [...user.projects, newProject] : [newProject];
		await User.findByIdAndUpdate(req.user._id, {
			projects: [userProjects],
		});
		res.status(200).json({ data: savedProject, updatedUser });
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { createProject };
