const User = require("../models/user");

const getSingleUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById({ _id: id });
		res.status(200).json({ data: user });
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { getSingleUser };
