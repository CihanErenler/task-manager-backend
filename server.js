require("dotenv").config();
const express = require("express");
const app = express();
const createConnection = require("./db/connection");
const notFound = require("./middlewares/notFound");
const cors = require("cors");
const port = process.env.PORT || 3030;

//routers
const authRoute = require("./routes/authRoute.js");
const projectRouter = require("./routes/projectRoute");
const userRoute = require("./routes/userRoute");

// Middlewares
app.use(express.json());
app.use(cors());

// import routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRoute);
app.use(notFound);

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
