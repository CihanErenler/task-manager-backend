const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const createConnection = require("./db/connection");
const notFound = require("./middlewares/notFound");

//routers
const authRoute = require("./routes/authRoute.js");

// Middlewares
app.use(express.json());
app.use(notFound);
// import routes
app.use("/api/v1/", authRoute);

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
