"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const refType = mongoose_1.Schema.Types.ObjectId;
// export interface IUser {
//   firstName?: String;
//   lastName?: String;
//   middleName?: String;
//   preferredName?: String;
//   profilePic?: String;
//   SSN?: String;
//   DOB?: Date;
//   cellPhone?: String;
//   workPhone?: String;
//   gender?: String;
//   carInfo?: CarInfo;
//   citizenOrPermResident?: String;
//   workAuthDetails?: Object;
//   driverLicenseInfo?: Object;
//   reference?: Person;
//   emergencyContact?: Person[];
//   hr: Boolean;
// }
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    preferredName: String,
    profilePic: String,
    name: String,
    email: String,
    password: String,
    SSN: String,
    DOB: Date,
    isAdmin: Boolean,
    currentAddress: String,
    cellPhone: String,
    workPhone: String,
    carInfo: {
        make: String,
        model: String,
        color: String,
    },
    citizenOrPermResident: String,
    workAuthDetails: {
        workAuth: String,
        OPTReceipt: String,
        visaTitle: String,
        startDate: Date,
        endDate: Date
    },
    driverLicenseInfo: {
        hasDriverLicense: String,
        licenseNumber: String,
        expirationDate: String,
        uploadedCopy: String
    },
    reference: { firstName: String,
        lastName: String,
        middleName: String,
        phoneNumber: String,
        email: String,
        relationship: String,
    },
    emergencyContacts: [{ firstName: String,
            lastName: String,
            middleName: String,
            phoneNumber: String,
            email: String,
            relationship: String,
        }],
    optReceipt: {
        document: String,
        status: String,
        errorMessage: String
    },
    optEad: {
        document: String,
        status: String,
        errorMessage: String
    },
    I983: {
        document: String,
        status: String,
        errorMessage: String
    },
    I20: {
        document: String,
        status: String,
        errorMessage: String
    },
    applicationStatus: String
}, { timestamps: true });
exports.UserSchema.methods.comparePassword = function (entredPassword) {
    const user = this;
    return bcrypt_1.default.compareSync(entredPassword, user.password);
};
const User = mongoose_2.default.model("User", exports.UserSchema);
exports.default = User;
