"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HouseSchema = new mongoose_1.Schema({
    address: String,
    landlord: {
        fullName: String,
        phoneNumber: String,
        email: String
    },
    facility: {
        bed: Number,
        mattress: Number,
        table: Number,
        chair: Number,
        report: [{
                time: Date,
                title: String,
                description: String,
                status: String,
                comment: Comment
            }]
    },
    employeeList: [{
            fullName: String,
            phoneNumber: String,
            email: String,
        }]
});
exports.default = HouseSchema;
