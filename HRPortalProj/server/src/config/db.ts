const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/hr1", (error: Error) => {
//   if (error) console.log(error);
//   else console.log("Connected to DB.");
// });

const { uri } = process.env;

mongoose.connect(uri, (error: Error) => {
  if (error) console.log(error);
  else console.log("Connected to DB.");
});

module.exports = mongoose.connection;
