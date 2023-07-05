"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, "/../../.env") }); // .env is in different folder
const mongoose = require("mongoose");
const { uri } = process.env;
const User_1 = __importDefault(require("../models/User"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (uri) {
                yield mongoose.connect(uri);
            }
            console.log("Connected to db");
            try {
                yield User_1.default.collection.drop();
            }
            catch (_a) {
                yield User_1.default.createCollection();
            }
            // HR
            let admin = {
                name: "admin",
                email: "k@k.com",
                password: "password",
                isAdmin: true,
            };
            admin.password = yield bcrypt.hash(admin.password, Number(process.env.SALT));
            const user1 = yield User_1.default.create(admin);
            // Just registered
            let employee = { name: "first", email: "f@f.com", password: "password" };
            employee.password = yield bcrypt.hash(employee.password, Number(process.env.SALT));
            yield User_1.default.create(employee);
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
            employee2.password = yield bcrypt.hash(employee2.password, Number(process.env.SALT));
            yield User_1.default.create(employee2);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            yield mongoose.connection.close();
        }
    });
}
run().catch(console.dir);
