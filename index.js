const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const createConnection = require("./db/connection");

//routers
const authRoute = require("./routes/authRoute.js");
const projectRouter = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");

// Middlewares
app.use(express.json());

// import routes
app.use("/api/v1/", authRoute);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
	res.send("Hollo world");
});

const start = async () => {
	try {
		await createConnection();
		console.log("connected to db...");
		app.listen(port, () => {
			console.log(`server is running on port ${port}...`);
		});
	} catch (error) {
		throw new Error(error);
	}
};

start();
