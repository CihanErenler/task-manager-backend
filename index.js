const express = require("express");
const app = express();
require("dotenv").config();
const createConnection = require("./db/connection");

//routers
const authRoute = require("./routes/authRoute.js");

//middlewares
app.use("/api/v1/", authRoute);

const port = process.env.PORT || 3000;

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
