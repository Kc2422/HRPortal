const path = require("path");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, "/../../.env") }); // .env is in different folder
import mongoose = require("mongoose");
const { uri } = process.env;

import User, { IUser } from "../models/User";

async function run() {
  try {
    if (uri) {
      await mongoose.connect(uri);
    }

    console.log("Connected to db");

    try {
      await User.collection.drop();
    } catch {
      await User.createCollection();
    }

    // HR
    let admin = {
      name: "admin",
      email: "k@k.com",
      password: "password",
      isAdmin: true,
    };
    admin.password = await bcrypt.hash(
      admin.password,
      Number(process.env.SALT)
    );
    const user1 = await User.create(admin);
    // Just registered
    let employee = { name: "first", email: "f@f.com", password: "password" };
    employee.password = await bcrypt.hash(
      employee.password,
      Number(process.env.SALT)
    );
    await User.create(employee);
    // Onboarding application already submitted
    let employee2 = {
      name: "second",
      email: "s@s.com",
      password: "password",
      firstName: "Kevin",
      lastName: "Chen",
      middleName: "Y",
      SSN: "12345",
      DOB: new Date(),
      cellPhone: "12345",

      gender: "male",
      citizenOrPermResident: "yes",
      applicationStatus: "complete",
    };
    employee2.password = await bcrypt.hash(
      employee2.password,
      Number(process.env.SALT)
    );
    await User.create(employee2);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

run().catch(console.dir);
