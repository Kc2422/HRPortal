"use strict";
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hr", (error) => {
    if (error)
        console.log(error);
    else
        console.log("Connected to DB.");
});
// const { uri } = process.env;
// mongoose.connect(uri, (error: Error) => {
//   if (error) console.log(error);
//   else console.log("Connected to DB.");
// });
module.exports = mongoose.connection;
