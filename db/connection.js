const mongoose = require("mongoose");

const createConnection = () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = createConnection;
